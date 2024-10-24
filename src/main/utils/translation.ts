import axios from "axios";
import * as dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

async function getResponseFromChatGPT(text: string) {
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await axios.post(
            url,
            {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'user',
                        content: text
                    }
                ],
                max_tokens: 100
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return '';
    }
}
async function getEnglishTranslation(text: string) {
    return getResponseFromChatGPT(`Translate to English: ${text}`);
}

async function getPortugueseTranslation(text: string) {
    return getResponseFromChatGPT(`Translate to Portuguese: ${text}`);
}

async function getTranslations(text: string): Promise<void> {
    const englishTranslation = await getEnglishTranslation(text);
    const portugueseTranslation = await getPortugueseTranslation(text);
}
