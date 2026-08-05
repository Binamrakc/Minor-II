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
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		Status Enum('user','seller','admin') default 'user'
		 );`
	_, err := DB.Exec(Register)
	if err != nil {
		log.Fatal("failed to exec the register table")
	} else {
		log.Println("register table created")
	}

	Listing := `
CREATE TABLE IF NOT EXISTS Property (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    propertytype ENUM('apartment', 'house', 'villa', 'office') NOT NULL,
    price INT NOT NULL,
    listingtype ENUM('sale', 'rent') NOT NULL,
    propertystatus ENUM('available', 'booked', 'sold') DEFAULT 'available',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url TEXT,

    INDEX idx_price (price),
    INDEX idx_prop_add (address, city),
    INDEX idx_prop_type (propertytype)
);`
	_, err = DB.Exec(Listing)
	if err != nil {
		log.Fatal("failed to exec db listing")
	} else {
		log.Println("Listing table created")
	}
	Contact :=
		`create table if not exists contact(
	id int auto_increment primary key,
	email varchar(255) not null,
	phone varchar(22) not null,
	description text,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`
	_, err = DB.Exec(Contact)
	if err != nil {
		log.Fatal("failed to create table")
	} else {
		log.Println("contact table created successfully")
	}
	log.Printf("table execute sucessfully")
}
