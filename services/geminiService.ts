
import { GoogleGenAI, Type } from "@google/genai";
import { Category, Urgency } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Mapping string values from the enum to be used in the schema
const categoryValues = Object.values(Category);
const urgencyValues = Object.values(Urgency);

const schema = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
      enum: categoryValues,
      description: 'The most relevant category for the post.',
    },
    urgency: {
      type: Type.STRING,
      enum: urgencyValues,
      description: 'The urgency level of the request.',
    },
  },
  required: ['category', 'urgency'],
};


export const getPostSuggestion = async (
  description: string
): Promise<{ category: Category; urgency: Urgency }> => {
  if (!process.env.API_KEY) {
    console.error("API key is not set. Returning default values.");
    // Fallback for demo purposes if API key is not available
    return { category: Category.ACADEMIC_HELP, urgency: Urgency.LOW };
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following user post for a community help board and determine the best category and urgency level. Post: "${description}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);

    // Validate the response from the AI
    const suggestedCategory = categoryValues.includes(result.category) ? result.category : Category.RESOURCE_SHARE;
    const suggestedUrgency = urgencyValues.includes(result.urgency) ? result.urgency : Urgency.LOW;

    return {
      category: suggestedCategory,
      urgency: suggestedUrgency,
    };
  } catch (error) {
    console.error('Error fetching suggestions from Gemini API:', error);
    throw new Error('Failed to get AI suggestions. Please categorize manually.');
  }
};
