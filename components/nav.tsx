import Link from "next/link";

export function Nav({ tailwind }: { tailwind: string }) {
    return (
        <nav className={tailwind}>
            <Link href="/">tomatoM4to's blog</Link>
        </nav>
    )
}