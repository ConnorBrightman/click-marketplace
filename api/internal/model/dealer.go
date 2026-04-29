package model

import "time"

type Dealer struct {
	ID              string     `db:"id" json:"id"`
	ClickdealerID   string     `db:"clickdealer_id" json:"clickdealer_id"`
	Name            string     `db:"name" json:"name"`
	Slug            string     `db:"slug" json:"slug"`
	Email           string     `db:"email" json:"email"`
	Phone           *string    `db:"phone" json:"phone,omitempty"`
	AddressLine1    *string    `db:"address_line1" json:"address_line1,omitempty"`
	AddressCity     *string    `db:"address_city" json:"address_city,omitempty"`
	AddressPostcode *string    `db:"address_postcode" json:"address_postcode,omitempty"`
	Latitude        *float64   `db:"latitude" json:"latitude,omitempty"`
	Longitude       *float64   `db:"longitude" json:"longitude,omitempty"`
	LogoURL         *string    `db:"logo_url" json:"logo_url,omitempty"`
	WebsiteURL      *string    `db:"website_url" json:"website_url,omitempty"`
	IsActive        bool       `db:"is_active" json:"is_active"`
	CreatedAt       time.Time  `db:"created_at" json:"created_at"`
	UpdatedAt       time.Time  `db:"updated_at" json:"updated_at"`
}

type DealerDashboard struct {
	ActiveListings  int `json:"active_listings"`
	TotalViews      int `json:"total_views"`
	UnreadEnquiries int `json:"unread_enquiries"`
	TotalEnquiries  int `json:"total_enquiries"`
}
