package repository

import (
	"context"
	"fmt"
	"strings"

	"github.com/clickdealer/click-marketplace/api/internal/model"
	"github.com/jmoiron/sqlx"
)

type VehicleRepository struct {
	db *sqlx.DB
}

func NewVehicleRepository(db *sqlx.DB) *VehicleRepository {
	return &VehicleRepository{db: db}
}

func (r *VehicleRepository) Search(ctx context.Context, params model.SearchParams) ([]model.Vehicle, int, error) {
	conditions := []string{"v.status = 'active'"}
	args := []interface{}{}
	argIdx := 1

	if params.VehicleType != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.vehicle_type) = LOWER($%d)", argIdx))
		args = append(args, params.VehicleType)
		argIdx++
	}
	if params.Make != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.make) = LOWER($%d)", argIdx))
		args = append(args, params.Make)
		argIdx++
	}
	if params.Model != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.model) = LOWER($%d)", argIdx))
		args = append(args, params.Model)
		argIdx++
	}
	if params.MinPrice > 0 {
		conditions = append(conditions, fmt.Sprintf("v.price >= $%d", argIdx))
		args = append(args, params.MinPrice)
		argIdx++
	}
	if params.MaxPrice > 0 {
		conditions = append(conditions, fmt.Sprintf("v.price <= $%d", argIdx))
		args = append(args, params.MaxPrice)
		argIdx++
	}
	if params.MinYear > 0 {
		conditions = append(conditions, fmt.Sprintf("v.year >= $%d", argIdx))
		args = append(args, params.MinYear)
		argIdx++
	}
	if params.MaxYear > 0 {
		conditions = append(conditions, fmt.Sprintf("v.year <= $%d", argIdx))
		args = append(args, params.MaxYear)
		argIdx++
	}
	if params.MinMileage > 0 {
		conditions = append(conditions, fmt.Sprintf("v.mileage >= $%d", argIdx))
		args = append(args, params.MinMileage)
		argIdx++
	}
	if params.MaxMileage > 0 {
		conditions = append(conditions, fmt.Sprintf("v.mileage <= $%d", argIdx))
		args = append(args, params.MaxMileage)
		argIdx++
	}
	if params.FuelType != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.fuel_type) = LOWER($%d)", argIdx))
		args = append(args, params.FuelType)
		argIdx++
	}
	if params.Transmission != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.transmission) = LOWER($%d)", argIdx))
		args = append(args, params.Transmission)
		argIdx++
	}
	if params.BodyType != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.body_type) = LOWER($%d)", argIdx))
		args = append(args, params.BodyType)
		argIdx++
	}
	if params.Colour != "" {
		conditions = append(conditions, fmt.Sprintf("LOWER(v.colour) LIKE LOWER($%d)", argIdx))
		args = append(args, "%"+params.Colour+"%")
		argIdx++
	}
	if params.Doors > 0 {
		conditions = append(conditions, fmt.Sprintf("v.doors = $%d", argIdx))
		args = append(args, params.Doors)
		argIdx++
	}
	if params.DealerID != "" {
		conditions = append(conditions, fmt.Sprintf("v.dealer_id = $%d", argIdx))
		args = append(args, params.DealerID)
		argIdx++
	}
	if params.Postcode != "" {
		conditions = append(conditions, fmt.Sprintf("UPPER(REPLACE(d.address_postcode, ' ', '')) LIKE UPPER($%d)", argIdx))
		args = append(args, strings.ReplaceAll(params.Postcode, " ", "")+"%")
		argIdx++
	}
	if params.Q != "" {
		conditions = append(conditions, fmt.Sprintf(
			"(LOWER(v.make) LIKE LOWER($%d) OR LOWER(v.model) LIKE LOWER($%d) OR LOWER(v.variant) LIKE LOWER($%d))",
			argIdx, argIdx+1, argIdx+2,
		))
		like := "%" + params.Q + "%"
		args = append(args, like, like, like)
		argIdx += 3
	}

	where := "WHERE " + strings.Join(conditions, " AND ")

	orderBy := "v.featured DESC, v.created_at DESC"
	switch params.Sort {
	case "price_asc":
		orderBy = "v.price ASC"
	case "price_desc":
		orderBy = "v.price DESC"
	case "newest":
		orderBy = "v.year DESC, v.created_at DESC"
	case "mileage":
		orderBy = "v.mileage ASC"
	case "recently_listed":
		orderBy = "v.created_at DESC"
	}

	if params.PerPage <= 0 {
		params.PerPage = 20
	}
	if params.Page <= 0 {
		params.Page = 1
	}
	offset := (params.Page - 1) * params.PerPage

	countQuery := fmt.Sprintf(`SELECT COUNT(*) FROM vehicles v JOIN dealers d ON d.id = v.dealer_id %s`, where)
	var total int
	if err := r.db.GetContext(ctx, &total, countQuery, args...); err != nil {
		return nil, 0, err
	}

	query := fmt.Sprintf(`
		SELECT v.*, d.name as dealer_name, d.address_city as dealer_city, d.address_postcode as dealer_postcode
		FROM vehicles v
		JOIN dealers d ON d.id = v.dealer_id
		%s
		ORDER BY %s
		LIMIT $%d OFFSET $%d
	`, where, orderBy, argIdx, argIdx+1)

	args = append(args, params.PerPage, offset)

	rows, err := r.db.QueryxContext(ctx, query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	type vehicleRow struct {
		model.Vehicle
		DealerName     string  `db:"dealer_name"`
		DealerCity     *string `db:"dealer_city"`
		DealerPostcode *string `db:"dealer_postcode"`
	}

	var vehicles []model.Vehicle
	for rows.Next() {
		var row vehicleRow
		if err := rows.StructScan(&row); err != nil {
			return nil, 0, err
		}
		v := row.Vehicle
		v.PricePounds = float64(v.PricePence) / 100
		v.Dealer = &model.Dealer{
			Name:            row.DealerName,
			AddressCity:     row.DealerCity,
			AddressPostcode: row.DealerPostcode,
		}
		vehicles = append(vehicles, v)
	}

	if len(vehicles) == 0 {
		vehicles = []model.Vehicle{}
	}

	vehicleIDs := make([]string, len(vehicles))
	for i, v := range vehicles {
		vehicleIDs[i] = v.ID
	}

	if len(vehicleIDs) > 0 {
		images, err := r.getImagesForVehicles(ctx, vehicleIDs)
		if err == nil {
			for i := range vehicles {
				if imgs, ok := images[vehicles[i].ID]; ok {
					vehicles[i].Images = imgs
				} else {
					vehicles[i].Images = []model.VehicleImage{}
				}
			}
		}
	}

	return vehicles, total, nil
}

func (r *VehicleRepository) GetByID(ctx context.Context, id string) (*model.Vehicle, error) {
	var v model.Vehicle
	err := r.db.GetContext(ctx, &v, `SELECT * FROM vehicles WHERE id = $1`, id)
	if err != nil {
		return nil, err
	}
	v.PricePounds = float64(v.PricePence) / 100

	var dealer model.Dealer
	if err := r.db.GetContext(ctx, &dealer, `SELECT * FROM dealers WHERE id = $1`, v.DealerID); err == nil {
		v.Dealer = &dealer
	}

	images, err := r.getImagesForVehicles(ctx, []string{id})
	if err == nil {
		v.Images = images[id]
	}
	if v.Images == nil {
		v.Images = []model.VehicleImage{}
	}

	return &v, nil
}

func (r *VehicleRepository) IncrementViews(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE vehicles SET views_count = views_count + 1 WHERE id = $1`, id)
	return err
}

func (r *VehicleRepository) GetMakes(ctx context.Context) ([]string, error) {
	var makes []string
	err := r.db.SelectContext(ctx, &makes, `SELECT DISTINCT make FROM vehicles WHERE status = 'active' ORDER BY make`)
	return makes, err
}

func (r *VehicleRepository) GetByDealer(ctx context.Context, dealerID string) ([]model.Vehicle, error) {
	var vehicles []model.Vehicle
	err := r.db.SelectContext(ctx, &vehicles, `
		SELECT * FROM vehicles WHERE dealer_id = $1 ORDER BY created_at DESC
	`, dealerID)
	if err != nil {
		return nil, err
	}
	for i := range vehicles {
		vehicles[i].PricePounds = float64(vehicles[i].PricePence) / 100
	}
	return vehicles, nil
}

func (r *VehicleRepository) Create(ctx context.Context, v *model.Vehicle, imageURLs []string) error {
	tx, err := r.db.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	err = tx.QueryRowContext(ctx, `
		INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage,
			fuel_type, transmission, body_type, colour, doors, engine_size, registration, description)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
		RETURNING id, created_at, updated_at
	`, v.DealerID, v.DmsRef, v.VehicleType, v.Make, v.Model, v.Variant, v.Year, v.PricePence, v.Mileage,
		v.FuelType, v.Transmission, v.BodyType, v.Colour, v.Doors, v.EngineSize, v.Registration, v.Description,
	).Scan(&v.ID, &v.CreatedAt, &v.UpdatedAt)
	if err != nil {
		return err
	}

	for i, url := range imageURLs {
		_, err = tx.ExecContext(ctx, `
			INSERT INTO vehicle_images (vehicle_id, url, position) VALUES ($1, $2, $3)
		`, v.ID, url, i)
		if err != nil {
			return err
		}
	}

	return tx.Commit()
}

func (r *VehicleRepository) Update(ctx context.Context, v *model.Vehicle) error {
	_, err := r.db.ExecContext(ctx, `
		UPDATE vehicles SET
			make=$1, model=$2, variant=$3, year=$4, price=$5, mileage=$6,
			fuel_type=$7, transmission=$8, body_type=$9, colour=$10, doors=$11,
			engine_size=$12, registration=$13, description=$14, status=$15, updated_at=NOW()
		WHERE id=$16 AND dealer_id=$17
	`, v.Make, v.Model, v.Variant, v.Year, v.PricePence, v.Mileage,
		v.FuelType, v.Transmission, v.BodyType, v.Colour, v.Doors,
		v.EngineSize, v.Registration, v.Description, v.Status, v.ID, v.DealerID)
	return err
}

func (r *VehicleRepository) Delete(ctx context.Context, id, dealerID string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM vehicles WHERE id=$1 AND dealer_id=$2`, id, dealerID)
	return err
}

func (r *VehicleRepository) UpsertFromDMS(ctx context.Context, v *model.Vehicle, imageURLs []string) error {
	tx, err := r.db.BeginTxx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	err = tx.QueryRowContext(ctx, `
		INSERT INTO vehicles (dealer_id, dms_ref, vehicle_type, make, model, variant, year, price, mileage,
			fuel_type, transmission, body_type, colour, doors, engine_size, registration, description)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
		ON CONFLICT (dealer_id, dms_ref) WHERE dms_ref IS NOT NULL
		DO UPDATE SET
			vehicle_type=EXCLUDED.vehicle_type, make=EXCLUDED.make, model=EXCLUDED.model, variant=EXCLUDED.variant,
			year=EXCLUDED.year, price=EXCLUDED.price, mileage=EXCLUDED.mileage,
			fuel_type=EXCLUDED.fuel_type, transmission=EXCLUDED.transmission,
			body_type=EXCLUDED.body_type, colour=EXCLUDED.colour, doors=EXCLUDED.doors,
			engine_size=EXCLUDED.engine_size, registration=EXCLUDED.registration,
			description=EXCLUDED.description, updated_at=NOW()
		RETURNING id
	`, v.DealerID, v.DmsRef, v.VehicleType, v.Make, v.Model, v.Variant, v.Year, v.PricePence, v.Mileage,
		v.FuelType, v.Transmission, v.BodyType, v.Colour, v.Doors, v.EngineSize, v.Registration, v.Description,
	).Scan(&v.ID)
	if err != nil {
		return err
	}

	if len(imageURLs) > 0 {
		_, err = tx.ExecContext(ctx, `DELETE FROM vehicle_images WHERE vehicle_id=$1`, v.ID)
		if err != nil {
			return err
		}
		for i, url := range imageURLs {
			_, err = tx.ExecContext(ctx, `INSERT INTO vehicle_images (vehicle_id, url, position) VALUES ($1,$2,$3)`, v.ID, url, i)
			if err != nil {
				return err
			}
		}
	}

	return tx.Commit()
}

func (r *VehicleRepository) getImagesForVehicles(ctx context.Context, vehicleIDs []string) (map[string][]model.VehicleImage, error) {
	if len(vehicleIDs) == 0 {
		return map[string][]model.VehicleImage{}, nil
	}

	query, args, err := sqlx.In(`SELECT * FROM vehicle_images WHERE vehicle_id IN (?) ORDER BY vehicle_id, position`, vehicleIDs)
	if err != nil {
		return nil, err
	}
	query = r.db.Rebind(query)

	var images []model.VehicleImage
	if err := r.db.SelectContext(ctx, &images, query, args...); err != nil {
		return nil, err
	}

	result := make(map[string][]model.VehicleImage)
	for _, img := range images {
		result[img.VehicleID] = append(result[img.VehicleID], img)
	}
	return result, nil
}
