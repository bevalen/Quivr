import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY); // Ensure your API key is in your .env file

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const scripture = {
        passages: [
            {
                reference: "Reference",
                version: "Version",
                content: "Scripture Content"
            },
            {
                reference: "Reference",
                version: "Version",
                content: "Scripture Content"
            },
            // Add more passages as needed
        ]
    };    

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // replace with the correct model you want to use
      messages: [
        { role: "system", content: "You are a Protestant Christian Bible app. You only present scripture passages with no additional information. Only return JSON." },
        { role: "user", content: prompt },
        { role: "system", content: "Give me 6 or more scripture passages that would help with this." },
        { role: "user", content: "Only return a single array of JSON using this format:"},
        { role: "user", content: JSON.stringify(scripture) }
      ],
      response_format: { type: "json_object"},
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