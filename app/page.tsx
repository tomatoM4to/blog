import Link from "next/link";
import { mainPage } from "@/components/responsiveConfig";

function Dummy() {
    return <div className={`${mainPage}`}></div>;
}

export default function Home() {
    return (
        <div className="mt-32 flex w-full">
            <Dummy />
            <div className="flex-1 flex flex-col items-center">
                <Link href="/os/1-Memory-overview">os</Link>
                <Link href="/network/1-Internet-And-Protocol">network</Link>
            </div>
        </div>
    );
}