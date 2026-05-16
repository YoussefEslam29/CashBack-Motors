import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const start = Date.now();
const model = new ChatGoogleGenerativeAI({ model: 'gemini-2.0-flash', apiKey: process.env.GOOGLE_API_KEY });
model.invoke('Hi').then(r => console.log('Time:', Date.now() - start, 'ms, Content:', r.content));
