function R({ children }: { children: React.ReactNode }) {
    return <span style={{ color: 'red' }}>{children}</span>;
}

function G({ children }: { children: React.ReactNode }) {
    return <span style={{ color: 'green' }}>{children}</span>;
}

function B({ children }: { children: React.ReactNode }) {
    return <span style={{ color: 'blue' }}>{children}</span>;
}

function U({ children }: { children: React.ReactNode }) {
    return <span style={{ textDecoration: 'underline' }}>{children}</span>;
}

export const highlights = {
    R,
    G,
    B,
    U,
    hr: (props: any) => (
        <hr {...props} className="border-t-4 border-gray-300 mt-10 mb-10">
            {props.children}
        </hr>
    ),
}
