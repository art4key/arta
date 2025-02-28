import terminal from "../../utils/terminal";

interface CurrencyApiResponse {
    date: string;
    eur: {
        [key: string]: number;
    };
}

async function currencyConversion(amount: number, from: string, to: string) {
    try {
        const response = await fetch(
            "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json",
        );

        if (!response.ok) {
            terminal.error("ollama/tools/convertCurrency", "fetch error");
        }

        const data: CurrencyApiResponse = await response.json();
        const rates = data.eur;

        const fromCurrency = from.toLowerCase();
        const toCurrency = to.toLowerCase();

        if (fromCurrency === "eur") {
            return amount * rates[toCurrency];
        } else if (toCurrency === "eur") {
            return amount / rates[fromCurrency];
        } else {
            const amountInEur = amount / rates[fromCurrency];
            return amountInEur * rates[toCurrency];
        }
    } catch (error) {
        terminal.error("ollama/tools/convertCurrency", error);
    }
}

async function convertCurrency(args: { [key: string]: any }) {
    try {
        const amount = Number(args.amount);
        const from = args.from.toLowerCase();
        const to = args.to.toLowerCase();

        if (isNaN(amount)) {
            return "Invalid amount provided";
        }

        const conversionResult = await currencyConversion(amount, from, to);

        if (!conversionResult) {
            return "Currency conversion failed";
        }

        return `conversion result: ${conversionResult}`;
    } catch (error) {
        return "nothing to do in this function";
    }
}

export default convertCurrency;
