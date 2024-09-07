'use client';

import { useEffect } from "react"

export function Background({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: Function
}) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);
    return (
        <div
            className={`
        w-screen
        h-screen
        bg-white
        blur-lg
        fixed
        left-0
        top-0
        transition-opacity
        duration-300
        ${isOpen ? 'opacity-70' : 'opacity-0 pointer-events-none'}`}
            style={{ zIndex: 5 }}
            onClick={() => setIsOpen(false)}
        >
        </div>
    )
}