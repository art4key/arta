package logi

import (
	"log/slog"
	"os"
)

var level slog.Level

func Init(l slog.Level) {
	level = l
	slog.SetDefault(slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{
		Level: l,
	})))
}

func DebugEnabled() bool {
	return level <= slog.LevelDebug
}

func Error(msg string, args ...any) { slog.Error(msg, args...) }
func Info(msg string, args ...any)  { slog.Info(msg, args...) }
func Warn(msg string, args ...any)  { slog.Warn(msg, args...) }
func Debug(msg string, args ...any) { slog.Debug(msg, args...) }

func Fatal(msg string, args ...any) {
	slog.Error(msg, args...)
	os.Exit(1)
}
