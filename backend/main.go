package main

import (
	intializer "mis/Intializer"
	middleware "mis/Middleware"
	"mis/controller"
	"net/http"
	"time"
)

func init() {
	intializer.Loadenv()
	intializer.DBconnect()
	intializer.User()
}

func main() {
	r := http.NewServeMux()

	s := http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}
	r.HandleFunc("GET /register/{email}", middleware.Emailexists(controller.CreateUser))
	r.HandleFunc("/login", controller.Login)
	r.HandleFunc("/update", controller.Update)
	r.HandleFunc("/delete", controller.Delete)
	s.ListenAndServe()
}
