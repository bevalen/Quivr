import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
    try {
        console.log('Request received');
        const { messages } = await request.json();
        console.log('Parsed JSON from request:', messages);
    
        if (!messages) {
            console.warn('No messages found in the request');
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }   
    
        console.log('Sending request to OpenAI API');
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a Protestant, Holy Spirit filled Christian pastor. Respond with accuracy according to the Christian Bible." },
                ...messages,
            ],
        });
    
        if (!completion) {
            throw new Error('No response from OpenAI');
        }

        console.log('Received response from OpenAI API:', completion);
        const response = completion.choices[0].message.content;
    
        console.log('Responding with content:', response);
        return NextResponse.json({ response });
    } catch (error) {
        console.error('Error processing the request:', error.response ? error.response.data : error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
