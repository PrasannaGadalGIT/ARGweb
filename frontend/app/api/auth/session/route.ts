// /app/api/auth/session/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// POST /api/auth/session -> Store token as HTTP-only cookie
export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token not provided' }, { status: 400 });
  }

  const cookieStore = cookies();

  (await cookieStore).set({
    name: 'authToken',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax'
  });

  return NextResponse.json({ message: 'Session created' });
}

// GET /api/auth/session -> Check if authToken cookie exists
export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('authToken')?.value;

  if (token) {
    return NextResponse.json({ loggedIn: true });
  } else {
    return NextResponse.json({ loggedIn: false });
  }
}
