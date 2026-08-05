package model

import "time"

type Listing struct {
	Id             int       `json:"id"`
	Title          string    `json:"title"`
	Description    string    `json:"description"`
	PropertyType   string    `json:"propertytype"`
	Price          int       `json:"price"`
	ListingType    string    `json:"listingtype"`
	PropertyStatus string    `json:"propertystatus"`
	Status         string    `json:"status"`
	Address        string    `json:"address"`
	City           string    `json:"city"`
	Created_at     time.Time `json:"date"`
	Imageurl       string    `json:"image"`
}
