# arta 💖

### Arta is a cute AI girl in discord UwU idk xD

![arta](public/ArtaIcon.png)

## ✨ Features

- 🧠 **AI-Powered Conversations** using Ollama
- 🐇 **Blazing Fast** with Bun runtime
- 🐳 **Dockerized Database** for easy deployment
- 📦 **Prisma ORM** for type-safe database operations

## 🚀 Installation

### 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Bun](https://bun.sh/)
- [Ollama](https://ollama.com/)

### 🛠️ Configuring

Clone repository, set-up `.env` and install depends:

```bash
git clone https://github.com/art4key/arta.git
cd arta
cp .env.example .env
bun install
```

Edit `.env` file and then start database:

```bash
docker compose up -d
bunx prisma migrate dev --name init
```

Download and set-up model:

```bash
ollama pull llama3.1:latest
bun run createModel
```

Register /commands:

```bash
bun run registerCommands
```

And launch project:

```bash
bun run start
```

## 🎮 Other

![banner](public/ArtaBanner.png)

Prisma Studio:

- [nodejs](https://nodejs.org/) is required

```bash
bunx prisma studio
```

Ollama:

- [Ollama docs](https://github.com/ollama/ollama/tree/main/docs) read more about running LLM locally

```bash
ollama --help
```

Listen:

https://youtu.be/cNB4ucAvJ8g

Watch:

https://art4k.su/public/arta-conversation
