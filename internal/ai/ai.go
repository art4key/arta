package ai

import (
	"context"

	"github.com/art4key/arta/internal/logi"
	"google.golang.org/genai"
)

type AI struct {
	client *genai.Client
}

func New(ctx context.Context, token string) (*AI, error) {
	c, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  token,
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		return nil, err
	}

	return &AI{client: c}, nil
}

func (ai *AI) Generate(
	ctx context.Context,
	text string,
	tier Tier,
) (string, error) {
	var lastErr error

	for _, list := range pickLists(tier, text) {
		out, exhausted, err := ai.generateList(ctx, text, list)
		if exhausted {
			lastErr = err
			continue
		}

		return out, err
	}

	return "", lastErr
}

// generateList tries each model in turn and reports whether the whole list is
// exhausted by transient errors or empty responses.
func (ai *AI) generateList(
	ctx context.Context,
	text string,
	models []string,
) (string, bool, error) {
	var lastErr error

	for _, model := range models {
		result, err := ai.client.Models.GenerateContent(
			ctx, model,
			[]*genai.Content{{Parts: []*genai.Part{{Text: text}}}},
			&genai.GenerateContentConfig{
				//SystemInstruction: &genai.Content{Parts: []*genai.Part{{Text: ""}}},
				ThinkingConfig: &genai.ThinkingConfig{
					ThinkingLevel: genai.ThinkingLevelHigh,
				},
			},
		)
		if err != nil {
			lastErr = err
			logi.Debug("model fallback", "model", model, "error", err)
			if !isFallbackable(err) {
				return "", false, err
			}
			continue
		}

		out := result.Text()
		if out != "" {
			logi.Debug("model ok", "model", model, "chars", len(out))
			return out, false, nil
		}

		logi.Debug("model empty", "model", model)
		lastErr = errEmptyResponse

		continue
	}

	return "", true, lastErr
}
