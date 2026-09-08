package config

import (
	"github.com/ilyakaznacheev/cleanenv"
	"github.com/joho/godotenv"
)

type Config struct {
	TelegramBotToken string `env:"TELEGRAM_BOT_TOKEN" env-required:"true"`
	PostgresDSN      string `env:"POSTGRES_DSN" env-required:"true"`
}

func Load() (Config, error) {
	_ = godotenv.Load()

	var cfg Config
	if err := cleanenv.ReadEnv(&cfg); err != nil {
		return Config{}, err
	}

	return cfg, nil
}
