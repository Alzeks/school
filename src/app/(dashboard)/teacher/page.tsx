
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Image from "next/image";
import { fetchSchedule, fetchTeachers } from "@/lib/fetchDaata";
import { UserT } from "@/lib/types";
import { currentUser, User } from "@clerk/nextjs/server";
import EventCalendar from "@/components/EventCalendar";


const TeachersListPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {

  // const q: string = Object.keys(searchParams).length  && (searchParams?.date.slice(0, 3)+'day').toLowerCase() || ''
  const user = await currentUser()
  let q: string = Object.keys(searchParams).length && (searchParams?.date.slice(0, 3)).toUpperCase() || ''
  const s: any = user?.publicMetadata.subject
  const data = await fetchSchedule(q, s)

  const role: any = user?.publicMetadata.role


  const renderRow = (item: any) => (
    <tr key={item.id}
      className=" bg-slate-100 even:bg-slate-50 text-sm hover:bg-purple-100 ">
      <td className="flex items-center justify-center gap-4 p-4 border-2">
        <Image src={'/singleBranch.png'} width={40} height={40} alt=""
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <h3 className="font-semibold">{item.day}</h3>
      </td>

      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.subject} {/* {item.subjects.join(',')} */}
      </td>
      <td className="hidden md:table-cell">{item.clas} {/* {item.classes.join(',')} */}
      </td>
      <td className="hidden md:table-cell">{item?.startTime}</td>
      <td className="hidden md:table-cell">{item.endTime}</td>
      <td>
        <div className="flex items-center gap-2">

          {role == 'admin' && (<FormModal table="schedule" type="update" id={item.id} />)}
          {role == 'admin' && (<FormModal table="schedule" type="delete" id={item.id} />)}
        </div>
      </td>
    </tr>
  )

  return (
    <div>
      <div className="">
        <Image src={'/avatar.png'} width={40} height={40} alt=""
          className=" w-10 h-10 rounded-full object-cover" />
        <div className="text-xl text-yellow-600">{user?.username}</div>
      </div>

      <div className="md:flex m-2">
        {/* <div className="bg-slate-50 "><BigCalendar /></div> */}
        < Table renderRow={renderRow} data={data} schedule='1' />
        <div className="w-full md:w-1/4 rounded-md ml-2"><EventCalendar /></div>
      </div>
    </div>
  )
}

export default TeachersListPage;

