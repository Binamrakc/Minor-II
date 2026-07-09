package controller

import (
	intializer "mis/Intializer"
	"net/http"
)

func create(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	name := r.PathValue("name")
	address := r.PathValue("address")
	phone := r.PathValue("phone")
	age := r.PathValue("age")
	date := r.PathValue("date")

	result := "insert into register(id,name,address,phone,age,date) values (?,?,?,?,?,?)"

	_, err := intializer.DB.Exec(result, id, name, address, phone, age, date)
	if err != nil {
		http.Error(w, "failet to get information", http.StatusInternalServerError)
		return
	}
}
