export default function Page({
    params
}: {
    params: { subject: string; post: string }
}) {
    return (
        <div>
            My Post: {params.subject} {params.post}
        </div>
    )
}