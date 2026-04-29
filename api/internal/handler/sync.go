package handler

import (
	"encoding/json"
	"net/http"

	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/clickdealer/click-marketplace/api/internal/repository"
)

type SyncHandler struct {
	vehicleRepo *repository.VehicleRepository
	dealerRepo  *repository.DealerRepository
}

func NewSyncHandler(vehicleRepo *repository.VehicleRepository, dealerRepo *repository.DealerRepository) *SyncHandler {
	return &SyncHandler{vehicleRepo: vehicleRepo, dealerRepo: dealerRepo}
}

func (h *SyncHandler) SyncVehicles(w http.ResponseWriter, r *http.Request) {
	var req model.SyncVehiclesRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	dealer, err := h.dealerRepo.GetByClickdealerID(r.Context(), req.DealerClickdealerID)
	if err != nil {
		jsonError(w, "dealer not found", http.StatusNotFound)
		return
	}

	synced := 0
	for _, rv := range req.Vehicles {
		v := &model.Vehicle{
			DealerID:     dealer.ID,
			DmsRef:       rv.DmsRef,
			Make:         rv.Make,
			Model:        rv.Model,
			Variant:      rv.Variant,
			Year:         rv.Year,
			PricePence:   int(rv.PricePounds * 100),
			Mileage:      rv.Mileage,
			FuelType:     rv.FuelType,
			Transmission: rv.Transmission,
			BodyType:     rv.BodyType,
			Colour:       rv.Colour,
			Doors:        rv.Doors,
			EngineSize:   rv.EngineSize,
			Registration: rv.Registration,
			Description:  rv.Description,
		}
		if err := h.vehicleRepo.UpsertFromDMS(r.Context(), v, rv.ImageURLs); err == nil {
			synced++
		}
	}

	jsonResponse(w, map[string]int{"synced": synced, "total": len(req.Vehicles)})
}
