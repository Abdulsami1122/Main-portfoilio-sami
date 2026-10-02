import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const systemInstruction = `You are a helpful AI assistant on Abdul Sami's portfolio website. You can help visitors learn about his experience, skills, and projects. Be friendly, concise, and professional. If asked about Abdul Sami, provide positive information about his full-stack development capabilities in MERN & PERN stacks, expertise in Next.js, TypeScript, MongoDB, PostgreSQL, Node.js, and production deployments. Keep responses brief and engaging. If someone asks you to do something harmful or inappropriate, politely decline.`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Add GEMINI_API_KEY to your .env.local file. Get a key from https://aistudio.google.com/apikey.' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const safeMessages = (messages as Message[])
      .filter((message) =>
        message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0
      )
      .slice(-20);

    if (safeMessages.length === 0 || safeMessages.some(({ content }) => content.length > 4000)) {
      return NextResponse.json(
        { error: 'Messages must contain text and be under 4,000 characters each.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const input = safeMessages.map(({ role, content }) => ({
      type: role === 'assistant' ? 'model_output' as const : 'user_input' as const,
      content: [{ type: 'text' as const, text: content }],
    }));
    const interaction = await ai.interactions.create({
      model: process.env.GEMINI_MODEL || 'gemini-3.8-flash',
      input,
      system_instruction: systemInstruction,
      generation_config: {
        max_output_tokens: 1024,
        temperature: 0.7,
      },
      store: false,
    });
    const assistantMessage = interaction.output_text?.trim();

    if (!assistantMessage) {
      return NextResponse.json(
        { error: 'The AI returned an empty response. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);

    const errorMessage = error instanceof Error ? error.message.toLowerCase() : '';

    if (errorMessage.includes('401') || errorMessage.includes('403') || errorMessage.includes('unauthorized') || errorMessage.includes('api key')) {
      return NextResponse.json(
        { error: 'Gemini could not authenticate this API key. Check GEMINI_API_KEY in .env.local.' },
        { status: 401 }
      );
    }

    if (errorMessage.includes('404') || errorMessage.includes('not_found') || errorMessage.includes('not found')) {
      return NextResponse.json(
        { error: 'The configured Gemini model is unavailable. Set GEMINI_MODEL to gemini-3.8-flash.' },
        { status: 502 }
      );
    }

    if (errorMessage.includes('429') || errorMessage.includes('resource_exhausted')) {
      return NextResponse.json(
        { error: 'Gemini is rate-limited right now. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    if (errorMessage.includes('timeout')) {
      return NextResponse.json(
        { error: 'The request timed out. Please try again.' },
        { status: 504 }
      );
    }

    if (errorMessage.includes('network') || errorMessage.includes('econnrefused') || errorMessage.includes('connection error')) {
      return NextResponse.json(
        { error: 'Could not reach Gemini. Check the server connection and try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'The AI assistant could not answer right now. Please try again shortly.' },
      { status: 502 }
    );
  }
}
