"use client";

import { useSession } from "next-auth/react";

const Left = () => {
    const { data: session } = useSession();

    console.log("Session data:", session); // Debugging line to check session data

    return (
        <div className="px-2 py-1 relative">
            <div className="h-80p w-[300px] rounded-md flex-col bg-bg">
                <div className="flex">
                    <span
                        aria-hidden="true"
                        className="IconWrapper__Wrapper-sc-16usrgb-0 jEDcnm"
                    >
                        <svg
                            data-encore-id="icon"
                            fill="#b2b2b2"
                            role="img"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="w-[30px] mx-6 py-4"
                            style={{ background: 'none' }}
                        >
                            <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z" />
                        </svg>
                    </span>
                    {session ? (
                        <div>
                            <h5 className="color-text py-5">My Library</h5>
                        </div>
                    ) : (
                        <div>
                            <h5 className="color-text py-5">Your Library</h5>
                        </div>
                    )}
                </div>
                {!session ? (
                    <div className="color-white mx-2 bg-box py-2 pb-8 px-4 rounded-md">
                        <p className="text-m">Create your first playlist</p>
                        <p className="text-xs py-1">It&apos;s easy, we&apos;ll help you</p>
                        <button
                            type="button"
                            className="bg-white text-gray-800 mt-4 rounded-full"
                        >
                            <a href="/login" className="bg-white rounded-full p-2 text-sm">
                                Create Playlist
                            </a>
                        </button>
                    </div>
                ) : (
                    <div className="color-white rounded-md">
                        <div className="flex">
                            <button
                                type="button"
                                className="bg-box text-white mx-4 p-1 rounded-full"
                            >
                                <a href="/playlists" className="rounded-full p-2 text-sm">
                                    Playlists
                                </a>
                            </button>
                            <button
                                type="button"
                                className="bg-box text-white mx-1 p-1 rounded-full"
                            >
                                <a href="/podcasts" className="rounded-full p-2 text-sm">
                                    Podcasts & Shows
                                </a>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Left;
