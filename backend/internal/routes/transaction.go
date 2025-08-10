package routes

import (
	"pigpocket/internal/db"
	"pigpocket/internal/models"

	"github.com/gin-gonic/gin"
)

func TransactionRoutes(r *gin.RouterGroup) {
	db.DB.AutoMigrate(&models.Transaction{}) //Create Transaction Table

	r.GET("/paytable", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ? AND status = ?", UID, WID, false).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		var result []gin.H
		for _, tx := range txs {
			result = append(result, gin.H{
				"title":  tx.Title,
				"amount": tx.Amount,
				"date":   tx.Date,
				"status": tx.Status,
			})
		}

		if len(result) == 0 {
			c.JSON(404, gin.H{"error": "No pending transactions found"})
			return
		}

		c.JSON(200, result)
	})

	r.GET("/allsumcard", func(c *gin.Context) {
		UID := c.GetUint("userID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ?", UID).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		var allIn, allEx, allSave float64

		for _, tx := range txs {
			switch tx.Type {
			case "Income":
				allIn += tx.Amount
			case "Expense":
				allEx += tx.Amount
			case "Save":
				allSave += tx.Amount
			}
		}

		c.JSON(200, gin.H{
			"allincome":  allIn,
			"allexpense": allEx,
			"allsave":    allSave,
		})
	})

	r.GET("/sumcard", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ?", UID, WID).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		var income, expense, save float64

		for _, tx := range txs {
			switch tx.Type {
			case "Income":
				income += tx.Amount
			case "Expense":
				expense += tx.Amount
			case "Save":
				save += tx.Amount
			}
		}

		c.JSON(200, gin.H{
			"income":  income,
			"expense": expense,
			"save":    save,
		})
	})

	r.GET("/sumtable", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		var txs []models.Transaction

		if err := db.DB.Where("user_id = ? AND wallet_id = ?", UID, WID).Find(&txs).Error; err != nil {
			c.JSON(500, gin.H{"error": err.Error()})
			return
		}

		var result []gin.H
		for _, tx := range txs {
			result = append(result, gin.H{
				"title":    tx.Title,
				"amount":   tx.Amount,
				"type":     tx.Type,
				"category": tx.Category,
				"date":     tx.Date,
			})
		}

		c.JSON(200, result)
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

	//Transaction Form
	//POST Transactions
	r.POST("/trans", func(c *gin.Context) {
		var tx models.Transaction

		if err := c.BindJSON(&tx); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		tx.UserID = UID
		tx.WalletID = WID
		tx.Status = true

		db.DB.Create(&tx)
		c.JSON(201, tx)
	})

	//PUT Transactions
	r.PUT("updpay", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		id := c.Param("id")
		var tx models.Transaction

		if err := db.DB.First(&tx, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if tx.UserID != UID && tx.WalletID != WID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}

		if err := c.BindJSON(&tx); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		tx.UserID = UID
		tx.Status = false
		db.DB.Save(&tx)
		c.JSON(200, tx)
	})

	r.PUT("/updtrans", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		id := c.Param("id")
		var tx models.Transaction

		if err := db.DB.First(&tx, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if tx.UserID != UID && tx.WalletID != WID {
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

	//Delete Transaction
	r.DELETE("/delpay", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		id := c.Param("id")
		var tx models.Transaction

		if err := db.DB.First(&tx, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if tx.UserID != UID && tx.WalletID != WID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}

		db.DB.Delete(&tx)
		c.JSON(200, "Delete-PayList")
	})

	r.DELETE("/deltrans", func(c *gin.Context) {
		UID := c.GetUint("userID")
		WID := c.GetUint("walletID")
		id := c.Param("id")
		var tx models.Transaction

		if err := db.DB.First(&tx, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if tx.UserID != UID && tx.WalletID != WID {
			c.JSON(403, gin.H{"error": "Unauthorized"})
			return
		}

		db.DB.Delete(&tx)
		c.JSON(200, "Delete-Transactions")
	})
}
