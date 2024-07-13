import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs/promises';
import path from 'path';
import { heads } from '@/components/mdx/heads';
import { lists } from '@/components/mdx/list';
import { highlights } from '@/components/mdx/highlights';
import { code } from '@/components/mdx/code';

export default async function Page({
    params
}: {
    params: { subject: string; post: string }
}) {
    const filePath = path.join(process.cwd(), 'public', params.subject, `${params.post}.mdx`);
    const res = await fs.readFile(filePath, 'utf8');

    return (
        <MDXRemote
            source={res}
            components={{
                ...heads,
                ...lists,
                ...highlights,
                ...code,
            }}
        />
    )
}
