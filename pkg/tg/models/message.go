package models

type Message struct {
	ID   int    `json:"message_id"`
	From *User  `json:"from,omitempty"`
	Chat *Chat  `json:"chat"`
	Text string `json:"text,omitempty"`
}
