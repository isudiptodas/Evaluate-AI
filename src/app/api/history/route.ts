import { History } from '@/models/history';

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

export async function POST(req: NextRequest) {
    const cookie = req.headers.get('cookie');
    const token = cookie?.split(';').find(c => c.startsWith('token='))?.split('=')[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token as string, secret);
    const id = payload.id;
    const { name, role, company, experience, type, feedback, question } = await req.json();

    //console.log(id, name, role, type, feedback);

    try {
        const newHistory = new History({
            name: name,
            role: role,
            company: company,
            experience: experience,
            type: type,
            feedback: feedback,
            questions: question,
            userId: id
        });

        await newHistory.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "History Saved",
            newHistory
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Something Went Wrong"
        });
    }

}