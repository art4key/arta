package app

import (
	"context"
	"log"

	"github.com/art4key/arta/internal/db"
	"github.com/go-telegram/bot"
)

type Application struct {
	db *db.Database
}

func Run(ctx context.Context, db *db.Database, token string) error {
	app := &Application{
		db: db,
	}

	opts := []bot.Option{
		bot.WithDefaultHandler(app.handler),
		bot.WithSkipGetMe(),
	}

	b, err := bot.New(token, opts...)
	if err != nil {
		return err
	}

	me, err := b.GetMe(ctx)
	if err != nil {
		return err
	}

	log.Printf("@%[1]s is started! Link: https://t.me/%[1]s", me.Username)

	b.Start(ctx)

	return nil
}
