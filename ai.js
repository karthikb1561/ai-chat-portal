require('dotenv').config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: "Say hello",
  });

  console.log(response.text);
}

run();


// OPEN AI
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testAI() {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: "Say hello in a cool way",
  });

  console.log(response.output[0].content[0].text);
}

testAI();