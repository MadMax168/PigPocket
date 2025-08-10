package logic

import (
	"time"
	"pigpocket/internal/db"
	"pigpocket/internal/models"
)

func StreakFeature(userID, walletID uint) int {
	var txs []models.Transaction
	db.DB.
		Where("user_id = ? AND wallet_id = ?", userID, walletID).
		Order("create_at type").
		Find(&txs)

	streak := 0
	if len(txs) == 0 {
		return 0
	}
	prev := txs[0].CreatedAt.Truncate(24 * time.Hour) //set today time to midnight

	for _, tx := range txs {
		txDate := tx.CreatedAt.Truncate(24 * time.Hour) //set transaction time to midnight

		if tx.Type != "saving" {
			continue
		}

		if txDate.Equal(prev) || txDate.Equal(prev.AddDate(0, 0, -1)) {
			streak++
			prev = txDate
		} else {
			break
		}
	}

	return streak
}