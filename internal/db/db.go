package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Database struct {
	db *gorm.DB
}

func New(dsn string) (*Database, error) {
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(&User{}, &Message{}); err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

func (d *Database) SaveMessage(chatID int64, msgID int, s, c string) error {
	msg := Message{
		ChatID:    chatID,
		MessageID: msgID,
		Sender:    s,
		Content:   c,
	}
	return d.db.Create(&msg).Error
}
