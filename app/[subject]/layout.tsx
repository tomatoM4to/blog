import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { MiniTitle } from '@/components/miniTitle';

export async function generateStaticParams() {
    let params = [];
    let root = path.join(process.cwd(), 'public');
    let dirList = await fs.readdir(root);

    for (let dir of dirList) {
        params.push({
            subject: dir
        })
    }
    return params;
}

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { subject: string }
}) {
    const filePath = path.join(process.cwd(), 'public', params.subject);
    try {
        let res = await fs.readdir(filePath);
        return (
            <div className="flex">
                <div className="w-96 mt-52 p-7 flex flex-col fixed">
                    <MiniTitle title="포스팅" />
                    {
                        res && res.map(file => {
                            let { name } = path.parse(file);
                            name = name.replace('[', '');
                            name = name.replace(']', '#');
                            return name;
                        })
                            .map(file => {
                                let [idx, name] = file.split('#');
                                return (
                                    name &&
                                    name !== 'img' &&
                                    <Link
                                        href={`/${params.subject}/[${idx}]${name}`}
                                        key={idx}
                                        className="px-2 py-1 mb-1 hover:bg-gray-300 transition-colors rounded-lg"
                                    >
                                        {idx}. {name}
                                    </Link>
                                )
                            })
                    }
                </div>
                {children}
            </div>
        );
    }
    catch (e) {
        // @ts-ignore
        console.log(`layout error: ${e.message}`);
        notFound();
    }
}