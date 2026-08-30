import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;

const modelsToTest = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash'
];

const versionsToTest = ['v1', 'v1beta'];

async function testAll() {
  if (!apiKey) {
    console.error('No API key in .env');
    return;
  }
  
  console.log(`Testing with key starting: ${apiKey.substring(0, 8)}...`);

  for (const model of modelsToTest) {
    for (const version of versionsToTest) {
      const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: 'Hello' }] }]
      };

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const status = res.status;
        const text = await res.text();
        let brief = '';
        try {
          const parsed = JSON.parse(text);
          if (parsed.candidates) {
            brief = 'SUCCESS: ' + parsed.candidates[0]?.content?.parts[0]?.text?.trim().replace(/\n/g, ' ');
          } else if (parsed.error) {
            brief = `ERROR: ${parsed.error.message} (${parsed.error.status})`;
          } else {
            brief = `UNKNOWN JSON: ${text.substring(0, 100)}`;
          }
        } catch {
          brief = `NON-JSON RESPONSE: ${text.substring(0, 100)}`;
        }

        console.log(`[${version}] [${model}] -> Status ${status} -> ${brief}`);
      } catch (err: any) {
        console.error(`[${version}] [${model}] -> FETCH EXCEPTION:`, err.message);
      }
    }
  }
}

testAll();
