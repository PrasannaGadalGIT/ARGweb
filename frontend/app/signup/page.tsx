'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        confirmPassword: ""
    });
    
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("https://argweb-2.onrender.com/api/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup successful!");
            router.push('/login');
        } catch (error: unknown) {
            console.log("Signup failed", error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || error.message || "Signup failed");
            } else if (error instanceof Error) {
                toast.error(error.message || "Signup failed");
            } else {
                toast.error("Signup failed");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if passwords match whenever either password changes
        setPasswordMatch(user.password === user.confirmPassword);
    }, [user.password, user.confirmPassword]);

    useEffect(() => {
        if (user.email.length > 0 && 
            user.password.length > 0 && 
            user.username.length > 0 && 
            passwordMatch && 
            user.confirmPassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user, passwordMatch]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border-2 border-cyan-400 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400"></div>
                <div className="absolute top-2 left-2 right-2 h-1 bg-cyan-400 opacity-30"></div>
                
                <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400 neon-text">
                    {loading ? "Creating Account..." : "Player Sign Up"}
                </h1>
                
                <div className="space-y-6">
                    <div className="relative">
                        <input 
                            className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all"
                            placeholder="Username" 
                            id='username' 
                            value={user.username} 
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            disabled={loading}
                        />
                        <span className="absolute left-0 -bottom-5 text-xs text-cyan-400">Choose your player name</span>
                    </div>
                    
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
                        <span className="absolute left-0 -bottom-5 text-xs text-cyan-400">Your contact email</span>
                    </div>
                    
                    <div className="relative">
                        <input 
                            className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all
                                ${passwordMatch ? 'border-gray-600 focus:border-cyan-400' : 'border-red-500 focus:border-red-500'}`}
                            placeholder="Password" 
                            id='password' 
                            type="password"
                            value={user.password} 
                            onChange={(e) => setUser({ ...user, password: e.target.value })} 
                            disabled={loading}
                        />
                        <span className="absolute left-0 -bottom-5 text-xs text-cyan-400">Secret passphrase</span>
                    </div>
                    
                    <div className="relative">
                        <input 
                            className={`w-full px-4 py-3 bg-gray-700 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all
                                ${passwordMatch ? 'border-gray-600 focus:border-cyan-400' : 'border-red-500 focus:border-red-500'}`}
                            placeholder="Confirm Password" 
                            id='confirmPassword' 
                            type="password"
                            value={user.confirmPassword} 
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} 
                            disabled={loading}
                        />
                        <span className="absolute left-0 -bottom-5 text-xs text-cyan-400">Repeat your passphrase</span>
                        {!passwordMatch && (
                            <span className="absolute right-0 -bottom-5 text-xs text-red-500">Passwords don&apos;t match!</span>
                        )}
                    </div>
                    
                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled || loading}
                        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all 
                            ${buttonDisabled || loading ? 
                                'bg-gray-600 cursor-not-allowed' : 
                                'bg-cyan-600 hover:bg-cyan-500 active:scale-95 shadow-lg shadow-cyan-500/20'}
                            ${!buttonDisabled && !loading && 'pulse-animation'}`}
                    >
                        {loading ? "Processing..." : 
                         buttonDisabled ? "Complete all fields to continue" : "Start Adventure!"}
                    </button>
                    
                    <div className="text-center mt-4">
                        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 text-sm underline">
                            Already have an account? Continue your journey
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