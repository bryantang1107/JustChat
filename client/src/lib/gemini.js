import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);
const gemini_flash_1 = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
});
const gemini_flash_1_pro = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-001",
  tools: [
    {
      codeExecution: {},
    },
  ],
  safetySettings,
});

const gemini_flash_2 = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  safetySettings,
});

const gemini_flash_2_lite = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite-preview-02-05",
  safetySettings,
});

const gemini_flash_thinking = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp",
  safetySettings,
});

const models = {
  "gemini-1.5": gemini_flash_1,
  "gemini-1.5-pro": gemini_flash_1_pro,
  "gemini-2.0-flash": gemini_flash_2,
  "gemini-2.0-flash-lite": gemini_flash_2_lite,
  "gemini-2.0-think": gemini_flash_thinking,
};

export default models;
