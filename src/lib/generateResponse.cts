import { OpenAI } from "@arakoodev/edgechains.js/ai";

async function openAICall({ prompt, openAIApiKey }: { prompt: string, openAIApiKey: string }) {
    if (!prompt || !openAIApiKey) {
        console.error('Error: Missing required parameters.');
        console.error(`Prompt: ${prompt}`);
        console.error(`API Key: ${openAIApiKey}`);
        throw new Error("Missing required parameters: 'prompt' or 'openAIApiKey'");
    }

    const openai = new OpenAI({ apiKey: openAIApiKey });

    try {
        const response = await openai.chat({
            messages: [{ role: 'user', content: prompt }],
            model: "gpt-3.5-turbo", 
            max_tokens: 150,
        });

        if (response && response.content) {
            return response.content || "No response from OpenAI.";
        } else {
            return "No response from OpenAI.";
        }
    } catch (error) {
        console.error("Error making OpenAI call:", error);
        throw error;
    }
}

// Export the function
module.exports = openAICall;
