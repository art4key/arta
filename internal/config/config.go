package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	TelegramBotToken string
}

func FromEnv() (Config, error) {
	_ = godotenv.Load()

	var (
		cfg Config
		err error
	)

	if cfg.TelegramBotToken, err = getEnv("TELEGRAM_BOT_TOKEN", true, ""); err != nil {
		return Config{}, err
	}

	return cfg, nil
}

func getEnv(key string, required bool, def string) (string, error) {
	val := os.Getenv(key)
	if val == "" {
		if required {
			return "", fmt.Errorf("env variable %s is required", key)
		}
		return def, nil
	}
	return val, nil
}
