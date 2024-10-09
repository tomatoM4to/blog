export const code = {
    code: (props: any) => {
        return (
            <code {...props} className={`overflow-x-auto bg-gray-200 rounded-md px-1 ${props.className}`}>
                {props.children}
            </code>
        )
    },

    pre: (props: any) => {
        return (
            <pre {...props} className="bg-gray-200 rounded-md px-1 py-2">
                {props.children}
            </pre>
        )
    }
}