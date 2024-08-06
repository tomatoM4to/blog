import Link from 'next/link';

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    console.log('레이아웃');
    return (
        <div className="flex">
            <div className="w-96 flex flex-col text-4xl gap-10 overflow-auto">
                <Link href="/os/[1]메모리 개요">메모리 개요</Link>
                <Link href="/os/[2]메모리 할당">메모리 할당</Link>
                <Link href="/os/[3]가상 메모리">가상 메모리</Link>
                <Link href="/os/[4]페이징1">페이징1</Link>
                <Link href="/os/[5]페이징2">페이징2</Link>
                <Link href="/os/디스크 시스템">디스크 시스템</Link>
            </div>
            {children}
        </div>
    );
}