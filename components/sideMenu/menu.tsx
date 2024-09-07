'use client';

import { MenuButton } from "./menuButton"
import { useState } from "react"
import { MenuList } from "./menuList";
import { sideMenu } from "@/components/responsiveConfig";
import { Background } from "./background";

/*
Background -> z-index: 5
MenuList -> z-index: 10
MenuButton -> z-index: 15
*/
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
            <MenuList isOpen={isOpen} setIsOpen={setIsOpen} res={res} params={params} />
            <Background isOpen={isOpen} setIsOpen={setIsOpen} />
        </ div>
    )
}