package models

import "gorm.io/gorm"

type Transaction struct {
	gorm.Model
	Title string `json:"title"`
	Amount float64 `json:"amount"`
	Type string `json:"type"`
	Category string `json:"category"` 
	Desc string `json:"desc"`
	Status bool `json:"status"`
	Date string `json:"date"`
	WalletID uint 
	Wallet Wallet
	UserID uint
	User User
}