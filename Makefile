.PHONY: default run up down

.SILENT:

default: run

run:
	go run cmd/main.go

up:
	docker compose up -d --build

down:
	docker compose down
