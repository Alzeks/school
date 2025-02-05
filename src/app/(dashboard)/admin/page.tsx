import CalendarContainer from "@/components/CalendarContainer"
import Link from "next/link";
import BigCalendar from '@/components/BigCalendar'

const AdminPage = async () => {
  
  return (
    <div className='flex flex-col md:flex-row gap-4  p-4 bg-slate-100' >
      {/* LEFT */}
      <div className="w-full lg:w-2/3 ">
        <div className="flex justify-center bg-slate-50 p-1 mb-2">Admin can update, create, delete any list</div>

        <div className=" flex flex-wrap justify-between gap-2 mb-4">
          <div className="flex-1 rounded-md bg-slate-500 p-4">
            <div className="text-white m-2">Admin</div>
            <div className="w-12 ring-gray-900 bg-slate-100 rounded-md p-2">2</div>
          </div>
          <Link href='/list/teachers' className="flex-1 rounded-md bg-yellow-600 p-4 hover:bg-yellow-500">
            <div className="text-white m-2">Teachers-list. Update ability</div>
            <div className="w-12 right-2 bg-slate-100 rounded-md p-2">20</div>
          </Link>
          <Link href='/list/students' className="flex-1 rounded-md bg-slate-500 p-4 hover:bg-slate-400">
            <div className="text-white m-2">Students-list. Update ability</div>
            <div className="w-12 right-2 bg-slate-100 rounded-md p-2">27</div>
          </Link>
          <div className="flex-1 rounded-md bg-yellow-600 p-4">
            <div className="text-white m-2">So on</div>
            <div className="w-12 right-2 bg-slate-100 rounded-md p-2">2</div>
          </div>
        </div>
        <div className="flex self-center text-yellow-600">Lessons Schedule</div>

        <BigCalendar />

      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">

        <CalendarContainer />

        <div className="For now is empty"></div>
      </div>
    </div>
  )
}

export default AdminPage;