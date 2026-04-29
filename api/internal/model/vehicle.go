package model

import "time"

type Vehicle struct {
	ID           string    `db:"id" json:"id"`
	DealerID     string    `db:"dealer_id" json:"dealer_id"`
	DmsRef       *string   `db:"dms_ref" json:"dms_ref,omitempty"`
	VehicleType  string    `db:"vehicle_type" json:"vehicle_type"`
	Make         string    `db:"make" json:"make"`
	Model        string    `db:"model" json:"model"`
	Variant      *string   `db:"variant" json:"variant,omitempty"`
	Year         int       `db:"year" json:"year"`
	PricePence   int       `db:"price" json:"price_pence"`
	Mileage      int       `db:"mileage" json:"mileage"`
	FuelType     string    `db:"fuel_type" json:"fuel_type"`
	Transmission string    `db:"transmission" json:"transmission"`
	BodyType     *string   `db:"body_type" json:"body_type,omitempty"`
	Colour       *string   `db:"colour" json:"colour,omitempty"`
	Doors        *int      `db:"doors" json:"doors,omitempty"`
	EngineSize   *string   `db:"engine_size" json:"engine_size,omitempty"`
	Registration *string   `db:"registration" json:"registration,omitempty"`
	Description  *string   `db:"description" json:"description,omitempty"`
	Status       string    `db:"status" json:"status"`
	Featured     bool      `db:"featured" json:"featured"`
	ViewsCount   int       `db:"views_count" json:"views_count"`
	CreatedAt    time.Time `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time `db:"updated_at" json:"updated_at"`

	// Joined
	Images []VehicleImage `db:"-" json:"images,omitempty"`
	Dealer *Dealer        `db:"-" json:"dealer,omitempty"`

	// Computed
	PricePounds float64 `db:"-" json:"price"`
}

type VehicleImage struct {
	ID        string    `db:"id" json:"id"`
	VehicleID string    `db:"vehicle_id" json:"vehicle_id"`
	URL       string    `db:"url" json:"url"`
	Position  int       `db:"position" json:"position"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

type SearchParams struct {
	VehicleType  string
	Make         string
	Model        string
	MinPrice     int
	MaxPrice     int
	MinYear      int
	MaxYear      int
	MinMileage   int
	MaxMileage   int
	FuelType     string
	Transmission string
	BodyType     string
	Colour       string
	Doors        int
	DealerID     string
	Postcode     string
	Sort         string
	Page         int
	PerPage      int
	Q            string
}

type SearchResult struct {
	Vehicles   []Vehicle `json:"vehicles"`
	Total      int       `json:"total"`
	Page       int       `json:"page"`
	PerPage    int       `json:"per_page"`
	TotalPages int       `json:"total_pages"`
}

type CreateVehicleRequest struct {
	DmsRef       *string `json:"dms_ref"`
	VehicleType  string  `json:"vehicle_type"`
	Make         string  `json:"make"`
	Model        string  `json:"model"`
	Variant      *string `json:"variant"`
	Year         int     `json:"year"`
	PricePounds  float64 `json:"price"`
	Mileage      int     `json:"mileage"`
	FuelType     string  `json:"fuel_type"`
	Transmission string  `json:"transmission"`
	BodyType     *string `json:"body_type"`
	Colour       *string `json:"colour"`
	Doors        *int    `json:"doors"`
	EngineSize   *string `json:"engine_size"`
	Registration *string `json:"registration"`
	Description  *string `json:"description"`
	ImageURLs    []string `json:"image_urls"`
}

type SyncVehiclesRequest struct {
	DealerClickdealerID string                 `json:"dealer_clickdealer_id"`
	Vehicles            []CreateVehicleRequest `json:"vehicles"`
}
