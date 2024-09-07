import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { SideList } from '@/components/sidebar/sideList';
import { SideMenu } from '@/components/sideMenu/menu';

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
                <SideMenu res={res} params={params} />
                <SideList res={res} params={params} />
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