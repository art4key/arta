import type { Message } from "discord.js";
import ollama from ".";
import { cleanMessagePing } from "../app/isBotPinged";
import getUserConversation from "../prisma/getUserConversation";
import pushMessage from "../prisma/pushMessage";
import pkg from "../utils/pkg";
import tools from "./tools";
import addRoleToUser from "./tools/addRoleToUser";
import convertCurrency from "./tools/convertCurrency";

async function ollamaResponse(message: Message): Promise<string> {
    const userMessage = cleanMessagePing(message);

    await pushMessage(message, "user", userMessage);

    const conversation = await getUserConversation(message);

    const response = await ollama.chat({
        model: pkg.name,
        messages: conversation,
        stream: false,
        tools: tools,
    });

    if (response.message.tool_calls && response.message.tool_calls.length > 0) {
        for (const toolCall of response.message.tool_calls) {
            const availableFunctions: Record<string, Function> = {
                add_role_to_user: addRoleToUser,
                convert_currency: convertCurrency,
            };

            const functionToCall = availableFunctions[toolCall.function.name];
            if (functionToCall) {
                const functionResult = await functionToCall(
                    toolCall.function.arguments,
                );

                conversation.push({
                    role: "tool",
                    content: functionResult,
                });

                await pushMessage(message, "tool", functionResult);
            }
        }

        const finalResponse = await ollama.chat({
            model: pkg.name,
            messages: conversation,
            stream: false,
        });

        await pushMessage(message, "assistant", finalResponse.message.content);

        return finalResponse.message.content;
    } else {
        await pushMessage(message, "assistant", response.message.content);

        return response.message.content;
    }
}

export default ollamaResponse;
