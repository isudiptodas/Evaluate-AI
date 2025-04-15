import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/config/connectDb';
import { User } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function POST(req: NextRequest) {
    await connectDB();

    const body = await req.json();

    const { type } = body;

    if (type === 'register') {
        const { name, email, password } = body;

        try {

            const found = await User.findOne({ email });

            if (found) {
                return NextResponse.json({
                    status: 400,
                    message: "User already registered"
                });
            }

            const hashed = await bcrypt.hash(password, 10);

            const newUser = new User({
                name, email, password: hashed
            });

            await newUser.save();

            return NextResponse.json({
                status: 200,
                message: "User Registered",
                newUser
            });
        } catch (err) {
            return NextResponse.json({
                status: 500,
                message: "Something went wrong"
            });
        }
    }
    else {
        const { email, password } = body;

        try {
            const found = await User.findOne({ email });

            if (!found) {
                return NextResponse.json({
                    status: 404,
                    message: "User not found"
                });
            }

            const matched = await bcrypt.compare(password, found.password);

            if (!matched) {
                return NextResponse.json({
                    status: 400,
                    message: "Incorrect Password"
                });
            }

            const secret = process.env.JWT_SECRET as string;

            const token = jwt.sign({ id: found._id, email: found.email }, secret, { expiresIn: '1d' });

            const res = NextResponse.json({
                status: 201,
                success: true
            });

            res.cookies.set('token', token, {
                sameSite: 'strict',
                httpOnly: true,
                secure: true,
                maxAge: 86400
            });

            return res;

        } catch (err) {
            console.error(err);
            return NextResponse.json({
                status: 500,
                message: "Something went wrong"
            });
        }
    }
}

export async function GET(req: NextRequest) {

    const cookie = req.headers.get('cookie');
    //console.log(cookie);

    const token = cookie?.split(';').find(c => c.startsWith('token='))?.split('=')[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token as string, secret);

    const payloadEmail = payload.email;

    try {

        const found = await User.findOne({email: payloadEmail});

        return NextResponse.json({
            status: 200,
            found
        });

    } catch (err) {
        console.error(err);
        return NextResponse.json({
            status: 500,
            message: "Something went wrong"
        });
    }
}
