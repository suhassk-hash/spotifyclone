import mongoose from "mongoose";
import UserModel from "@/model/User";

type ConnectionObject = {
    isConnected?: number;
};

const conn: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (conn.isConnected) {
        console.log("Using existing connection");
        return;
    }
    try{
        console.log("Connecting to database...");
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        conn.isConnected = db.connections[0].readyState;
        console.log("New connection created");
    }
catch(err){
    console.error("Database connection failed");
        console.error(err);
}

}
export default dbConnect;