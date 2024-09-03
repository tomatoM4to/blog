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
        <div className={`${sideList} flex-col mt-52 p-7 fixed`}>
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
    )
}