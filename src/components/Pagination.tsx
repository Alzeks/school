'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }: { count: number }) => {
    const searchParams = useSearchParams()
    const { replace } = useRouter(); 
    const pathname = usePathname();

    const page = searchParams.get("page") || '1';

    const params = new URLSearchParams(searchParams);
    const ITEM_PER_PAGE = 6;

    const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
    const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

    const handleChangePage = (type: string) => {
        type === "prev"
            //@ts-ignore
            ? params.set("page", parseInt(page) - 1)
            //@ts-ignore
            : params.set("page", parseInt(page) + 1);
        replace(`${pathname}?${params}`);
    };

    return (
        <div className='flex p-4 justify-between items-center' >
            <button className="py-2 px-4 rounded-md bg-slate-400 text-sm font-semibold 
            disabled:opacity-50 disabled:cursor-not-allowed "
                onClick={() => handleChangePage('prev')} disabled={!hasPrev}>
                Prev
            </button>

            <div className="flex">
                <button>
                    {hasPrev && '..'}{page}{hasNext &&  '..'}
                </button>
            </div>

            <button className="py-2 px-4 rounded-md bg-slate-400 text-sm font-semibold 
            disabled:opacity-50  disabled:cursor-not-allowed "
                onClick={() => handleChangePage('next')} disabled={!hasNext}>
                Next
            </button>
        </div>
    )
}

export default Pagination;