function Count({
    count
}: {
    count: number
}) {
    return (
        <span className="text-gray-400">
            {count}
        </span>
    )
}


export function Button({
    icon, title, count
}: {
    icon: React.ReactNode, title: string, count: number
}) {
    return (
        <button className="
            px-2
            py-1
            mb-1
            flex
            justify-between
            hover:bg-gray-300
            transition-colors
            rounded-lg
        ">
            <div className="flex items-center">
                <div className="mr-3 text-xl">
                    {icon}
                </div>
                <div className="">
                    {title}
                </div>
            </div>
            {
                count !== -1 && <Count count={count} />
            }
        </button>
    )
}