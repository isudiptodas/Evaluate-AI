import { History } from "@/models/history";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = req.url;
    
    const split = url.split('id=');
    const id = split[1];

    try {

        const found = await History.find({userId: id});

        return NextResponse.json({
            success: true,
            status: 200,
            message: "History fetched",
            found
        });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            status: 500,
            message: "Something Went Wrong"
        });
    }
}