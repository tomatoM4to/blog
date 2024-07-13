export const lists = {
    ul: (props: any) => (
        <ul {...props} className="list-disc">
            {props.children}
        </ul>
    ),
    ol: (props: any) => (
        <ol {...props} className="list-decimal">
            {props.children}
        </ol>
    ),
}
