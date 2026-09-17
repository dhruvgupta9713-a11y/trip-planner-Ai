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

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data: any = await res.json();
    console.log('\n--- Supported Models ---');
    if (data.models) {
      for (const model of data.models) {
        if (model.supportedGenerationMethods?.includes('generateContent')) {
          console.log(`- ${model.name}`);
        }
      }
    }
    console.log('------------------------');
  } catch (error: any) {
    console.error('Error fetching models list:', error.message || error);
  }
}

listModels();
