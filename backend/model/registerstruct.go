package model

import "time"

type Registerinput struct {
	Name     string    `json:"name"`
	Address  string    `json:"address"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
	Phone    int       `json:"phone"`
	Age      int       `json:"age"`
	Date     time.Time `json:"date"`
}
