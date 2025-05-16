'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3001/api/login", user);
            console.log("Login success", response.data);
            
            // Store the token in localStorage or cookies
            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                
                // Optionally store user data
                if (response.data.user) {
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                }
            }
            
            toast.success("Login successful!");
            router.push('/'); 
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
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-cyan-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
                <div className="absolute top-2 left-2 right-2 h-1 bg-cyan-400 opacity-30"></div>

                <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400 neon-text">
                    {loading ? "Logging In..." : "Player Login"}
                </h1>

                <div className="space-y-6">
                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                            placeholder="Email"
                            id='email'
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            disabled={loading}
                        />
                        <span className="absolute left-0 -bottom-5 text-xs text-cyan-400">Enter your email</span>
                    </div>

                    <div className="relative">
                        <input
                            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                            placeholder="Password"
                            id='password'
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            disabled={loading}
                        />
                        <span className="absolute left-0 -bottom-5 text-xs text-cyan-400">Enter your password</span>
                    </div>

                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all 
                            ${buttonDisabled || loading ? 
                                'bg-gray-600 cursor-not-allowed' : 
                                'bg-cyan-600 hover:bg-cyan-500 active:scale-95 shadow-lg shadow-cyan-500/20'}
                            ${!buttonDisabled && !loading && 'pulse-animation'}`}
                    >
                        {loading ? "Processing..." : 
                         buttonDisabled ? "Fill all fields to continue" : "Enter The Arena"}
                    </button>

                    <div className="text-center mt-4">
                        <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                            Don&apos;t have an account? Sign up
                        </Link>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
            </div>

            <style jsx>{`
                .neon-text {
                    text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff;
                }
                .pulse-animation {
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(0, 255, 255, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(0, 255, 255, 0);
                    }
                }
            `}</style>
        </div>
    );
}