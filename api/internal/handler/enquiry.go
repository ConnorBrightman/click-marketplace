package handler

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/clickdealer/click-marketplace/api/internal/middleware"
	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/clickdealer/click-marketplace/api/internal/repository"
)

type EnquiryHandler struct {
	repo        *repository.EnquiryRepository
	vehicleRepo *repository.VehicleRepository
	dealerRepo  *repository.DealerRepository
}

func NewEnquiryHandler(repo *repository.EnquiryRepository, vehicleRepo *repository.VehicleRepository, dealerRepo *repository.DealerRepository) *EnquiryHandler {
	return &EnquiryHandler{repo: repo, vehicleRepo: vehicleRepo, dealerRepo: dealerRepo}
}

func (h *EnquiryHandler) Create(w http.ResponseWriter, r *http.Request) {
	var req model.CreateEnquiryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if req.Name == "" || req.Email == "" || req.VehicleID == "" {
		jsonError(w, "name, email and vehicle_id are required", http.StatusBadRequest)
		return
	}

	vehicle, err := h.vehicleRepo.GetByID(r.Context(), req.VehicleID)
	if err != nil {
		jsonError(w, "vehicle not found", http.StatusNotFound)
		return
	}

	enquiry := &model.Enquiry{
		VehicleID: req.VehicleID,
		DealerID:  vehicle.DealerID,
		Name:      req.Name,
		Email:     req.Email,
		Phone:     req.Phone,
		Message:   req.Message,
	}

	if err := h.repo.Create(r.Context(), enquiry); err != nil {
		jsonError(w, "failed to submit enquiry", http.StatusInternalServerError)
		return
	}

	dealer, _ := h.dealerRepo.GetByID(r.Context(), vehicle.DealerID)
	if dealer != nil {
		go sendEnquiryEmail(dealer.Email, enquiry, vehicle)
	}

	w.WriteHeader(http.StatusCreated)
	jsonResponse(w, map[string]string{"message": "enquiry submitted"})
}

func (h *EnquiryHandler) GetByDealer(w http.ResponseWriter, r *http.Request) {
	dealerID := middleware.GetDealerID(r.Context())
	enquiries, err := h.repo.GetByDealer(r.Context(), dealerID)
	if err != nil {
		jsonError(w, "failed to fetch enquiries", http.StatusInternalServerError)
		return
	}
	jsonResponse(w, enquiries)
}

func sendEnquiryEmail(dealerEmail string, e *model.Enquiry, v *model.Vehicle) {
	log.Printf("ENQUIRY EMAIL → %s | Vehicle: %d %s %s | From: %s (%s)",
		dealerEmail, v.Year, v.Make, v.Model, e.Name, e.Email)
	if e.Message != nil {
		log.Printf("Message: %s", *e.Message)
	}
	fmt.Println("(SMTP not configured — email logged only)")
}
