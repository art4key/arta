package app

import (
	"context"
	"log"

	"github.com/art4key/arta/internal/config"
	"github.com/go-telegram/bot"
	"github.com/go-telegram/bot/models"
)

func Run(ctx context.Context, cfg config.Config) error {
	opts := []bot.Option{
		bot.WithDefaultHandler(handler),
		bot.WithSkipGetMe(),
	}

	b, err := bot.New(cfg.TelegramBotToken, opts...)
	if err != nil {
		return err
	}

	me, err := b.GetMe(ctx)
	if err != nil {
		return err
	}

	log.Printf("@%s is started!", me.Username)

	b.Start(ctx)

	return nil
}

func handler(ctx context.Context, b *bot.Bot, u *models.Update) {
	if u.Message == nil {
		return
	}

	b.SendMessage(ctx, &bot.SendMessageParams{
		ChatID: u.Message.Chat.ID,
		Text:   u.Message.Text,
	})
}
