package model

import "time"

type Listing struct {
	Id             int       `json:"id"`
	Title          string    `json:"title"`
	Description    string    `json:"description"`
	PropertyType   string    `json:"property_type"`
	Price          int       `json:"price"`
	ListingType    string    `json:"Listing_type"`
	PropertyStatus string    `json:"property_status"`
	Status         string    `json:"status"`
	Address        string    `json:"address"`
	City           string    `json:"city"`
	Created_at     time.Time `json:"date"`
}
