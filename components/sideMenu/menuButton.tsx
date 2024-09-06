'use client';

export function MenuButton({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean,
    setIsOpen: Function
}) {
    const tailwind = `w-6 h-0.5 bg-black rounded transform transition-transform duration-300 ease-in-out`;
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="
            flex
            flex-col
            gap-1
            justify-center
            items-center
            w-10
            h-10
            rounded-lg
            fixed
            right-3
            top-3
            active:outline-none
            p-2
            hover:bg-gray-200
            transition-all"
            style={{ zIndex: 100 }}
        >
            <span
                className={`${tailwind} ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>
            <span
                className={`w-6 h-0.5 bg-black rounded transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
                className={`${tailwind} ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
        </button>
    );
}
