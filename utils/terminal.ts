type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

const COLORS: Record<LogLevel, string> = {
    DEBUG: "\x1b[36m",
    INFO: "\x1b[32m",
    WARN: "\x1b[33m",
    ERROR: "\x1b[31m",
};

const RESET_COLOR = "\x1b[0m";

function formatMessage(value: unknown): string {
    if (typeof value === "object" && value !== null) {
        try {
            return JSON.stringify(value, null, 2);
        } catch {
            return String(value);
        }
    }

    return String(value);
}

function log(level: LogLevel, source: string, ...messages: unknown[]): void {
    const formattedMessage = messages.map(formatMessage).join(" ");

    Bun.stdout.write(
        `${COLORS[level]}[${level}] [${source}]: ${formattedMessage}${RESET_COLOR}\n`,
    );
}

function clear(): void {
    Bun.stdout.write("\x1B[2J\x1B[H");
}

const terminal = {
    log: (message: string) => Bun.stdout.write(message),
    debug: (source: string, ...messages: unknown[]) =>
        log("DEBUG", source, ...messages),
    info: (source: string, ...messages: unknown[]) =>
        log("INFO", source, ...messages),
    warn: (source: string, ...messages: unknown[]) =>
        log("WARN", source, ...messages),
    error: (source: string, ...messages: unknown[]) =>
        log("ERROR", source, ...messages),
    clear,
};

export default terminal;
