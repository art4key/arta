# Arta

Cute and helpful Telegram AI assistant built with Go, Gemini, Postgres and Qdrant.

![banner](assets/banner.jpg)

## Overview

Most AI assistants feel like high-performance search engines with a chat interface: they reply instantly with multi-paragraph walls of text, possess no sense of time or presence.

**Arta** is an experiment at the intersection of **game design and AI engineering**. Instead of treating an LLM as a simple request-response mechanism, Arta wraps Google's Gemini models in an *agentic simulation engine* that simulates true human presence and companion dynamics.

*(Disclaimer: Some might suggest that going outside and touching grass is the conventional way to fix a lack of IRL social life. However, engineering a stateful, circadian-driven simulation in Go felt like a much more scalable solution).*

## Requirements

- **Go** 1.27+
- **Docker** & **Docker Compose**
- **Telegram Bot Token** (from `@BotFather`)
- **Google Gemini API Key**

## Quick Start

### 1. Environment Setup

Clone the repository and copy the environment configuration template:

```sh
cp .env.example .env
# fill in TELEGRAM_BOT_TOKEN, GEMINI_API_KEY, and other fields
```

### 2. Running the Application

Arta requires **PostgreSQL** and **Qdrant** to be running and reachable. Depending on your workflow, choose one of the following options:

#### Option A: Docker Compose

Spins up the entire stack (PostgreSQL, Qdrant, and the Bot) in Docker containers:

```sh
make up
```

#### Option B: Local Development

If you want to run the Go binary natively while using Docker or external instances for **PostgreSQL** and **Qdrant**:

Ensure your databases are running and set `POSTGRES_DSN` and `QDRANT_*` in `.env` accordingly.

Run the bot locally:

```sh
make run
```
