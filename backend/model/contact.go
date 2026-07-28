package model

import "time"

type Contact struct {
	Id          int       `json:"id"`
	Email       string    `json:"email"`
	Phone       string    `json:"phone"`
	Description string    `json:"description"`
	Created_at  time.Time `json:"time"`
}
