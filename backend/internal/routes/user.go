package routes

import (
	"pigpocket/internal/db"
	"pigpocket/internal/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"pigpocket/internal/middleware"
)

func UserRoutes(r *gin.Engine) {
	db.DB.AutoMigrate(&models.User{})

	r.GET("/userdata", func(c *gin.Context) {
		var users []models.User

		c.JSON(200, users)
	})

	r.POST("/register", func(c *gin.Context) {
		var user models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
		}

		hashed, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(500, gin.H{"error": "Password hashing failed"})
			return
		}
		user.Password = string(hashed)

		db.DB.Create(&user)
		c.JSON(201, user)
	})

	r.POST("/login", func(c *gin.Context) {
		var userdata struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}

		if err := c.BindJSON(&userdata); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
			return
		}

		var user models.User
		if err := db.DB.Where("username = ?", userdata.Username).First(&user).Error; err != nil {
			c.JSON(401, gin.H{"error": "User not found"})
			return
		}

		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userdata.Password))
		if err != nil {
			c.JSON(401, gin.H{"error": "Incorrect password"})
			return
		}

		token, err := middleware.GenerateToken(user.ID)
		if err != nil {
			c.JSON(500, gin.H{"error": "Could not generate token"})
			return
		}

		c.JSON(200, gin.H{"token": token})
	})

	r.PUT("/userdata", func(c *gin.Context) {
		id := c.Param("id")
		var user models.User

		if err := db.DB.First(&user, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		db.DB.Save(&user)
		c.JSON(200, user)
	})

	r.DELETE("/userdata", func(c *gin.Context) {
		id := c.Param("id")
		var user models.User

		if err := db.DB.First(&user, id).Error; err != nil {
			c.JSON(404, gin.H{"error": err.Error()})
			return
		}

		db.DB.Delete(&user)
		c.JSON(200, "Delete-Account")
	})
}