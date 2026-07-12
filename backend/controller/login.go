package controller

import (
	intializer "mis/Intializer"
	"net/http"
)

func Create(w http.ResponseWriter, r *http.Request) {

	id := r.PathValue("id")
	name := r.PathValue("name")

	result := "INSERT INTO users (id, name) VALUES (?,?)"

	_, err := intializer.DB.Exec(result, id, name)

	if err != nil {
		http.Error(w, "failed to get information", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("user created succesfully"))
}
func Login(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	name := r.PathValue("name")

	query := "SELECT * FROM users WHERE id=? AND name=?"

	var users intializer.Users

	err := intializer.DB.Get(&users, query, id, name)

	if err != nil {
		http.Error(w, "failed to get user info", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusAccepted)
	w.Write([]byte("Login succesfully" + users.Name))
}
func Update(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	name := r.PathValue("id")

	query := "update users set name=? WHERE id=? "

	_, err := intializer.DB.Exec(query, id, name)

	if err != nil {
		http.Error(w, "failed to update", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("updated successfully!!"))
}
func Delete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	query := "delete from users where id=?"

	_, err := intializer.DB.Exec(query, id)

	if err != nil {
		http.Error(w, "failed to update", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusBadRequest)
	w.Write([]byte("user deleted!!"))
}
