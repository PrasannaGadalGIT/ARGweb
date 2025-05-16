// /app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).set({
    name: 'authToken',
    value: '',
    maxAge: 0, // Expire immediately
    path: '/',
  });

  return NextResponse.json({ message: 'Logged out' });
}
