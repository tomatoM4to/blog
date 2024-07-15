export const lists = {
    ul: (props: any) => (
        <ul {...props} className="list-disc ml-4">
            {props.children}
        </ul>
    ),
    ol: (props: any) => (
        <ol {...props} className="list-decimal ml-4">
            {props.children}
        </ol>
    ),
}
