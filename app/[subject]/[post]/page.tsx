import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs/promises';
import path from 'path';
import { heads } from '@/components/mdx/heads';
import { lists } from '@/components/mdx/list';
import { table } from '@/components/mdx/table';
import { highlights } from '@/components/mdx/highlights';
import { code } from '@/components/mdx/code';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    let params = [];
    let root = path.join(process.cwd(), 'public');
    let dirList = await fs.readdir(root);

    for (let dir of dirList) {
        let fileList = await fs.readdir(`${root}/${dir}`);
        for (let file of fileList) {
            let newFile = file.replace('.mdx', '');
            params.push({
                subject: dir,
                post: encodeURI(newFile)
            })
        }
    }
    return params;
}



export default async function Page({
    params
}: {
    params: { subject: string; post: string }
}) {
    const filePath = path.join(process.cwd(), 'public', params.subject, `${decodeURI(params.post)}.mdx`);
    try {
        const res = await fs.readFile(filePath, 'utf8');
        console.log(`리렌더 페이지`);
        return (
            <div className="flex-1 flex flex-col items-center bg-blue-300">
                <div className="w-1/2">
                    <MDXRemote
                        source={res}
                        components={{
                            ...heads,
                            ...lists,
                            ...highlights,
                            ...code,
                            ...table
                        }}
                    />
                </div>
            </div>
        )
    }
    catch (e) {
        notFound();
    }
}
