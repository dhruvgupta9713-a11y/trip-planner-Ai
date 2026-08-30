import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environmental variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log('Key start:', apiKey ? apiKey.substring(0, 8) : 'Not found');
  
  if (!apiKey) {
    console.error('No GEMINI_API_KEY found in .env');
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const list = await genAI.listModels();
    console.log('\n--- Supported Models ---');
    for (const model of list.models) {
      if (model.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- ${model.name}`);
      }
    }
    console.log('------------------------');
  } catch (error: any) {
    console.error('Error fetching models list:', error.message || error);
  }
}

listModels();
