import { fetchTeacher } from "@/lib/fetchDaata";
import { strict } from "assert"
import Image from "next/image";
import EventCalendar from "@/components/EventCalendar";

const SingleTeacher = async ({ params}: { params: { [key: string]: string }}) => {
    const { id } = params
    const { teacher } = await fetchTeacher(id)
   
    return (
        <div className="flex-1 p-4 gap-4 flex flex-col  xl:flex-row">
            {/* L/EFT */}
            <div className="w-full xl:w-2/3">

                {/* TOP */}
                <div className=" flex flex-col bg-gray-200 p-2 gap-2 xl:flex-row">
                    {/* INFO */}
                    <div className="flex-1 bg-slate-400 flex">
                        <div className="flex-1 flex justify-center items-center p-2">
                            <Image src={teacher.img ? teacher.img : '/avatar.png'} width={144} height={144} alt=""
                                className="w-36 h-36 rounded-full object-cover" />
                        </div>
                        <div className=" flex-1 flex flex-col justify-around">
                            <h3 className="text-xl font-semibold">{teacher.username}</h3>
                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,</p>
                            <div className="flex flex-wrap  justify-between text-xs font-medium gap-2 p-2 w-full md:w-2/3 lg:w-full 2xl:w-full border-2">
                                <div className=" flex"> <Image src='/phone.png' width={15} height={15} alt="" className=" " /> {teacher.phone}</div>
                                <div className=" flex"> <Image src='/blood.png' width={15} height={15} alt="" /> {teacher.address}</div>
                                <div className=" flex"> <Image src='/mail.png' width={15} height={15} alt="" /> {teacher.subject}</div>
                                <div className=" flex"> <Image src='/date.png' width={15} height={15} alt="" /> {teacher.phone}</div>
                            </div>
                        </div>
                    </div>
                    {/* CARDS */}
                    <div className="flex-1 flex flex-wrap justify-center gap-2">
                        <div className="bg-white flex rounded-md w-full md:w-[40%] xl:w-[47%] 2xl:w-[48%] gap-4 border-2">
                            <Image src='/singleAttendance.png' width={25} height={25} alt="" className="h-[30px]" />
                            <div className="">
                                <h1 className="text-xl font-semibold">90%</h1>
                                <span className="text-sm text-gray-600">summary</span>
                            </div>
                        </div>
                        <div className="bg-white flex rounded-md w-full md:w-[40%] xl:w-[47%] 2xl:w-[48%] gap-4 border-2">
                            <Image src='/singleLesson.png' width={25} height={25} alt="" className="h-[30px] " />
                            <div className="">
                                <h1 className="text-xl font-semibold">80%</h1>
                                <span className="text-sm text-gray-600"><summary></summary></span>
                            </div>
                        </div>
                        <div className="bg-white flex rounded-md w-full md:w-[40%] xl:w-[47%] 2xl:w-[48%] gap-4 border-2">
                            <Image src='/singleClass.png' width={25} height={25} alt="" className="h-[30px]" />
                            <div className="">
                                <h1 className="text-xl font-semibold">70%</h1>
                                <span className="text-sm text-gray-600">summary</span>
                            </div>
                        </div>
                        <div className="bg-white flex rounded-md w-full md:w-[40%] xl:w-[48%] 2xl:w-[48%] gap-4 border-2">
                            <Image src='/singleBranch.png' width={25} height={25} alt="" className="h-[30px] " />
                            <div className="">
                                <h1 className="text-xl font-semibold">60%</h1>
                                <span className="text-sm text-gray-600">summary</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Schedule */}
                <div className="">Schedule
                   
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 border-2">
                <EventCalendar />
            </div>
        </div>
    )

}

export default SingleTeacher;