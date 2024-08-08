import { Button } from "@/components/button";
import { VscCode } from "react-icons/vsc";
import { VscSourceControl } from "react-icons/vsc";
import { VscSparkle } from "react-icons/vsc";
import { VscTerminalLinux } from "react-icons/vsc";
import { VscGithubInverted } from "react-icons/vsc";
import { MiniTitle } from "./miniTitle";

export function Sidebar({ tailwind }: { tailwind: string }) {
    return (
        <aside className={tailwind}>
            <MiniTitle title="메인메뉴" />
            <div className="flex flex-col border-b-2 border-gray-300">
                <Button icon={<VscSparkle />} title="소개" count={-1} />
                <Button icon={<VscSourceControl />} title="컴퓨터 과학" count={0} />
                <Button icon={<VscCode />} title="데브" count={0} />
                <Button icon={<VscTerminalLinux />} title="리눅스/도커" count={0} />
                <Button icon={<VscGithubInverted />} title="깃헙" count={0} />
            </div>
        </aside>
    )
}