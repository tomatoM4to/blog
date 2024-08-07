function Dummy() {
    return <div className="w-96"></div>;
}

export default function Home() {
    return (
        <div className="mt-32 flex w-full">
            <Dummy />
            <div className="flex-1 flex flex-col items-center">
                main page
            </div>
        </div>
    );
}