import mongoose, { Schema, Document } from 'mongoose';


interface Playlist {
    name: string;
    songs: string[]; 
}


export interface User extends Document {
    username: string;
    password: string;
    playlists: Playlist[]; 
}


const PlaylistSchema = new Schema({
    name: { type: String, required: true },
    songs: [{ type: String }]
});


const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playlists: [PlaylistSchema] 
});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);
export default UserModel;
