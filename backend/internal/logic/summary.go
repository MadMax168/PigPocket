package logic

import (
	"pigpocket/internal/db"
	"pigpocket/internal/models"
)

func SummaryFeature(UserID, WalletID uint) (map[string]float64, error) {
	var txs []models.Transaction

	if err := db.DB.Where("user_id = ? AND wallet_id = ?", UserID, WalletID).Find(&txs).Error; err != nil {
		return nil, err
	}

	result := map[string]float64{
		"income":  0,
		"expense": 0,
		"saving":  0,
	}

	for _, tx := range txs {
		result[tx.Type] += tx.Amount
	}

	return result, nil
}
