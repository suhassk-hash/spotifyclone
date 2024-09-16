"use client";
import Image from 'next/image';
import search from "../../images/clipart742441.png";
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();  // Use usePathname to get the current path
    const { data: session } = useSession();
    const [page, setPage] = useState<string | null>(null);

    useEffect(() => {
        if (pathname === '/') {
            setPage('Home');
        } else if (pathname.endsWith('/search')) {
            setPage('Search');
        } else {
            setPage(null);
        }
    }, [pathname]);

    const handleSearchClick = () => {
        router.push('/search');
    };

    return (
        <header className="h-16 bg-black text-white flex items-center px-6 shadow-md fixed top-0 left-0 right-0 z-50">
            <Image
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/spotify-white-icon.png"
                alt="Spotify Icon"
                width={80}
                height={40}
                className="py-2 px-6"
            />
            <div className="flex-grow flex items-center justify-center space-x-4">
                {page === "Home" && (
                    <div className='bg-gray-800 rounded-full p-2 m-2 hover:scale-105 active:scale-95 transition-transform'>
                        <a href="#" onClick={(e) => e.preventDefault()}>
                            <svg
                                fill="#ffffff"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="28px"
                                height="30px"
                            >
                                <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z" />
                            </svg>
                        </a>
                    </div>
                )}
                {page === "Search" && (
                    <div className='bg-gray-800 rounded-full p-2 m-2 hover:scale-105 active:scale-95 transition-transform'>
                        <a href="/" onClick={(e) => e.preventDefault()}>
                            <svg
                                fill="none"
                                stroke="#ffffff"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="28px"
                                height="30px"
                            >
                                <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z" stroke-width="2" />
                            </svg>
                        </a>
                    </div>
                )}
                <div className="flex items-center bg-gray-800 rounded-full p-1 w-full max-w-xl">
                    <Image
                        src={search}
                        alt="Search Icon"
                        width={39}
                        height={20}
                        className="text-gray-400 p-2"
                    />
                    <input
                        type="search"
                        id="default-search"
                        className="text-white px-4 bg-gray-800 rounded-full py-2 w-full ml-2 outline-none"
                        placeholder="What do you want to play?"
                        required
                        onClick={handleSearchClick}
                    />
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                {session ? (
                    <button
                        type="button"
                        className='bg-green-600 rounded-full p-4 text-sm'
                        onClick={() => signOut()}
                    >
                        Sign out
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            className='p-2 text-gray-200 text-sm'
                            onClick={() => router.push('/signup')}
                        >
                            Sign up
                        </button>
                        <button
                            type="button"
                            className="bg-white text-gray-800 p-2 rounded-full"
                        >
                            <a href="/login" className='bg-white rounded-full p-2 text-sm'>
                                Log in
                            </a>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
