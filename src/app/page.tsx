
import Header from "./(components)/header/page"; 
import dbConnect from "../lib/dbConnect";
import MusicPlayer from "./(components)/VideoPlayer";
const check=async ()=>{
    await dbConnect();
}
export default function Home() {
    check();
    return (
        <div>
            <Header page="Home"/>
            <MusicPlayer/>
        </div>
    );
}
