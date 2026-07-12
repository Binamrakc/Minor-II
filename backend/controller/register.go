package controller

import (
	intializer "mis/Intializer"
	"net/http"
)

func createUser(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	address := r.PathValue("address")
	email := r.PathValue("email")
	phone := r.PathValue("phone")
	age := r.PathValue("age")
	date := r.PathValue("date")

	result := "insert into register(name,address,email,phone,age,created_at) values ($1,$2,$3,$4,$5,$6)"

	_, err := intializer.DB.Exec(result, name, address, email, phone, age, date)
	if err != nil {
		http.Error(w, "failet to get information", http.StatusInternalServerError)
		return
	}
}
