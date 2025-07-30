package bot

import (
	"context"

	"github.com/art4key/arta/pkg/tg/models"
)

func (b *Bot) GetMe(ctx context.Context) (*models.User, error) {
	user := &models.User{}
	if err := b.callMethod(ctx, "getMe", nil, user); err != nil {
		return nil, err
	}
	return user, nil
}

func (b *Bot) SendMessage(ctx context.Context, params *SendMessageParams) (*models.Message, error) {
	msg := &models.Message{}
	if err := b.callMethod(ctx, "sendMessage", params, msg); err != nil {
		return nil, err
	}
	return msg, nil
}
