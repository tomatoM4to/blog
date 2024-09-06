export function MiniTitle({ title, className }: { title: string, className?: string }) {
    return <p className={`text-sm text-gray-500 ${className}`}>{title}</p>
}