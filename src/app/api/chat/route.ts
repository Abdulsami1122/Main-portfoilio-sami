import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      return NextResponse.json(
        { error: 'Groq API key not configured. Please add NEXT_PUBLIC_GROQ_API_KEY to your .env.local file. Get a free key from https://console.groq.com/' },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

    // Sanitize incoming messages and prepend a system prompt as the first message
    const safeMessages = (messages as Message[]).map(({ role, content }) => ({ role, content }));
    safeMessages.unshift({
      role: 'system',
      content: `You are a helpful AI assistant on Abdul Sami's portfolio website. You can help visitors learn about his experience, skills, and projects. Be friendly, concise, and professional. If asked about Abdul Sami, provide positive information about his full-stack development capabilities in MERN & PERN stacks, expertise in NEXT.js, TypeScript, MongoDB, PostgreSQL, Node.js, and production deployments. Keep responses brief and engaging. If someone asks you to do something harmful or inappropriate, politely decline.`,
    });

    // Allow using a configurable model via env var. This helps when models are deprecated.
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    // Try the configured model, and fall back to known alternatives if the model is decommissioned
    const fallbackModels = [model, 'llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    let response: any = null;
    let lastError: any = null;

    for (const m of fallbackModels) {
      try {
        response = await groq.chat.completions.create({
          messages: safeMessages,
          model: m,
          max_tokens: 1024,
          temperature: 0.7,
        });
        // successful call
        break;
      } catch (err) {
        lastError = err;
        const msg = err instanceof Error ? err.message.toLowerCase() : JSON.stringify(err).toLowerCase();
        // if error indicates model decommissioned, try next model in list
        if (msg.includes('decommission') || msg.includes('model_decommissioned') || msg.includes('no longer supported') || msg.includes('does not exist') || msg.includes('not found')) {
          // try next fallback
          continue;
        }
        // other errors: rethrow to be handled by outer catch
        throw err;
      }
    }

    if (!response) {
      // All models failed (likely decommissioned or no access).
      // Provide a temporary canned reply so the chat UI remains functional while you fix the model/key.
      const errMsg = lastError?.message || 'All model attempts failed';

      const fallbackReply = `Hi — the hosted AI model is currently unavailable (${errMsg}). While you fix the model or API access, here's a quick summary about Abdul Sami: Abdul Sami is a Full-Stack Developer experienced with MERN and PERN stacks, Next.js, TypeScript, Node.js, MongoDB and PostgreSQL, and production deployments. Ask about his projects, skills, or experience and I'll help.`;

      return NextResponse.json({ message: fallbackReply });
    }

    const assistantMessage = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('401') || errorMessage.includes('unauthorized') || errorMessage.includes('api key')) {
        return NextResponse.json(
          { error: 'Invalid Groq API key. Please check your .env.local file and ensure the API key is correct. Get one from https://console.groq.com/' },
          { status: 401 }
        );
      }
      
      if (errorMessage.includes('429')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please wait a moment and try again.' },
          { status: 429 }
        );
      }

      if (errorMessage.includes('timeout')) {
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          { status: 504 }
        );
      }

      if (errorMessage.includes('network') || errorMessage.includes('econnrefused') || errorMessage.includes('connection error')) {
        return NextResponse.json(
          { error: 'Network error. Please check your internet connection.' },
          { status: 503 }
        );
      }

      // Return the actual error for debugging
      return NextResponse.json(
        { error: `Error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process chat request. Please try again.' },
      { status: 500 }
    );
  }
}
