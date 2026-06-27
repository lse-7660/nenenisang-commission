'use client';

import Image from 'next/image';

export default function Header() {
    return (
        <header className="w-full max-w-xl px-4 h-15 sticky top-0 z-10 flex items-center bg-white ">
            <div className="w-full flex flex-row items-center gap-3">
                <a href="https://kre.pe/W5NM" target="_blank">
                    <Image width={36} height={36} src="/logo_nenenisang.png" alt="네네니상 커미션 견적" />
                </a>
                <h1 className="sr-only">네네니상 커미션 견적</h1>
                <p className="font-mono text-xl font-bold tracking-tighter text-indigo-500">Nenenisang</p>
            </div>
        </header>
    );
}
