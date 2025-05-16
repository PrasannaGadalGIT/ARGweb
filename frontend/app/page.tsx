// app/page.tsx (or your Home page folder's page.tsx)

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomeClient from '../components/home-client'; // Your client component (the one you shared)

export default async function HomePage() {
  const cookieStore = cookies();
  const authToken = (await cookieStore).get('authToken');

  if (!authToken) {
    // Redirect to login if no auth token cookie found
    redirect('/login');
  }

  // Render the client component if authenticated
  return <HomeClient />;
}
