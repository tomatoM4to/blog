'use client';

import { MenuButton } from "./menuButton"
import { useState } from "react"
import { MenuList } from "./menuList";
import { sideMenu } from "@/components/responsiveConfig";

export function SideMenu({
    res,
    params
}: {
    res: string[],
    params: { subject: string }
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`${sideMenu}`}>
            <MenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
            <MenuList isOpen={isOpen} res={res} params={params} />
        </ div>
    )
}