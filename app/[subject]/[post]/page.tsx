import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs/promises';
import path from 'path';
import { heads } from '@/components/mdx/heads';
import { lists } from '@/components/mdx/list';
import { table } from '@/components/mdx/table';
import { highlights } from '@/components/mdx/highlights';
import { code } from '@/components/mdx/code';
import { notFound } from 'next/navigation';
import remarkGfm from "remark-gfm";
import { postPage, post } from '@/components/responsiveConfig';
import 'github-markdown-css/github-markdown-light.css'

async function getContent(subject: string, post: string) {
    let filePath = path.join(process.cwd(), 'public', subject, `${decodeURI(post)}.mdx`);
    let source = await fs.readFile(filePath, 'utf8');

    let { content } = await compileMDX({
        source,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm]
            }
        },
        components: {
            // ...heads,
            ...lists,
            // ...table,
            ...highlights,
            ...code
        }
    })
    return content;
}

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
    try {
        let content = await getContent(params.subject, params.post);
        return (
            <div className={`${postPage} mt-32 flex-1 flex flex-col items-center overflow-x-hidden`}>
                <div className={`${post} markdown-body`}>
                    {content}
                </div>
            </div>
        )
    }
    catch (e) {
        // @ts-ignore
        console.log(`page error: ${e.message}`);
        notFound();
    }
}
