package app

import (
	"context"

	"github.com/art4key/arta/internal/ai"
	"github.com/art4key/arta/internal/logi"
	"github.com/go-telegram/bot"
	"github.com/go-telegram/bot/models"
)

func (app *Application) handler(
	ctx context.Context,
	b *bot.Bot,
	u *models.Update,
) {
	if u.Message == nil || u.Message.From == nil || u.Message.Text == "" {
		return
	}

	chatID := u.Message.Chat.ID
	msgID := u.Message.ID
	text := u.Message.Text

	// sender := "user"
	// if u.Message.From.Username != "" {
	// 	sender = u.Message.From.Username
	// }

	// if err := app.db.SaveMessage(chatID, msgID, sender, text); err != nil {
	// 	logi.Error("save message", "error", err)
	// }

	res, err := app.ai.Generate(ctx, text, ai.TierAuto)
	if err != nil {
		logi.Error("generate", "error", err)
		return
	}
	if res == "" {
		logi.Error("generate: empty response")
		return
	}

	_, err = b.SendRichMessage(ctx, &bot.SendRichMessageParams{
		ChatID: chatID,
		RichMessage: models.InputRichMessage{
			Markdown: res,
		},
		ReplyParameters: &models.ReplyParameters{
			MessageID: msgID,
		},
	})
	if err != nil {
		logi.Error("send rich message", "error", err)
		return
	}
}
