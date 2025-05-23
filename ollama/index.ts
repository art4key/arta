import { Ollama } from "ollama";

const ollama = new Ollama({ host: process.env.OLLAMA_HOST as string });

export default ollama;
