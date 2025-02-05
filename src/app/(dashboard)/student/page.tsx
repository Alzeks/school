import BigCalendar from "@/components/BigCalendar";

const StudentPage = () => {
  return (
    <div className='flex flex-col p-4 gap-4 xl:flex-row' >
      {/* Left */}
      <div className="">
      <div className="text-xl text-yellow-600">Students</div>
      {/* <div className="w-full xl:w-2/3 bg-slate-50"> */}
      <div className=" bg-slate-50">
        <BigCalendar />
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/2 flex-col gap-8 ">
        Right bar
        
        <div className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur non dicta numquam, vitae, at ex inventore consectetur ipsum nam, molestiae sequi voluptates expedita recusandae maiores distinctio fugiat possimus pariatur excepturi.</div>
      </div>
    </div>
  )
}

export default StudentPage;