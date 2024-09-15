"use client"
import Header from "./(components)/header/page"; 
import dbConnect from "../lib/dbConnect";
import { SessionProvider } from "next-auth/react";
const check=async ()=>{
    await dbConnect();
}
export default function Home() {
    check();
    return (
        <div>
            <Header page="Home"/>
        </div>
    );
}
