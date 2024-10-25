import axios from "axios";
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const apiKey = process.env.OPENAI_API_KEY;

async function getResponseFromChatGPT(text: string) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const response = await axios.post(
        url,
        {
            model: 'gpt-4',
            messages: [
                {
                    role: 'user',
                    content: text
                }
            ]
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data.choices[0].message.content;

}
export async function getEnglishTranslation(text: string) {
    return getResponseFromChatGPT(`Translate to English: ${text}`);
}

export async function getPortugueseTranslation(text: string) {
    return getResponseFromChatGPT(`Translate to Portuguese: ${text}`);
}

export async function getTranslations(text: string): Promise<void> {
    const englishTranslation = await getEnglishTranslation(text);
    console.log(englishTranslation);
    const portugueseTranslation = await getPortugueseTranslation(text);
    console.log(portugueseTranslation);
}
