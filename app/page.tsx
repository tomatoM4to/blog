import Link from "next/link";

function Dummy() {
    return <div className="w-96"></div>;
}

export default function Home() {
    return (
        <div className="mt-32 flex w-full">
            <Dummy />
            <div className="flex-1 flex flex-col items-center">
                <Link href="/os/[1]메모리 개요">os</Link>
                <Link href="/network/OSI7">network</Link>
            </div>
        </div>
    );
}