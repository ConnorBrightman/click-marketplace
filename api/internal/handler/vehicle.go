package handler

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/clickdealer/click-marketplace/api/internal/middleware"
	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/clickdealer/click-marketplace/api/internal/repository"
	"github.com/go-chi/chi/v5"
	"github.com/redis/go-redis/v9"
)

type VehicleHandler struct {
	repo  *repository.VehicleRepository
	cache *redis.Client
}

func NewVehicleHandler(repo *repository.VehicleRepository, cache *redis.Client) *VehicleHandler {
	return &VehicleHandler{repo: repo, cache: cache}
}

func (h *VehicleHandler) Search(w http.ResponseWriter, r *http.Request) {
	params := parseSearchParams(r)

	cacheKey := fmt.Sprintf("search:%s", r.URL.RawQuery)
	if cached, err := h.cache.Get(r.Context(), cacheKey).Bytes(); err == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("X-Cache", "HIT")
		w.Write(cached)
		return
	}

	vehicles, total, err := h.repo.Search(r.Context(), params)
	if err != nil {
		jsonError(w, "search failed", http.StatusInternalServerError)
		return
	}

	totalPages := total / params.PerPage
	if total%params.PerPage > 0 {
		totalPages++
	}

	result := model.SearchResult{
		Vehicles:   vehicles,
		Total:      total,
		Page:       params.Page,
		PerPage:    params.PerPage,
		TotalPages: totalPages,
	}

	body, _ := json.Marshal(result)
	h.cache.Set(r.Context(), cacheKey, body, 5*time.Minute)

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func (h *VehicleHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	vehicle, err := h.repo.GetByID(r.Context(), id)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			jsonError(w, "vehicle not found", http.StatusNotFound)
		} else {
			log.Printf("GetByID error for id=%s: %v", id, err)
			jsonError(w, "internal server error", http.StatusInternalServerError)
		}
		return
	}

	go h.repo.IncrementViews(context.Background(), id)

	jsonResponse(w, vehicle)
}

func (h *VehicleHandler) GetMakes(w http.ResponseWriter, r *http.Request) {
	makes, err := h.repo.GetMakes(r.Context())
	if err != nil {
		jsonError(w, "failed to fetch makes", http.StatusInternalServerError)
		return
	}
	jsonResponse(w, makes)
}

func (h *VehicleHandler) GetDealerVehicles(w http.ResponseWriter, r *http.Request) {
	dealerID := middleware.GetDealerID(r.Context())
	vehicles, err := h.repo.GetByDealer(r.Context(), dealerID)
	if err != nil {
		jsonError(w, "failed to fetch listings", http.StatusInternalServerError)
		return
	}
	jsonResponse(w, vehicles)
}

func (h *VehicleHandler) Create(w http.ResponseWriter, r *http.Request) {
	dealerID := middleware.GetDealerID(r.Context())
	var req model.CreateVehicleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	vt := req.VehicleType
	if vt == "" {
		vt = "car"
	}
	v := &model.Vehicle{
		DealerID:     dealerID,
		DmsRef:       req.DmsRef,
		VehicleType:  vt,
		Make:         req.Make,
		Model:        req.Model,
		Variant:      req.Variant,
		Year:         req.Year,
		PricePence:   int(req.PricePounds * 100),
		Mileage:      req.Mileage,
		FuelType:     req.FuelType,
		Transmission: req.Transmission,
		BodyType:     req.BodyType,
		Colour:       req.Colour,
		Doors:        req.Doors,
		EngineSize:   req.EngineSize,
		Registration: req.Registration,
		Description:  req.Description,
		Status:       "active",
	}

	if err := h.repo.Create(r.Context(), v, req.ImageURLs); err != nil {
		jsonError(w, "failed to create listing", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, v)
}

func (h *VehicleHandler) Update(w http.ResponseWriter, r *http.Request) {
	dealerID := middleware.GetDealerID(r.Context())
	id := chi.URLParam(r, "id")

	var req model.CreateVehicleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	v := &model.Vehicle{
		ID:           id,
		DealerID:     dealerID,
		Make:         req.Make,
		Model:        req.Model,
		Variant:      req.Variant,
		Year:         req.Year,
		PricePence:   int(req.PricePounds * 100),
		Mileage:      req.Mileage,
		FuelType:     req.FuelType,
		Transmission: req.Transmission,
		BodyType:     req.BodyType,
		Colour:       req.Colour,
		Doors:        req.Doors,
		EngineSize:   req.EngineSize,
		Registration: req.Registration,
		Description:  req.Description,
		Status:       "active",
	}

	if err := h.repo.Update(r.Context(), v); err != nil {
		jsonError(w, "failed to update listing", http.StatusInternalServerError)
		return
	}

	jsonResponse(w, v)
}

func (h *VehicleHandler) Delete(w http.ResponseWriter, r *http.Request) {
	dealerID := middleware.GetDealerID(r.Context())
	id := chi.URLParam(r, "id")

	if err := h.repo.Delete(r.Context(), id, dealerID); err != nil {
		jsonError(w, "failed to delete listing", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func parseSearchParams(r *http.Request) model.SearchParams {
	q := r.URL.Query()
	p := model.SearchParams{
		VehicleType:  q.Get("vehicle_type"),
		Make:         q.Get("make"),
		Model:        q.Get("model"),
		FuelType:     q.Get("fuel_type"),
		Transmission: q.Get("transmission"),
		BodyType:     q.Get("body_type"),
		DealerID:     q.Get("dealer_id"),
		Sort:         q.Get("sort"),
		Q:            q.Get("q"),
	}

	if v, err := strconv.Atoi(q.Get("min_price")); err == nil {
		p.MinPrice = v * 100
	}
	if v, err := strconv.Atoi(q.Get("max_price")); err == nil {
		p.MaxPrice = v * 100
	}
	if v, err := strconv.Atoi(q.Get("min_year")); err == nil {
		p.MinYear = v
	}
	if v, err := strconv.Atoi(q.Get("max_year")); err == nil {
		p.MaxYear = v
	}
	if v, err := strconv.Atoi(q.Get("min_mileage")); err == nil {
		p.MinMileage = v
	}
	if v, err := strconv.Atoi(q.Get("max_mileage")); err == nil {
		p.MaxMileage = v
	}
	if v, err := strconv.Atoi(q.Get("doors")); err == nil {
		p.Doors = v
	}
	p.Colour = q.Get("colour")
	p.Postcode = q.Get("postcode")
	if v, err := strconv.Atoi(q.Get("page")); err == nil && v > 0 {
		p.Page = v
	} else {
		p.Page = 1
	}
	if v, err := strconv.Atoi(q.Get("per_page")); err == nil && v > 0 && v <= 100 {
		p.PerPage = v
	} else {
		p.PerPage = 20
	}

	return p
}
