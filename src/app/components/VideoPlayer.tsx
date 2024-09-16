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
    const audioRef = useRef<HTMLAudioElement | null>(new Audio(tracks[trackIndex].audioSrc));
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.src = tracks[trackIndex].audioSrc;
        audio.volume = volume;

        const handleMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setTrackProgress(audio.currentTime);
        };

        audio.addEventListener('loadedmetadata', handleMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [trackIndex, volume]);

    const play = () => {
        audioRef.current?.play();
        setIsPlaying(true);
        intervalRef.current = window.setInterval(() => {
            if (audioRef.current) {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, 1000);
    };

    const pause = () => {
        audioRef.current?.pause();
        setIsPlaying(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const skipForward = () => {
        pause();
        setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        audioRef.current = new Audio(tracks[(trackIndex + 1) % tracks.length].audioSrc);
        play();
    };

    const skipBackward = () => {
        pause();
        setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
        audioRef.current = new Audio(tracks[(trackIndex - 1 + tracks.length) % tracks.length].audioSrc);
        play();
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
