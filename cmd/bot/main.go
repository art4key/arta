package main

import (
	"context"
	"log"
	"os"
	"os/signal"

	"github.com/art4key/arta/pkg/env"
	"github.com/art4key/arta/pkg/tg/bot"
	"github.com/art4key/arta/pkg/tg/models"
)

func main() {
	if err := env.Load(); err != nil {
		log.Fatal(err)
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	b, err := bot.New(os.Getenv("TOKEN"))
	if err != nil {
		log.Fatal(err)
	}

	b.Handle(func(ctx context.Context, b *bot.Bot, update *models.Update) {
		if update.Message == nil {
			return
		}
		_, err := b.SendMessage(ctx, &bot.SendMessageParams{ChatID: update.Message.Chat.ID, Text: "nya~"})
		if err != nil {
			log.Fatal(err)
		}
	})

	b.Start(ctx)
}
