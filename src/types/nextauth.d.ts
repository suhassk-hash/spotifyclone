import { DefaultSession } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

// Define Playlist type
interface Playlist {
    name: string;
    songs: string[];
}

// Extend the `Session` interface
declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string;
            username?: string;
            email?: string;
            playlists?: Playlist[]; // Add playlists if needed
        } & DefaultSession['user'];
    }

    interface User {
        _id?: string;
        username?: string;
        email?: string;
        playlists?: Playlist[]; // Add playlists if needed
    }
}

// Extend the `JWT` interface
declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        _id?: string;
        username?: string;
        email?: string;
        playlists?: Playlist[]; // Add playlists if needed
    }
}
