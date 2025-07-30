package bot

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/art4key/arta/pkg/tg/models"
)

type apiResponse struct {
	OK          bool            `json:"ok"`
	Result      json.RawMessage `json:"result,omitempty"`
	Description string          `json:"description,omitempty"`
	ErrorCode   int             `json:"error_code,omitempty"`
}

func (b *Bot) callMethod(ctx context.Context, method string, params any, result any) error {
	apiURL := fmt.Sprintf("%s/bot%s/%s", b.url, b.token, method)

	var req *http.Request
	var err error

	switch p := params.(type) {
	case nil:
		req, err = http.NewRequestWithContext(ctx, http.MethodGet, apiURL, nil)
	case url.Values:
		apiURL += "?" + p.Encode()
		req, err = http.NewRequestWithContext(ctx, http.MethodGet, apiURL, nil)
	default:
		body, _ := json.Marshal(params)
		req, err = http.NewRequestWithContext(ctx, http.MethodPost, apiURL, bytes.NewReader(body))
		req.Header.Set("Content-Type", "application/json")
	}

	if err != nil {
		return fmt.Errorf("building %s request: %w", method, err)
	}

	resp, err := b.client.Do(req)
	if err != nil {
		return fmt.Errorf("http error calling %s: %w", method, err)
	}
	defer resp.Body.Close()

	var env apiResponse
	if err := json.NewDecoder(resp.Body).Decode(&env); err != nil {
		return fmt.Errorf("decoding %s response: %w", method, err)
	}
	if !env.OK {
		return fmt.Errorf("telegram API error %d: %s", env.ErrorCode, env.Description)
	}
	if result != nil {
		if err := json.Unmarshal(env.Result, result); err != nil {
			return fmt.Errorf("unmarshal %s result: %w", method, err)
		}
	}
	return nil
}

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
