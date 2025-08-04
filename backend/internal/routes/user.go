package routes

import (
	"pigpocket/internal/db"
	"pigpocket/internal/middleware"
	"pigpocket/internal/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func UserRoutes(r *gin.Engine) {
	db.DB.AutoMigrate(&models.User{})

	r.GET("/me", middleware.AuthMiddleware(), func(c *gin.Context) {
		userID := c.GetUint("userID")
		var user models.User
		if err := db.DB.First(&user, userID).Error; err != nil {
			c.JSON(404, gin.H{"error": "User not found"})
			return
		}
		c.JSON(200, gin.H{
			"username": user.Username,
			"email":    user.Email,
		})
	})

	r.POST("/register", func(c *gin.Context) {
		var user models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": "Invalid request"})
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

		c.SetCookie("token", token, 3600*24, "/", "localhost", false, true)
		c.JSON(200, gin.H{"message": "login success"})
	})

	r.POST("/logout", func(c *gin.Context) {
		c.SetCookie("token", "", -1, "/", "localhost", false, true)
		c.JSON(200, gin.H{"message": "logged out"})
	})
}
