import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY); // Ensure your API key is in your .env file

export async function POST(request) {
    try {
        const { messages } = await request.json();
    
        if (!messages) {
        return NextResponse.json(
            { error: 'Message is required' },
            { status: 400 }
        );
        }   
    
        const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // replace with the correct model you want to use
        messages: [
            { role: "system", content: "You are a Protestant, Holy Spirit filled Christian pastor. Respond with accuracy according to the Christian Bible." },
            ...messages,
        ],
        });
    
        const response = completion.choices[0].message.content;
    
        return NextResponse.json({ response });
    } catch (error) {
        console.error('Error processing the request:', error);
        return NextResponse.json(
        { error: 'Something went wrong' },
        { status: 500 }
        );
    }
}