# 🐷 PigPocket - Personal Finance Tracker App

PigPocket เป็นเว็บแอปสำหรับช่วยติดตามการเงินส่วนบุคคลอย่างง่าย ใช้สำหรับจัดการกระเป๋าสตางค์ (Wallet), บันทึกรายรับรายจ่าย (Transaction), ตั้งเป้าหมายการออม และติดตามความสม่ำเสมอในการเก็บเงิน (Streak Tracker) ด้วยระบบที่ปลอดภัยและทันสมัย

---

## 🔧 Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| Backend     | Go (Gin Framework)        |
| ORM         | GORM                      |
| Database    | PostgreSQL                |
| Frontend    | Next.js / React (กำลังพัฒนา) |
| Container   | Docker + docker-compose   |

---

## ✅ Features

- 🔐 User Authentication (Register/Login)
- 💰 Multiple Wallet Support
- ✏️ Transaction CRUD (Create, Read, Update, Delete)
- 🎯 Saving Goal (optional per wallet)
- 🔁 Streak Tracker (นับจำนวนวันออมต่อเนื่อง)
- 📊 Dashboard Summary (กำลังพัฒนา)

---

## 📦 Installation (Local)

```bash
git clone https://github.com/MadMax168/PigPocket.git
cd pigpocket
go mod tidy# PigPocket
