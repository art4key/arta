import { Ollama } from "ollama";

const ollama = new Ollama({ host: Bun.env.OLLAMA_HOST });

export default ollama;
