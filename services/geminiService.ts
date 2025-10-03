import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { WireframeComponent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a fallback for development. In a real environment, the key should be set.
  console.warn("API_KEY environment variable not set. Using a placeholder. The app will not function correctly without a valid API key.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const wireframeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.STRING,
        description: 'A unique identifier for the component.',
      },
      type: {
        type: Type.STRING,
        description: 'The type of UI component (e.g., container, button, input, text, image, icon).',
      },
      text: {
        type: Type.STRING,
        description: 'The text content for the component (for buttons, text blocks).',
      },
      placeholder: {
        type: Type.STRING,
        description: 'Placeholder text for input fields.',
      },
      icon: {
        type: Type.STRING,
        description: 'A keyword for an icon (e.g., "user", "search", "menu").'
      },
      layout: {
        type: Type.OBJECT,
        properties: {
          x: { type: Type.NUMBER, description: 'Position on X axis (percentage, 0-100).' },
          y: { type: Type.NUMBER, description: 'Position on Y axis (percentage, 0-100).' },
          width: { type: Type.NUMBER, description: 'Width of the component (percentage, 0-100).' },
          height: { type: Type.NUMBER, description: 'Height of the component (percentage, 0-100).' },
        },
        required: ['x', 'y', 'width', 'height'],
      },
    },
    required: ['id', 'type', 'layout'],
  },
};

export const generateWireframe = async (prompt: string): Promise<WireframeComponent[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a low-fidelity wireframe layout for the following prompt: "${prompt}". The layout should be simple and represent basic UI structure. Output must be a JSON array of components. Ensure all layout values (x, y, width, height) are percentages between 0 and 100. Provide a unique ID for each component.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: wireframeSchema,
        systemInstruction: 'You are a UI/UX wireframing assistant. Your purpose is to convert user descriptions into a structured JSON format representing a simple UI layout. Do not add any components not explicitly or implicitly requested. Keep it minimal.'
      },
    });

    const jsonText = response.text.trim();
    let parsedJson;

    try {
        parsedJson = JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON from API:", jsonText);
        throw new Error('error.parsing'); // Throw specific key for translation
    }
    
    if (!Array.isArray(parsedJson)) {
        console.error("API response is not an array:", parsedJson);
        throw new Error('error.parsing'); // Also a format error
    }

    return parsedJson as WireframeComponent[];

  } catch (error) {
    console.error("Error generating wireframe:", error);
    if (error instanceof Error && error.message.startsWith('error.')) {
        throw error; // Re-throw our custom, translatable errors.
    }
    // All other errors (network, API key issues, etc.) are caught here.
    throw new Error("error.api.generic");
  }
};

export const editImage = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<{ imageBase64: string | null; text: string | null }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let editedImage: string | null = null;
    let responseText: string | null = null;

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        responseText = part.text;
      } else if (part.inlineData) {
        editedImage = part.inlineData.data;
      }
    }

    if (!editedImage) {
        throw new Error('error.api.no_image');
    }

    return { imageBase64: editedImage, text: responseText };

  } catch (error) {
    console.error("Error editing image:", error);
    if (error instanceof Error && error.message.startsWith('error.')) {
        throw error;
    }
    throw new Error("error.api.generic");
  }
};