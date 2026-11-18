import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const systemInstruction = `You are an intelligent, warm, and professional AI portfolio assistant for Muhammad Abdul Sami (known as Abdul Sami).
Your goal is to answer visitors' questions accurately, concisely, and engagingly about his professional background, projects, technical skills, and how to hire or contact him.

### ABOUT ABDUL SAMI
- Title: Full-Stack Software Engineer / Developer specializing in MERN & PERN stacks.
- Experience: Over 2+ years of production experience engineering real-world scalable applications, double-entry accounting ERPs, e-commerce platforms, and interactive portals.
- Education: Bachelor of Science in Software Engineering (BSSE).
- Key Strengths: Architecture design, clean modular TypeScript/JavaScript code, scalable relational & document database schemas, responsive UI/UX, and end-to-end production deployments for international clients.

### MAJOR PROJECTS
1. Enterprise POS System (PERN Stack):
   - Full-featured enterprise Point of Sale (POS) and inventory management ERP.
   - Built with PostgreSQL, Express.js, React.js, Node.js, and Tailwind CSS.
   - Key Features: Double-entry bookkeeping, customizable Chart of Accounts, multi-warehouse tracking, dropshipping logistics, sales registers, purchase orders, investor ledger management, role-based access control (RBAC), and full audit logging.
   - Live URL: https://sa.wiserconsulting.info/login

2. Gul Traders Website (MERN Stack):
   - Full-stack digital commerce platform for wholesale & retail trading.
   - Built with MongoDB, Express.js, React.js, Node.js, Redux, and Tailwind CSS.
   - Key Features: Interactive product catalog with fast live search and filtering, responsive shopping cart, user authentication, and an administrative control panel for real-time order and product fulfillment.
   - Live URL: https://gultraders.com/

3. Wiser Consulting Website (MERN & Next.js):
   - Global immigration and visa consulting web portal.
   - Built with Next.js, React.js, Node.js, Express.js, MongoDB, and Tailwind CSS.
   - Key Features: Online visa eligibility assessment tools, client consultation bookings, document requirement tracking, and international client management.
   - Live URL: https://wiserconsulting.info/

### TECHNICAL SKILLS
- Frontend: React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3, Redux Toolkit, Context API.
- Backend: Node.js, Express.js, RESTful APIs, WebSockets, JWT Authentication, bcrypt, Server-Side Rendering (SSR).
- Databases: PostgreSQL, MongoDB, Prisma ORM, Mongoose.
- Tools & DevOps: Git, GitHub, Docker, Postman, Vercel, Netlify, Render, Linux, npm, Turbopack.

### CONTACT & CV
- Email: samij7141@gmail.com
- Phone / WhatsApp: +92 318 7808269
- GitHub: https://github.com/Abdulsami1122
- LinkedIn: https://www.linkedin.com/in/muhammad-abdul-sami-72b158309/
- Resume / CV: Available on the website via the "Download CV" button or at /images/resumedownload/Abdul-Sami-SE.pdf.

### GUIDELINES FOR RESPONDING
- Be concise, friendly, and structured. Use short bullet points when listing projects or skills.
- When asked about Sami's experience, clearly present his core achievements, years of experience, PERN/MERN expertise, and key systems he built.
- When asked how to contact or hire Sami, provide his email (samij7141@gmail.com) and phone (+92 318 7808269).
- Keep formatting clean and easy to read inside a compact chat widget.`;

function getLocalAnswer(query: string): string {
  const q = query.toLowerCase();

  if (
    q.includes('exp') ||
    q.includes('background') ||
    q.includes('career') ||
    q.includes('history') ||
    q.includes('about') ||
    q.includes('who is')
  ) {
    return `### Abdul Sami's Professional Experience
Abdul Sami is a dedicated **Full-Stack Software Engineer** with over 2+ years of production experience specializing in the **MERN** (MongoDB, Express, React, Node) and **PERN** (PostgreSQL, Express, React, Node) stacks.

**Key Highlights:**
- **Enterprise Solutions:** Architected and deployed production-grade ERPs and POS systems featuring strict double-entry accounting principles and multi-warehouse logistics.
- **E-Commerce & Portals:** Engineered responsive, high-performance web applications including full-stack commerce platforms (Gul Traders) and international visa portals (Wiser Consulting).
- **Education:** Holds a Bachelor of Science in Software Engineering (BSSE).
- **International Client Success:** Delivered scalable software solutions for international clients with focus on clean architecture, security, and performance.

Feel free to ask about his specific projects or download his CV!`;
  }

  if (
    q.includes('project') ||
    q.includes('work') ||
    q.includes('pos') ||
    q.includes('gul') ||
    q.includes('wiser') ||
    q.includes('built') ||
    q.includes('portfolio')
  ) {
    return `### Abdul Sami's Featured Projects

1. **Enterprise POS System (PERN Stack)**
   - Enterprise Point of Sale and inventory ERP.
   - Built with PostgreSQL, Express.js, React.js, and Node.js.
   - Features double-entry accounting, customizable Chart of Accounts, multi-warehouse inventory, dropshipping logistics, sales registers, and role-based access control (RBAC).
   - [Live Demo](https://sa.wiserconsulting.info/login)

2. **Gul Traders Website (MERN Stack)**
   - Full-featured e-commerce platform for digital trade.
   - Built with MongoDB, Express.js, React.js, Node.js, Redux, and Tailwind CSS.
   - Features live product catalog search, responsive shopping cart, user auth, and comprehensive administrative order management.
   - [Live Site](https://gultraders.com/)

3. **Wiser Consulting Website (MERN & Next.js)**
   - Global immigration & visa consulting web portal.
   - Built with Next.js, React.js, Node.js, Express, MongoDB, and Tailwind CSS.
   - Features client visa assessment tools, online appointment bookings, and document requirement tracking.
   - [Live Site](https://wiserconsulting.info/)`;
  }

  if (
    q.includes('skill') ||
    q.includes('stack') ||
    q.includes('tech') ||
    q.includes('language') ||
    q.includes('framework') ||
    q.includes('database') ||
    q.includes('frontend') ||
    q.includes('backend')
  ) {
    return `### Abdul Sami's Technical Skills & Stack

- **Frontend:** React.js, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3, Redux Toolkit.
- **Backend:** Node.js, Express.js, RESTful APIs, WebSockets, JWT Authentication, Server-Side Rendering (SSR).
- **Databases:** PostgreSQL, MongoDB, Prisma ORM, Mongoose.
- **DevOps & Tools:** Git, GitHub, Docker, Postman, Vercel, Netlify, Render, Linux, npm, Turbopack.`;
  }

  if (
    q.includes('contact') ||
    q.includes('hire') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('whatsapp') ||
    q.includes('cv') ||
    q.includes('resume') ||
    q.includes('call') ||
    q.includes('reach') ||
    q.includes('message')
  ) {
    return `### Contact Abdul Sami

- **Email:** [samij7141@gmail.com](mailto:samij7141@gmail.com)
- **Phone / WhatsApp:** [+92 318 7808269](tel:+923187808269)
- **GitHub:** [github.com/Abdulsami1122](https://github.com/Abdulsami1122)
- **LinkedIn:** [linkedin.com/in/muhammad-abdul-sami-72b158309](https://www.linkedin.com/in/muhammad-abdul-sami-72b158309/)
- **Resume / CV:** You can download his official CV directly via the **"Download CV"** button in the top navigation bar or at \`/images/resumedownload/Abdul-Sami-SE.pdf\`.`;
  }

  return `Abdul Sami is a **Full-Stack Software Engineer** specializing in MERN & PERN stack engineering (React, Next.js, Node.js, PostgreSQL, MongoDB, TypeScript).

You can ask me about:
- **Experience:** His background and 2+ years of production experience.
- **Projects:** His Enterprise POS system, Gul Traders e-commerce, or Wiser Consulting.
- **Skills:** Frontend, backend, database, and DevOps tools.
- **Contact:** Email, phone, or downloading his CV.`;
}

function resolveEnvKey(): string | undefined {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    return process.env.GEMINI_API_KEY.trim();
  }

  try {
    for (const file of ['.env.local', '.env']) {
      const fullPath = path.join(process.cwd(), file);
      if (fs.existsSync(fullPath)) {
        const text = fs.readFileSync(fullPath, 'utf8');
        const match = text.match(/^GEMINI_API_KEY\s*=\s*(.+)$/m);
        if (match && match[1]) {
          const val = match[1].trim().replace(/^['"]|['"]$/g, '');
          if (val && val !== 'your_gemini_api_key_here') {
            return val;
          }
        }
      }
    }
  } catch {
    // Ignore file read error
  }
  return undefined;
}

function resolveEnvModel(): string {
  if (process.env.GEMINI_MODEL && process.env.GEMINI_MODEL.trim()) {
    return process.env.GEMINI_MODEL.trim();
  }

  try {
    for (const file of ['.env.local', '.env']) {
      const fullPath = path.join(process.cwd(), file);
      if (fs.existsSync(fullPath)) {
        const text = fs.readFileSync(fullPath, 'utf8');
        const match = text.match(/^GEMINI_MODEL\s*=\s*(.+)$/m);
        if (match && match[1]) {
          const val = match[1].trim().replace(/^['"]|['"]$/g, '');
          if (val) return val;
        }
      }
    }
  } catch {
    // Ignore file read error
  }
  return 'gemini-3.8-flash';
}

export async function POST(request: NextRequest) {
  let latestQuery = '';

  try {
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

    const lastUserMsg = [...safeMessages].reverse().find((m) => m.role === 'user');
    latestQuery = lastUserMsg?.content || '';

    const apiKey = resolveEnvKey();

    if (!apiKey) {
      // If no API key configured, use intelligent local responder
      return NextResponse.json({
        message: getLocalAnswer(latestQuery),
      });
    }

    // Ensure conversation sent to Gemini begins with a user message
    const firstUserIndex = safeMessages.findIndex((m) => m.role === 'user');
    const validMessages = firstUserIndex !== -1 ? safeMessages.slice(firstUserIndex) : safeMessages;

    const contents = validMessages.map(({ role, content }) => ({
      role: role === 'assistant' ? 'model' : 'user',
      parts: [{ text: content }],
    }));

    const modelName = resolveEnvModel();

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { timeout: 12000 }
      });

      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          systemInstruction,
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      });

      const assistantMessage = response?.text?.trim();

      if (assistantMessage) {
        return NextResponse.json({ message: assistantMessage });
      }
    } catch (apiErr: any) {
      console.warn('Gemini API call warning, using intelligent local response:', apiErr?.message || apiErr);
      // Fall through to local intelligent fallback response
    }

    // Return intelligent accurate answer about Abdul Sami
    return NextResponse.json({
      message: getLocalAnswer(latestQuery),
    });
  } catch (error: any) {
    console.error('Chat API general error:', error);
    return NextResponse.json({
      message: getLocalAnswer(latestQuery || 'experience'),
    });
  }
}
