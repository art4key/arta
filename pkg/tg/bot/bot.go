package bot

import (
	"context"
	"errors"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/art4key/arta/pkg/tg/models"
)

const (
	defaultPollTimeout    = time.Minute
	defaultUpdatesChanCap = 1024
	defaultWorkersCount   = 5
)

type HttpClient interface {
	Do(*http.Request) (*http.Response, error)
}

type HandlerFunc func(ctx context.Context, b *Bot, update *models.Update)

type Bot struct {
	url          string
	token        string
	client       HttpClient
	lastUpdateID int64
	pollTimeout  time.Duration
	handler      HandlerFunc
	updates      chan *models.Update
	wg           sync.WaitGroup
	mu           sync.Mutex
}

func New(token string) (*Bot, error) {
	if token == "" {
		return nil, errors.New("token is empty")
	}
	return &Bot{
		url:          "https://api.telegram.org",
		token:        token,
		client:       &http.Client{Timeout: defaultPollTimeout},
		lastUpdateID: 0,
		pollTimeout:  defaultPollTimeout,
		handler:      defaultHandler,
		updates:      make(chan *models.Update, defaultUpdatesChanCap),
	}, nil
}

func (b *Bot) Start(ctx context.Context) {
	b.wg.Add(1)
	go func() {
		defer b.wg.Done()
		defer close(b.updates)

		for {
			select {
			case <-ctx.Done():
				return
			default:
			}

			updates, err := b.getUpdates(ctx)
			if err != nil {
				select {
				case <-ctx.Done():
					return
				case <-time.After(5 * time.Second):
				}
				continue
			}

			for i := range updates {
				update := updates[i]

				b.mu.Lock()
				if update.ID > b.lastUpdateID {
					b.lastUpdateID = update.ID
				}
				b.mu.Unlock()

				select {
				case b.updates <- &update:
				case <-ctx.Done():
					return
				}
			}
		}
	}()

	for range defaultWorkersCount {
		b.wg.Add(1)
		go func() {
			defer b.wg.Done()
			for update := range b.updates {
				b.handler(ctx, b, update)
			}
		}()
	}

	b.wg.Wait()
}

func defaultHandler(_ context.Context, _ *Bot, update *models.Update) {
	log.Printf("[UPDATE] %+v", update)
}

func (b *Bot) Handle(h HandlerFunc) {
	b.handler = h
}
