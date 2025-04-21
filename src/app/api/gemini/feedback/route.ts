import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    const { transcripts } = await req.json();

    //console.log(transcripts);

    const api = process.env.GEMINI_API as string;
    const genAI = new GoogleGenerativeAI(api);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseModalities: [
        ],
        responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const prompt = `Below i am giving the transcripts of an AI model and a user which is from a 
    mock interview and you have to give a feedback of the user answers. Give answers on how confidently 
    the user speaks, the users communication, how better is in english, on which areas the user is lacking 
    or the area of improvements. If you feel that the conversation is very short then just write that you cant 
    provide a feedback because the conversation is not long enough otherwise give me feedback TRANSCRIPTS - ${transcripts}`;

    try {
        const result = await chatSession.sendMessage(prompt);
        const resp = result.response.text();

        //console.log(resp);

        return NextResponse.json({
            success: true,
            status: 200,
            resp
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Something went wrong"
        });
    }
}