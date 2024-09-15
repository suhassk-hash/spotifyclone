"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            username,
            password,
        });

        if (result?.ok) {
            router.push('/');
        } else {
            console.error(result?.error);
        }
    };

    return (
        <div>
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-sm font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 rounded-md bg-gray-700 text-white border border-gray-600 outline-none focus:border-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 rounded-md text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;
