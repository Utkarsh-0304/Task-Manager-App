import { GoogleGenAI } from "@google/genai";
import Card from "../models/Card.js";
import List from "../models/List.js";
import Board from "../models/Board.js";

export async function generateContent(req, reply) {
  const { message, userId } = req.body;

  const ai = new GoogleGenAI({
    apiKey: `${process.env.GEMINI_API_KEY}`,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${message}`,
      config: {
        systemInstruction: `
    You are an expert project manager. Your task is to break down the following user message into a structured set of lists and task cards suitable for a Kanban board.

    Analyze the message and generate a JSON object that contains an array of lists.
    The standard lists should be 'To Do', 'In Progress', and 'Done'.
    Populate the 'To Do' list with actionable tasks required to achieve the message. The other lists should be empty.

    You MUST respond with only a valid JSON object and nothing else. Do not include any explanations, introductory text, or markdown formatting like \`\`\`json.

    The JSON structure must follow this exact format:
    {
      'lists': [
        {
          'title': 'To Do',
          'cards': [
            { 'title': 'First actionable task' },
            { 'title': 'Second actionable task' }
          ]
        },
        {
          'title': 'In Progress',
          'cards': []
        },
        {
          'title': 'Done',
          'cards': []
        }
      ]
    }


    Also add a 'title' property which defines the summary of the message under 20 characters.
    `,
      },
    });
  } catch (err) {
    reply.send("Error: ", err);
  }

  const AiGeneratedData = JSON.parse(response.text);

  try {
    const newBoard = new Board({
      title: AiGeneratedData.title,
      created_by: userId,
    });

    AiGeneratedData.lists.map(async (list) => {
      const newList = new List({ title: list.title });

      list.cards.map(async (card) => {
        const newCard = new Card({ title: card.title });
        newList.cards.push(newCard._id);
        await newCard.save();
      });
      newBoard.lists.push(newList._id);
      await newList.save();
    });

    await newBoard.save();
  } catch (err) {
    reply.send("Error: ", err);
  }
}
