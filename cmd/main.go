package main

import (
	"context"
	"os"
	"os/signal"
	"syscall"

	"github.com/art4key/arta/internal/ai"
	"github.com/art4key/arta/internal/app"
	"github.com/art4key/arta/internal/config"
	"github.com/art4key/arta/internal/db"
	"github.com/art4key/arta/internal/logi"
)

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
	)
	defer cancel()

	cfg, err := config.Load()
	if err != nil {
		logi.Fatal("load config", "error", err)
	}

	level, err := cfg.SlogLevel()
	if err != nil {
		logi.Fatal("parse log level", "error", err)
	}
	logi.Init(level)

	database, err := db.New(cfg.PostgresDSN)
	if err != nil {
		logi.Fatal("init db", "error", err)
	}

	aiClient, err := ai.New(ctx, cfg.GeminiAPIKey)
	if err != nil {
		logi.Fatal("init ai", "error", err)
	}

	if err := app.Run(
		ctx,
		database,
		aiClient,
		cfg.TelegramBotToken,
	); err != nil {
		logi.Fatal("run app", "error", err)
	}
}
