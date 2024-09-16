import Header from "./components/header/page";
import MusicPlayer from "./components/VideoPlayer";

export default function Home() {
    return (
        <div>
            <Header page="Home"/>
            <MusicPlayer/>
        </div>
    );
}
