package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Database struct {
	client *gorm.DB
}

func New(dsn string) (*Database, error) {
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(&User{}, &Message{}); err != nil {
		return nil, err
	}

	return &Database{client: db}, nil
}

func (db *Database) SaveMessage(
	chatID int64,
	msgID int,
	sender string,
	content string,
) error {
	msg := Message{
		ChatID:    chatID,
		MessageID: msgID,
		Sender:    sender,
		Content:   content,
	}
	return db.client.Create(&msg).Error
}
