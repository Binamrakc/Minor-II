package main

import (
	"mis/controller"
	"mis/model"
	"net/http"
	"time"
)

func main() {
	r := http.NewServeMux()

	model.Loadenv()
	model.DBconnect()
	model.Dbmigrate()
	s := http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}
	r.HandleFunc("GET/register", controller.Create)
	r.HandleFunc("/login", controller.Login)
	r.HandleFunc("/update", controller.Update)
	r.HandleFunc("/delete", controller.Delete)
	s.ListenAndServe()
}
