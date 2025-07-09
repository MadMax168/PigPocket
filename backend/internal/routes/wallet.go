package routes

import (
	"pigpocket/internal/db"
	"github.com/gin-gonic/gin"
	"pigpocket/internal/models"
)

func WalletRoutes(r *gin.RouterGroup) {
	db.DB.AutoMigrate(&models.Wallet{})
	
	r.GET("/wallet", func(c *gin.Context){
		UID := c.GetUint("userID")
		var wallets []models.Wallet

		if err := db.DB.Where("user_id = ?", UID).Find(&wallets).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}
		
		c.JSON(200, wallets)
	}) //Filter Feature

	r.POST("/wallet", func(c *gin.Context){
		var wallet models.Wallet

		if err := c.BindJSON(&wallet); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		UID := c.GetUint("userID")
		wallet.UserID = UID

		db.DB.Create(&wallet)
		c.JSON(201, wallet)
	})

	r.PUT("/wallet", func(c *gin.Context){
		UID := c.GetUint("userID")
		id := c.Param("id")
		var wallet models.Wallet

		if err := db.DB.First(&wallet, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if wallet.UserID != UID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}

		if err := c.BindJSON(&wallet); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		
		wallet.UserID = UID
		db.DB.Save(&wallet)
		c.JSON(200, wallet)
	})

	r.DELETE("/wallet", func(c *gin.Context){
		UID := c.GetUint("userID")
		id := c.Param("id")
		var wallet models.Wallet

		if err := db.DB.First(&wallet, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if wallet.UserID != UID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}

		db.DB.Delete(&wallet)
		c.JSON(200, "Delete-Success")
	})
}