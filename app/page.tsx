import Link from "next/link";
import { mainPage } from "@/components/responsiveConfig";
import { SideMenu } from "@/components/sideMenu/menu";

function Dummy() {
    return <div className={`${mainPage}`}></div>;
}

export default function Home() {
    return (
        <div className="mt-32 flex w-full">
            <Dummy />
            <SideMenu />
            <div className="flex-1 flex flex-col items-center">
                <Link href="/os/1-Memory-overview">os</Link>
                <Link href="/network/1-Internet-And-Protocol">network</Link>
                <Link href="/ai/1-AI-overview">ai</Link>
                <Link href="/database/1-Database-overview">database</Link>
            </div>
        </div>
    );
}