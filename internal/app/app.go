package app

import (
	"context"

	"github.com/art4key/arta/internal/ai"
	"github.com/art4key/arta/internal/db"
	"github.com/art4key/arta/internal/logi"
	"github.com/go-telegram/bot"
)

type Application struct {
	db *db.Database
	ai *ai.AI
}

func Run(ctx context.Context, db *db.Database, ai *ai.AI, token string) error {
	app := &Application{
		db: db,
		ai: ai,
	}

	opts := []bot.Option{
		bot.WithDefaultHandler(app.handler),
		bot.WithSkipGetMe(),
	}
	opts = append(opts, debugBotOptions()...)

	b, err := bot.New(token, opts...)
	if err != nil {
		return err
	}

	me, err := b.GetMe(ctx)
	if err != nil {
		return err
	}

	logi.Info("bot started", "link", "https://t.me/"+me.Username)

	b.Start(ctx)

	return nil
}
