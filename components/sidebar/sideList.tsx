import { MiniTitle } from "@/components/miniTitle";
import Link from 'next/link';
import path from 'path';
import { sideList } from "@/components/responsiveConfig";

export function SideList({
    res,
    params
}: {
    res: string[],
    params: { subject: string }
}) {
    return (
        <div className={`${sideList} flex-col mt-52 p-7 pb-60 fixed h-screen`}>
            <MiniTitle title="포스팅" />
            <div className="h-full flex flex-col overflow-y-scroll overscroll-contain">
                {
                    res && res.map(file => {
                        let { name } = path.parse(file);
                        return name;
                    })
                        .map((file, idx) => {
                            let newFileList = file.split('-');
                            newFileList.shift();
                            return (
                                newFileList.length !== 0 &&
                                <Link
                                    href={`/${params.subject}/${file}`}
                                    key={idx}
                                    className="px-2 py-1 mb-1 hover:bg-gray-300 transition-colors rounded-lg"
                                >
                                    {idx + 1}. {newFileList.join(' ')}
                                </Link>
                            )
                        })
                }
            </div>
        </div>
    )
}