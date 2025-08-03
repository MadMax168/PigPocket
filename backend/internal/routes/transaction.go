package routes

import (
	"pigpocket/internal/db"
	"pigpocket/internal/logic"
	"pigpocket/internal/models"

	"github.com/gin-gonic/gin"
)

func TransactionRoutes(r *gin.RouterGroup) {
	db.DB.AutoMigrate(&models.Transaction{}) //Create Transaction Table

	r.GET("/transactions", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ?", UID, WID).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, txs)
	})

	r.GET("/paytable", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ? AND status = ?", UID, WID, false).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		for i := range txs {
			if txs[i].Status == false {
				c.JSON(200, gin.H{
					"title":  txs[i].Title,
					"amount": txs[i].Amount,
					"date":   txs[i].Date,
					"status": txs[i].Status,
				})
			} else {
				c.JSON(404, gin.H{"error": "No pending transactions found"})
				return
			}
		}
	})

	r.GET("/sumtable", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ?", UID, WID).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		for i := range txs {
			c.JSON(200, gin.H{
				"title":    txs[i].Title,
				"amount":   txs[i].Amount,
				"type":     txs[i].Type,
				"category": txs[i].Category,
				"date":     txs[i].Date,
			})
		}
	})

	r.POST("/paylist", func(c *gin.Context) {
		var tx models.Transaction

		if err := c.BindJSON(&tx); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		tx.UserID = UID
		tx.WalletID = WID
		tx.Status = false

		db.DB.Create(&tx)
		c.JSON(201, tx)
	})

	r.POST("/transactions", func(c *gin.Context) {
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

	r.PUT("/transactions", func(c *gin.Context) {
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

	r.DELETE("/transactions", func(c *gin.Context) {
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

	r.GET("/summary", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")

		data, err := logic.SummaryFeature(UID, WID)
		if err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		c.JSON(200, data)
	})
}
