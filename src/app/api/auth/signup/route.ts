// src/app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../lib/dbConnect';
import UserModel from '../../../../model/User';

export async function POST(request: Request) {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();
        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
