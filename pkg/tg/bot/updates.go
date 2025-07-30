package bot

import (
	"context"
	"net/url"
	"strconv"

	"github.com/art4key/arta/pkg/tg/models"
)

func (b *Bot) getUpdates(ctx context.Context) ([]models.Update, error) {
	params := url.Values{}
	b.mu.Lock()
	params.Add("offset", strconv.FormatInt(b.lastUpdateID+1, 10))
	b.mu.Unlock()
	params.Add("timeout", strconv.Itoa(int(b.pollTimeout.Seconds())))

	var updates []models.Update
	if err := b.callMethod(ctx, "getUpdates", params, &updates); err != nil {
		return nil, err
	}
	return updates, nil
}
