import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { subjectsData } from "@/lib/data";
import Image from "next/image";
import { fetchSubjects } from "@/lib/fetchDaata";
//import { useUser } from '@clerk/nextjs'
import FormContainer from '@/components/FormContainer'
import { subjectT } from "@/lib/types";
import { currentUser } from "@clerk/nextjs/server";

const SubjectListPage = async ({ searchParams }:
  { searchParams: { [key: string]: string } }
) => {

  const q: string = searchParams?.search || ''
  const page: number = parseInt(searchParams?.page) || 1;
  const { subjects, count } = await fetchSubjects(page, q)

  const user = await currentUser()
  const role: any = user?.publicMetadata

  const renderRow = (item: subjectT) => (
    <tr key={item.id}
      className="border-b even:bg-slate-50 text-sm hover:bg-purple-100">
      <td className="flex items-center justify-center gap-4 p-4">
        <Image src={item.img ? item.img : '/singleClass.png'} width={40} height={40} alt=""
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.subject}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.id}</td>
      <td className="hidden md:table-cell">{item.subject} </td>
      <td className="hidden md:table-cell">class </td>
      <td className="hidden md:table-cell">-</td>
      <td className="hidden md:table-cell">-</td>
      <td>
        <div className="flex items-center gap-2">

          {role?.role == 'admin' && (<FormModal table="subject" type="update" id={item.id} />)}
          {role?.role == 'admin' && (<FormModal table="subject" type="delete" id={item.id} />)}

        </div>
      </td>
    </tr>
  )
  return (
    <div className='bg-white p-4  m-4 mt-0 rounded-md' >
      {/* top */}
      <div className="flex justify-between items-center">
        <div className="hidden md:block text-lg font-semibold">Subjects</div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <TableSearch />
          <div className="flex items-center gap-4 self-end w-">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src='/filter.png' width={14} height={14} alt="" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400">
              <Image src='/sort.png' width={14} height={14} alt="" />
            </button>

            {role?.role == 'admin' && <FormContainer table="subject" type="create" />}

          </div>
        </div>
      </div>
      {/* list */}
      <Table renderRow={renderRow} data={subjects ? subjects : subjectsData} />
      {/* pagination */}
      <Pagination count={count} />
    </div>
  )
}

export default SubjectListPage;