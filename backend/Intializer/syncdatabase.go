package intializer

import (
	"log"
)

func User() {

	_, _ = DB.Exec("DROP TABLE IF EXISTS register;")

	Register := `
		create table if not exists register(
		Id serial primary key,
		name varchar(55) not null,
		email varchar(55) unique,
		Password varchar(255) not null,
		address varchar(55) not null,
		phone integer not null,
		age integer not null,
		created_at Date not null
		 );`
	_, err := DB.Exec(Register)
	if err != nil {
		log.Fatal("failed to exec the register table")
	} else {
		log.Println("register table created")
	}

	Listing := `
	create table if not exists Property(
	id int AUTO_INCREMENT primary key,
	Title varchar(100) not null,
	Description text,
	Property_type Enum('apartment','house','villa','office')Not null,
	Price int NOT NULL,
	Listing_type Enum('sale','rent')Not null,
	Property_Status Enum('available','Booked','Sold'),
	Status Enum('pending','approved','rejected') Default 'pending',
	address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
	Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	INDEX idx_price(price),
	INDEX idx_prop_add(address,city),
	INDEX idx_prop_type(property_type)
	);`
	_, err = DB.Exec(Listing)
	if err != nil {
		log.Fatal("failed to exec db listing")
	} else {
		log.Println("Listing table created")
	}
	log.Printf("table execute sucessfully")
}
