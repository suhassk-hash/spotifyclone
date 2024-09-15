"use client"
import Header from "./(components)/header/page"; 
import dbConnect from "../lib/dbConnect";

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
