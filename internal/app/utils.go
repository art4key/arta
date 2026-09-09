package app

import (
	"fmt"

	"github.com/art4key/arta/internal/logi"
	"github.com/go-telegram/bot"
)

func debugBotOptions() []bot.Option {
	if !logi.DebugEnabled() {
		return nil
	}

	return []bot.Option{
		bot.WithDebug(),
		bot.WithDebugHandler(func(format string, args ...any) {
			clipDebugArgs(args)
			logi.Debug(fmt.Sprintf(format, args...))
		}),
	}
}

// maxDebugArgRunes caps string-like debug values so logs stay readable.
const maxDebugArgRunes = 80

func clipDebugArgs(args []any) {
	for i, arg := range args {
		s, ok := debugArgString(arg)
		if !ok {
			continue
		}
		if r := []rune(s); len(r) > maxDebugArgRunes {
			args[i] = string(r[:maxDebugArgRunes]) + "..."
		}
	}
}

// debugArgString unwraps string-like debug values.
func debugArgString(arg any) (string, bool) {
	switch v := arg.(type) {
	case string:
		return v, true
	case []byte:
		return string(v), true
	default:
		return "", false
	}
}
