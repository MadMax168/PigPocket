package db

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	dsn := fmt.Sprintf("host=db user=postgres password=postgres dbname=pigpocket port=5432 sslmode=disable")
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("❌ เชื่อมต่อฐานข้อมูลไม่ได้")
	}
	DB = database
}