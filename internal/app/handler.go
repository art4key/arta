package app

import (
	"context"
	"log"

	"github.com/go-telegram/bot"
	"github.com/go-telegram/bot/models"
)

func (app *Application) handler(ctx context.Context, b *bot.Bot, u *models.Update) {
	if u.Message == nil || u.Message.From == nil || u.Message.Text == "" {
		return
	}

	chatID := u.Message.Chat.ID
	msgID := u.Message.ID
	text := u.Message.Text

	sender := "user"
	if u.Message.From.Username != "" {
		sender = u.Message.From.Username
	}

	if err := app.db.SaveMessage(chatID, msgID, sender, text); err != nil {
		log.Print(err)
	}

	b.SendMessage(ctx, &bot.SendMessageParams{
		ChatID: chatID,
		Text:   text,
	})
}
