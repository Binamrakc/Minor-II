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
	r.HandleFunc("POST /contact", controller.Contact)
	r.HandleFunc("GET /dashboard", controller.GetDashboard)
	// r.HandleFunc("GET /event", controller.GetEventByID) // New: Fetch single event

	// --- Authenticated User Routes ---
	r.HandleFunc("GET /user/me", middleware.Jwtmiddleware(controller.Getprofile)) // New: Fetch own profile
	r.HandleFunc("PUT /user/update", middleware.Jwtmiddleware(controller.Updateuser))
	r.HandleFunc("DELETE /user/me", middleware.Jwtmiddleware(controller.Deleteownid))

	r.HandleFunc("POST /createevent", middleware.Jwtmiddleware(controller.CreateEvent))
	r.HandleFunc("PUT /updateevent", middleware.Jwtmiddleware(controller.UpdateEvent))
	r.HandleFunc("DELETE /deleteevent", middleware.Jwtmiddleware(controller.DeleteEvent))
	// r.HandleFunc("GET /my-events", middleware.Jwtmiddleware(controller.GetMyEvents))  // New: Fetch logged-in user's events

	r.HandleFunc("GET /inquiry", middleware.Jwtmiddleware(controller.Getequiry))

	// --- Admin Routes ---
	r.HandleFunc("GET /admin/review", middleware.Jwtmiddleware(controller.Adminapprove))
	r.HandleFunc("PUT /admin/review", middleware.Jwtmiddleware(controller.ReviewEvent)) // New: Admin accept/reject action
	r.HandleFunc("GET /admin/users", middleware.Jwtmiddleware(controller.Getusers))
	r.HandleFunc("DELETE /admin/user", middleware.Jwtmiddleware(controller.Deleteuser))

	s.ListenAndServe()
}
