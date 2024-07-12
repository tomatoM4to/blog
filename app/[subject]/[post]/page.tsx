import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs';
import path from 'path';

export default async function Page({
    params
}: {
    params: { subject: string; post: string }
}) {
    const filePath = path.join(process.cwd(), 'public', params.subject, params.post + '.md');
    const res = await fs.readFileSync(filePath, 'utf8');

    return (
        <MDXRemote source={res} />
    )
}