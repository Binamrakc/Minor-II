package main

import (
	intializer "mis/Intializer"
	middleware "mis/Middleware"

	"mis/controller"
	"net/http"
	"time"

	"github.com/rs/cors"
)

func init() {
	intializer.Loadenv()
	intializer.DBconnect()
	intializer.User()
}

func main() {

	r := http.NewServeMux()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})
	corshandler := c.Handler(r)
	s := http.Server{
		Addr:         ":8080",
		Handler:      corshandler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
	}

	r.HandleFunc("POST /register", controller.CreateUser)
	r.HandleFunc("POST /login", controller.Login)
	r.HandleFunc("POST /contact", middleware.Jwtmiddleware(controller.Contact))
	r.HandleFunc("GET /dashboard", controller.GetDashboard)
	r.HandleFunc("GET /event", controller.GetEventByID)
	r.HandleFunc("GET /search", controller.SearchProperty)
	r.HandleFunc("GET /user/me", middleware.Jwtmiddleware(controller.Getprofile))
	r.HandleFunc("PUT /user/update", middleware.Jwtmiddleware(controller.Updateuser))
	r.HandleFunc("DELETE /user/me", middleware.Jwtmiddleware(controller.Deleteownid))
	r.HandleFunc("POST /createevent", middleware.Jwtmiddleware(controller.CreateEvent))
	r.HandleFunc("PUT /updateevent", middleware.Jwtmiddleware(controller.UpdateEvent))
	r.HandleFunc("DELETE /deleteevent", middleware.Jwtmiddleware(controller.DeleteEvent))
	r.HandleFunc("GET /inquiry", middleware.Jwtmiddleware(controller.Getequiry))
	r.HandleFunc("GET /admin/review", middleware.Jwtmiddleware(controller.Adminapprove))
	r.HandleFunc("PUT /admin/review", middleware.Jwtmiddleware(controller.ReviewEvent))
	r.HandleFunc("GET /admin/users", middleware.Jwtmiddleware(controller.Getusers))
	r.HandleFunc("DELETE /admin/user", middleware.Jwtmiddleware(controller.Deleteuser))
	r.Handle("GET /uploads/", http.StripPrefix("/uploads/", http.FileServer(http.Dir("./uploads"))))

	s.ListenAndServe()
}
