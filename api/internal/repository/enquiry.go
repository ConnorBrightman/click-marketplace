package repository

import (
	"context"

	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/jmoiron/sqlx"
)

type EnquiryRepository struct {
	db *sqlx.DB
}

func NewEnquiryRepository(db *sqlx.DB) *EnquiryRepository {
	return &EnquiryRepository{db: db}
}

func (r *EnquiryRepository) Create(ctx context.Context, e *model.Enquiry) error {
	return r.db.QueryRowContext(ctx, `
		INSERT INTO enquiries (vehicle_id, dealer_id, name, email, phone, message)
		VALUES ($1,$2,$3,$4,$5,$6)
		RETURNING id, created_at
	`, e.VehicleID, e.DealerID, e.Name, e.Email, e.Phone, e.Message,
	).Scan(&e.ID, &e.CreatedAt)
}

func (r *EnquiryRepository) GetByDealer(ctx context.Context, dealerID string) ([]model.Enquiry, error) {
	var enquiries []model.Enquiry
	err := r.db.SelectContext(ctx, &enquiries, `
		SELECT * FROM enquiries WHERE dealer_id = $1 ORDER BY created_at DESC
	`, dealerID)
	return enquiries, err
}

func (r *EnquiryRepository) MarkRead(ctx context.Context, id, dealerID string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE enquiries SET is_read=true WHERE id=$1 AND dealer_id=$2`, id, dealerID)
	return err
}
