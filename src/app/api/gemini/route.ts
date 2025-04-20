import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {

    const { role, InterviewPreferrence, company, experience } = await req.json();

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

    const prompt = `I want to practice mock interview for company ${company} for role ${role} and my experience is ${experience}
    and I am targetting for ${InterviewPreferrence} interview. Generate questions based on this data so that I can pass the questions to 
    an AI voice agent to ask me. Just give me plain text without any formatting`;

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