import Link from "next/link";
import { nav } from "@/components/responsiveConfig";

export function Nav() {
    return (
        <nav className={`${nav} w-full bg-white flex items-center h-14 mr-auto text-2xl mb-20 fixed`}>
            <Link href="/">tomatoM4to&apos;s blog</Link>
        </nav>
    )
}