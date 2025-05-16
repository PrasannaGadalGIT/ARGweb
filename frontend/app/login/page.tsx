'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Redirect if already authenticated
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('/api/auth/session');
                console.log("Auth check response", res.data);
                if (res.data.loggedIn) {
                    router.push('/'); // Already logged in, redirect
                }
            } catch (err) {
                console.error('Auth check failed', err);
            }
        };
        checkAuth();
    }, [router]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://argweb-2.onrender.com/api/login", user);
            console.log("Login success", response.data);

            if (response.data.token) {
                await axios.post('/api/auth/session', {
                    token: response.data.token
                });

                toast.success("Login successful!");
                router.push('/');
            }
        } catch (error: unknown) {
            console.log("Login failed", error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || error.message || "Login failed");
            } else if (error instanceof Error) {
                toast.error(error.message || "Login failed");
            } else {
                toast.error("Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-cyan-400 relative overflow-hidden">
                <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400 neon-text">
                    {loading ? "Logging In..." : "Player Login"}
                </h1>

                <div className="space-y-6">
                    <input
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                        placeholder="Email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        disabled={loading}
                    />
                    <input
                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                        placeholder="Password"
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        disabled={loading}
                    />

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all 
                            ${buttonDisabled || loading ?
                            'bg-gray-600 cursor-not-allowed' :
                            'bg-cyan-600 hover:bg-cyan-500 active:scale-95 shadow-lg shadow-cyan-500/20'}`}
                    >
                        {loading ? "Processing..." : "Enter The Arena"}
                    </button>

                    <div className="text-center mt-4">
                        <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                            Don&apos;t have an account? Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
