import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="w-64 h-full py-4 px-1 flex flex-col justify-start items-start gap-4 text-2xl">
            <Link href="/" className="w-full py-1 px-2 rounded hover:bg-neutral-200 text-left font-light">Dashboard</Link>
            <Link href="/" className="w-full py-1 px-2 rounded hover:bg-neutral-200 text-left font-light">Friends</Link>
        </div>
    )
}