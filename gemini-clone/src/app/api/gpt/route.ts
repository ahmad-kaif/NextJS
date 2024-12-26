import { NextResponse } from 'next/server';
import connectDB from '@/server/connectDB';
import Message from '@/server/models/Message';

export async function POST(req: Request) {
  await connectDB();
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json({ error: 'Text is required' }, { status: 400 });
  }

  try {
    // Fetch GPT response
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: text }],
      }),
    });

    const data = await response.json();
    const gptMessage = data.choices[0].message.content;

    // Save messages to MongoDB
    const userMessage = new Message({ text, role: 'user' });
    const assistantMessage = new Message({ text: gptMessage, role: 'assistant' });
    await userMessage.save();
    await assistantMessage.save();

    return NextResponse.json({ response: gptMessage });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({ error: 'Failed to fetch GPT response' }, { status: 500 });
  }
}
