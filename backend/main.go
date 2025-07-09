package main

import (
	"log"
	"time"
	"pigpocket/internal/db"
	"github.com/gin-gonic/gin"
	"pigpocket/internal/routes"
	"pigpocket/internal/middleware"
)

func main() {
	time.Sleep(3 * time.Second)
	db.InitDB() //Connected to DB
	log.Println("✅ Server started")

	r := gin.Default()
	routes.UserRoutes(r)

	auth := r.Group("/")
	auth.Use(middleware.AuthMiddleware())

	routes.WalletRoutes(auth)
	routes.TransactionRoutes(auth)
	

	r.Run(":8000") //Port
}
