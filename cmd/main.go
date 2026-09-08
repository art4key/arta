package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/art4key/arta/internal/app"
	"github.com/art4key/arta/internal/config"
	"github.com/art4key/arta/internal/db"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err := db.New(cfg.PostgresDSN)
	if err != nil {
		log.Fatal(err)
	}

	if err := app.Run(ctx, db, cfg.TelegramBotToken); err != nil {
		log.Fatal(err)
	}
}
