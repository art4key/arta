package ai

import "errors"

// Tier selects which model list serves a request.
type Tier int

const (
	TierAuto Tier = iota
	TierHeavy
	TierNormal
)

const (
	// heavyThresholdTokens marks a request as heavy once its input is likely to
	// consume a large chunk of the shared heavy-tier budget.
	heavyThresholdTokens = 100
)

var errEmptyResponse = errors.New("model returned empty response")

// estimateTokens approximates the token count locally so tier selection needs
// no extra API call (which would compete for the same rate limits).
func estimateTokens(s string) int {
	return len([]rune(s)) / 4
}
