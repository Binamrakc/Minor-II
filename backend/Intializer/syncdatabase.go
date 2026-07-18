package intializer

import (
	"log"
)

func User() {

	Register := `
		create table if not exists register(
		Id int AUTO_INCREMENT primary key,
		name varchar(55) not null,
		email varchar(55) unique,
		Password varchar(255) not null,
		address varchar(55) not null,
		phone integer not null,
		age integer not null,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
	title varchar(100) not null,
	description text,
	propertytype Enum('apartment','house','villa','office')Not null,
	price int NOT NULL,
	listingtype Enum('sale','rent')Not null,
	propertyStatus Enum('available','Booked','Sold'),
	status Enum('pending','approved','rejected') Default 'pending',
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
