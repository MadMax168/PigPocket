package middleware

import (
	"os"
	"strconv"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1.Get Auth header
		tokenStr := c.GetHeader("Authorization")
		if tokenStr == "" {
			c.JSON(401, gin.H{"error": "No Authorization header provided"})
			c.Abort()
			return
		}

		// 2.Pull Token from Bearer
		parts := strings.Split(tokenStr, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(401, gin.H{"error": "Invalid Authorization header format"})
			c.Abort()
			return
		}

		// 3.Checking Token
		token, err := jwt.ParseWithClaims(parts[1], &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// 4.
		if claims, ok := token.Claims.(*jwt.RegisteredClaims); ok {
			uid, _ := strconv.Atoi(claims.Subject)
			c.Set("userID", uint(uid))
		} else {
			c.JSON(401, gin.H{"error": "Invalid Token Claims"})
			c.Abort()
			return
		}

		c.Next()
	}
}
