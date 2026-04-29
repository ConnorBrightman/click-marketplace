package handler

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/clickdealer/click-marketplace/api/internal/middleware"
	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/clickdealer/click-marketplace/api/internal/repository"
	"github.com/golang-jwt/jwt/v5"
)

type DealerHandler struct {
	repo *repository.DealerRepository
}

func NewDealerHandler(repo *repository.DealerRepository) *DealerHandler {
	return &DealerHandler{repo: repo}
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Login issues a JWT. For MVP, any active dealer can log in with just their email.
// In production this would verify a password hash.
func (h *DealerHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "invalid request", http.StatusBadRequest)
		return
	}

	dealer, err := h.repo.GetByEmail(r.Context(), req.Email)
	if err != nil {
		jsonError(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	claims := jwt.MapClaims{
		"dealer_id": dealer.ID,
		"email":     dealer.Email,
		"exp":       time.Now().Add(24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		jsonError(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	jsonResponse(w, map[string]interface{}{
		"token":  signed,
		"dealer": dealer,
	})
}

func (h *DealerHandler) GetDashboard(w http.ResponseWriter, r *http.Request) {
	dealerID := middleware.GetDealerID(r.Context())
	dash, err := h.repo.GetDashboard(r.Context(), dealerID)
	if err != nil {
		jsonError(w, "failed to fetch dashboard", http.StatusInternalServerError)
		return
	}
	jsonResponse(w, dash)
}

func (h *DealerHandler) SyncDealer(w http.ResponseWriter, r *http.Request) {
	var d model.Dealer
	if err := json.NewDecoder(r.Body).Decode(&d); err != nil {
		jsonError(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.repo.Upsert(r.Context(), &d); err != nil {
		jsonError(w, "sync failed", http.StatusInternalServerError)
		return
	}

	jsonResponse(w, d)
}
