"use client";
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Sample tracks
interface Track {
    title: string;
    artist: string;
    audioSrc: string;
}

const tracks: Track[] = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    // Add more tracks here
];

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        // Initialize Audio
        if (audioRef.current) {
            audioRef.current.src = tracks[trackIndex].audioSrc;
            audioRef.current.volume = volume;

            // Set duration when metadata is loaded
            const handleMetadata = () => {
                if (audioRef.current) {
                    setDuration(audioRef.current.duration);
                }
            };

            // Update track progress
            const handleTimeUpdate = () => {
                if (audioRef.current) {
                    setTrackProgress(audioRef.current.currentTime);
                }
            };

            // Add event listeners
            audioRef.current.addEventListener('loadedmetadata', handleMetadata);
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

            // Cleanup event listeners
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('loadedmetadata', handleMetadata);
                    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                }
            };
        }
    }, [trackIndex, volume]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            intervalRef.current = window.setInterval(() => {
                if (audioRef.current) {
                    setTrackProgress(audioRef.current.currentTime);
                }
            }, 1000);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    };

    const skipForward = () => {
        pause();
        setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const skipBackward = () => {
        pause();
        setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    };

    const onScrub = (value: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value;
            setTrackProgress(value);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    useEffect(() => {
        // Create new audio element when trackIndex changes
        audioRef.current = new Audio(tracks[trackIndex].audioSrc);
        // Cleanup previous audio element
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };
    }, [trackIndex]);

    return (
        <div className="fixed bottom-0 left-0 w-full text-white p-4 flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between">
                <div className="text-center mb-4 md:mb-0">
                    <h2 className="text-lg font-bold">{tracks[trackIndex].title}</h2>
                    <h3 className="text-sm text-gray-400">{tracks[trackIndex].artist}</h3>
                </div>

                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <div className="flex space-x-4">
                        <button onClick={skipBackward} className="text-white p-2">
                            <FaBackward size={24} />
                        </button>
                        <button onClick={isPlaying ? pause : play} className="text-white p-2 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center">
                            {isPlaying ? <FaPause size={21} /> : <FaPlay size={24} />}
                        </button>
                        <button onClick={skipForward} className="text-white p-2">
                            <FaForward size={24} />
                        </button>
                    </div>

                    <input
                        type="range"
                        value={trackProgress}
                        max={duration}
                        onChange={(e) => onScrub(Number(e.target.value))}
                        className="w-full mt-4 bg-gray-600 h-2 rounded-full"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <button onClick={toggleMute} className="text-white p-2">
                        {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
                    </button>
                    <input
                        type="range"
                        value={volume}
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={handleVolumeChange}
                        className="w-24 bg-gray-600 h-2 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
