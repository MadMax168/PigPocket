package routes

import (
	"pigpocket/internal/db"
	"github.com/gin-gonic/gin"
	"pigpocket/internal/models"
)

func TransactionRoutes(r *gin.RouterGroup) {
	db.DB.AutoMigrate(&models.Transaction{}) //Create Transaction Table

	r.GET("/transactions", func(c *gin.Context){
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ?", UID, WID).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, txs)
	})

	r.POST("/transactions", func(c *gin.Context){
		var tx models.Transaction

		if err := c.BindJSON(&tx); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		tx.UserID = UID
		tx.WalletID = WID

		db.DB.Create(&tx)
		c.JSON(201, tx)
	})

	r.PUT("/transactions", func(c *gin.Context){
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		id := c.Param("id")
		var tx models.Transaction

		if err := db.DB.First(&tx, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if tx.UserID != UID || tx.WalletID != WID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}

		if err := c.BindJSON(&tx); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		
		tx.UserID = UID
		db.DB.Save(&tx)
		c.JSON(200, tx)
	})

	r.DELETE("/transactions", func(c *gin.Context){
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		id := c.Param("id")
		var tx models.Transaction

		if err := db.DB.First(&tx, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if tx.UserID != UID || tx.WalletID != WID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}


		db.DB.Delete(&tx)
		c.JSON(200, "Delete-Success")
	})
}
