package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/art4key/arta/internal/app"
	"github.com/art4key/arta/internal/config"
)

func main() {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	cfg, err := config.FromEnv()
	if err != nil {
		log.Fatal(err)
	}

	if err := app.Run(ctx, cfg); err != nil {
		log.Fatal(err)
	}
}
