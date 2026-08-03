package model

import "time"

type Registerinput struct {
	Id       int       `json:"id"`
	Name     string    `json:"name"`
	Address  string    `json:"address"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
	Phone    string    `json:"phone"`
	Age      int       `json:"age"`
	Date     time.Time `json:"date"`
	Status   string    `json:"status"`
}
