import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import FormContainer from '@/components/FormContainer'
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { teachersData } from "@/lib/data";
import Image from "next/image";
import { fetchTeachers } from "@/lib/fetchDaata";
import { UserT } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

  const TeachersListPage = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
    const s: string = searchParams?.subject || '';
    const q: string = searchParams?.search || '';
    const page: any = parseInt(searchParams?.page) || 1; //+parsInteger 
    const { teachers, count } = await fetchTeachers(page, q, s);
  
    const user = await currentUser();
    const role: any = user?.publicMetadata;

    const renderRow = (item: UserT) => (
      <tr key={item.id}
        className="border-b even:bg-slate-50 text-sm hover:bg-purple-100">
        <td className="">
          <Link className="flex items-center justify-center gap-2 p-4" href={`/list/teachers/${item.id}`}>
            <Image src={item.img ? item.img : '/avatar.png'} width={40} height={40} alt=""
              className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <h3 className="font-semibold">{item.username}</h3>
              <p className="text-xs text-gray-500">{item.lastname}</p>
            </div>
          </Link>
        </td>
        <td className="hidden md:table-cell">{item.id}</td>
        <td className="hidden md:table-cell">{item.subject} </td>
        <td className="hidden md:table-cell">class</td>
        <td className="hidden md:table-cell">{item?.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
  
            {role.role == 'admin' && (<FormModal table="teacher" type="update" id={item.id} />)}
            {role.role == 'admin' && (<FormModal table="teacher" type="delete" id={item.id} />)}
  
          </div>
        </td>
      </tr>
    )
  return (
    <div className='bg-white p-4  m-4 mt-0 rounded-md' >
      {/* TOP */}
      <div className="flex justify-between items-center">
        <div className="hidden md:block text-lg font-semibold">Teachers</div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <TableSearch />
          <div className="flex items-center gap-4 self-end w-">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src='/filter.png' width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src='/sort.png' width={14} height={14} alt="" />
            </button>

            {/* <FormModal table="teacher" type="create" /> */}
            <FormContainer table="teacher" type="create" />

          </div>
        </div>
      </div>
      {/* LIST */}
      <Table renderRow={renderRow} data={teachers ? teachers : teachersData} />

      {/* Pagination */}
      <Pagination count={count} />
    </div>
  )
}

export default TeachersListPage;

