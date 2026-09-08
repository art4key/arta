package db

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID       int64  `gorm:"primaryKey;autoIncrement:false"`
	Username string `gorm:"size:255"`

	CreatedAt time.Time
	UpdatedAt time.Time
}

type Message struct {
	gorm.Model

	ChatID    int64  `gorm:"index;not null"`
	MessageID int    `gorm:"type:integer;not null"`
	Sender    string `gorm:"size:20;not null"`
	Content   string `gorm:"type:text;not null"`
}
