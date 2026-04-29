package model

import "time"

type Enquiry struct {
	ID        string    `db:"id" json:"id"`
	VehicleID string    `db:"vehicle_id" json:"vehicle_id"`
	DealerID  string    `db:"dealer_id" json:"dealer_id"`
	Name      string    `db:"name" json:"name"`
	Email     string    `db:"email" json:"email"`
	Phone     *string   `db:"phone" json:"phone,omitempty"`
	Message   *string   `db:"message" json:"message,omitempty"`
	IsRead    bool      `db:"is_read" json:"is_read"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`

	// Joined
	Vehicle *Vehicle `db:"-" json:"vehicle,omitempty"`
}

type CreateEnquiryRequest struct {
	VehicleID string  `json:"vehicle_id"`
	Name      string  `json:"name"`
	Email     string  `json:"email"`
	Phone     *string `json:"phone"`
	Message   *string `json:"message"`
}
