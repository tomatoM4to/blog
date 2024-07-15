function Table({
    head, body
}: {
    head: string[], body: string[][]
}) {
    return (
        <table className="border-2 border-black mb-5 mt-2">
            <thead className="border-b-2 border-black bg-gray-300">
                <tr className="text-center">
                    {head.map((data, i) => <th key={i}>{data}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    body.map((row, i) => (
                        <tr key={i} className="text-center">
                            {
                                row.map((data, j) => (
                                    <td key={j}>{data}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export const table = {
    Table: (props: any) => (
        <Table head={props.head} body={props.body} />
    ),
}
