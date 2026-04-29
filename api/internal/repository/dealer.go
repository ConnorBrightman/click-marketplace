package repository

import (
	"context"

	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/jmoiron/sqlx"
)

type DealerRepository struct {
	db *sqlx.DB
}

func NewDealerRepository(db *sqlx.DB) *DealerRepository {
	return &DealerRepository{db: db}
}

func (r *DealerRepository) GetByID(ctx context.Context, id string) (*model.Dealer, error) {
	var d model.Dealer
	err := r.db.GetContext(ctx, &d, `SELECT * FROM dealers WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}
	return &d, nil
}

func (r *DealerRepository) GetByClickdealerID(ctx context.Context, clickdealerID string) (*model.Dealer, error) {
	var d model.Dealer
	err := r.db.GetContext(ctx, &d, `SELECT * FROM dealers WHERE clickdealer_id = $1`, clickdealerID)
	if err != nil {
		return nil, err
	}
	return &d, nil
}

func (r *DealerRepository) GetByEmail(ctx context.Context, email string) (*model.Dealer, error) {
	var d model.Dealer
	err := r.db.GetContext(ctx, &d, `SELECT * FROM dealers WHERE email = $1 AND is_active = true`, email)
	if err != nil {
		return nil, err
	}
	return &d, nil
}

func (r *DealerRepository) GetDashboard(ctx context.Context, dealerID string) (*model.DealerDashboard, error) {
	var dash model.DealerDashboard

	r.db.GetContext(ctx, &dash.ActiveListings, `SELECT COUNT(*) FROM vehicles WHERE dealer_id=$1 AND status='active'`, dealerID)
	r.db.GetContext(ctx, &dash.TotalViews, `SELECT COALESCE(SUM(views_count),0) FROM vehicles WHERE dealer_id=$1`, dealerID)
	r.db.GetContext(ctx, &dash.UnreadEnquiries, `SELECT COUNT(*) FROM enquiries WHERE dealer_id=$1 AND is_read=false`, dealerID)
	r.db.GetContext(ctx, &dash.TotalEnquiries, `SELECT COUNT(*) FROM enquiries WHERE dealer_id=$1`, dealerID)

	return &dash, nil
}

func (r *DealerRepository) Upsert(ctx context.Context, d *model.Dealer) error {
	return r.db.QueryRowContext(ctx, `
		INSERT INTO dealers (clickdealer_id, name, slug, email, phone, address_line1, address_city, address_postcode, latitude, longitude, logo_url, is_active)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
		ON CONFLICT (clickdealer_id) DO UPDATE SET
			name=EXCLUDED.name, slug=EXCLUDED.slug, email=EXCLUDED.email,
			phone=EXCLUDED.phone, address_line1=EXCLUDED.address_line1,
			address_city=EXCLUDED.address_city, address_postcode=EXCLUDED.address_postcode,
			latitude=EXCLUDED.latitude, longitude=EXCLUDED.longitude,
			logo_url=EXCLUDED.logo_url, is_active=EXCLUDED.is_active,
			updated_at=NOW()
		RETURNING id
	`, d.ClickdealerID, d.Name, d.Slug, d.Email, d.Phone, d.AddressLine1, d.AddressCity,
		d.AddressPostcode, d.Latitude, d.Longitude, d.LogoURL, d.IsActive,
	).Scan(&d.ID)
}
