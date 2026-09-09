package ai

import (
	"context"
	"errors"

	"google.golang.org/genai"
)

func pickLists(tier Tier, text string) [][]string {
	switch tier {
	case TierHeavy:
		return [][]string{heavyModels, normalModels}
	case TierNormal:
		return [][]string{normalModels}
	default:
		if estimateTokens(text) >= heavyThresholdTokens {
			return [][]string{heavyModels, normalModels}
		}
		return [][]string{normalModels}
	}
}

var fallbackableCodes = map[int]bool{
	408: true, // Request Timeout
	429: true, // Rate limit / quota / capacity
	500: true, // Internal
	502: true, // Bad Gateway
	503: true, // Unavailable / overloaded
	504: true, // Deadline Exceeded (server side)
}

func isFallbackable(err error) bool {
	if err == nil {
		return false
	}

	if errors.Is(err, context.Canceled) ||
		errors.Is(err, context.DeadlineExceeded) {
		return false
	}

	apiErr, ok := errors.AsType[genai.APIError](err)
	if !ok {
		return true
	}

	return fallbackableCodes[apiErr.Code]
}
