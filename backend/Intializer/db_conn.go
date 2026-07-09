package intializer

import (
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Users struct {
	ID   int    `db:"id"`
	Name string `db:"name"`
}

var DB *sqlx.DB

func DBconnect() {
	dsn := os.Getenv("DSN")
	db, err := sqlx.Connect("mysql", dsn)
	if err != nil {
		log.Fatal("error connecting to database\n", err)
	}
	DB = db

	log.Println("Database created succesfully")
}
