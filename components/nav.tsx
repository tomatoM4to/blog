import Link from "next/link";
import { nav } from "@/components/responsiveConfig";

export function Nav() {
    return (
        <nav className={`${nav} flex items-center h-14 mr-auto text-2xl mb-20 fixed`}>
            <Link href="/">tomatoM4to's blog</Link>
        </nav>
    )
}