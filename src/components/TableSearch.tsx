'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { subjectsData } from "@/lib/data";

const TableSearch = () => {
  const router = useRouter()

  const handlChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const value1 = (e.currentTarget[0] as HTMLInputElement).value
    params.set('subject', value1)

    const value = (e.currentTarget[1] as HTMLInputElement).value
    if (value.length == 1) { return null }
    params.set('search', value);
    router.push(`${window.location.pathname}?${params}`)
  };
  return (
    <div className="flex">

      <form onChange={handlChange}
        className='flex items-center justify-center gap-2 rounded-full ring-[1.5px] ring-gray-300 p-1' >
        <select name="subject" defaultValue={'on'} className="ring-slate-300 p-1 rounded-md ">
          <option className="" value={''} key={1}>no subject</option>
          {subjectsData.map(subject => <option value={subject.subject} key={subject.subject}>{subject.subject}</option>)}
        </select>
        <Image src='/search.png' width={20} height={20} alt="" />
        <input type='text' placeholder="User search"
          className="w-[200px] outline-none bg-transparent" />
      </form>
    </div>
  )
}

export default TableSearch;