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
		// 1. พยายามอ่านจาก Cookie ก่อน
		tokenStr, err := c.Cookie("token")
		if err != nil {
			// ถ้าไม่มี cookie ลองอ่านจาก Header
			authHeader := c.GetHeader("Authorization")
			parts := strings.Split(authHeader, " ")
			if len(parts) == 2 && parts[0] == "Bearer" {
				tokenStr = parts[1] // ✅ ตรงนี้คือ token แท้ ๆ
			} else {
				c.JSON(401, gin.H{"error": "No valid token found in cookie or header"})
				c.Abort()
				return
			}
		}

		// 2. ตรวจสอบ JWT Token
		token, err := jwt.ParseWithClaims(tokenStr, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// 3. Extract userID จาก Claims แล้ว set เข้า context
		if claims, ok := token.Claims.(*jwt.RegisteredClaims); ok {
			uid, _ := strconv.Atoi(claims.Subject)
			c.Set("userID", uint(uid))
		} else {
			c.JSON(401, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		c.Next()
	}
}
