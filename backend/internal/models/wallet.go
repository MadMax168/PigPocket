package models

import "gorm.io/gorm"

type Wallet struct {
	gorm.Model
	Name string `json:"name"`
	Target string `json:"target"`
	Goal float64 `json:"goal"`
	UserID uint 
	User User
	Transactions []Transaction
}