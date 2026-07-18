package model

type Contact struct {
	id          int    `json:"id"`
	email       string `json:"email"`
	phone       string `json:"email"`
	description string `json:"description"`
}
