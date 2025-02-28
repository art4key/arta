import type { Tool } from "ollama";

const tools: Tool[] = [
    {
        type: "function",
        function: {
            name: "add_role_to_user",
            description: "Add Role to User in Discord when user require this",
            parameters: {
                type: "object",
                properties: {
                    user: {
                        type: "string",
                        description:
                            "username or user id to whom the role should be assigned",
                    },
                    role: {
                        type: "string",
                        description:
                            "name or id of the role to be assigned to the user",
                    },
                },
                required: ["user", "role"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "convert_currency",
            description:
                "Convert amount from one currency to another using current exchange rates",
            parameters: {
                type: "object",
                properties: {
                    amount: {
                        type: "number",
                        description: "The amount to convert",
                    },
                    from: {
                        type: "string",
                        description: "currency code to convert from",
                    },
                    to: {
                        type: "string",
                        description: "currency code to convert to",
                    },
                },
                required: ["amount", "from", "to"],
            },
        },
    },
];

export default tools;
