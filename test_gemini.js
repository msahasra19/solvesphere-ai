const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `Search your knowledge base for REAL, EXISTING solutions/tools/apps for this query:

Query: "a app for to buy clothes"

Find 3-5 REAL solutions that actually exist. Provide a JSON response with:
{
  "foundSolutions": true/false,
  "solutions": [
    {
      "title": "Actual product name",
      "description": "What it does",
      "url": "Real website URL",
      "type": "app",
      "pricing": "free",
      "rating": 4.5
    }
  ]
}
Return ONLY valid JSON.`;
    
    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Raw Response:");
    console.log(text);
    
    try {
      const jsonMatch = text.match(/```json\n?([\s\S]*?)\n?```/i);
      let jsonText = '';
      if (jsonMatch) {
        jsonText = jsonMatch[1].trim();
      } else {
        const rawMatch = text.match(/\{[\s\S]*\}/);
        if (rawMatch) {
          jsonText = rawMatch[0].trim();
        } else {
          jsonText = text.trim();
        }
      }
      const parsed = JSON.parse(jsonText);
      console.log("\nParsed successfully:", parsed);
    } catch (e) {
      console.error("\nParse Error:", e.message);
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
  }
}

test();
