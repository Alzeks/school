import Image from "next/image";
import EventCalendar from "./EventCalendar";
import FormModal from "./FormModal";

const CalendarContainer = async () => {

    return (
        <div className="bg-white p-4 rounded-md">
            
            < EventCalendar />

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Events</h1>
                <Image src='/moreDark.png' width={20} height={20} alt="" />
                <FormModal table="schedule" type="create" />
            </div>
            <div className="flex flex-col gap-4">
                <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-slate-500 even:border-t-slate-50">
1. Tex.: React, Next, tailwind, typyscript, mongoose, moment, react-big-calendar, react-calendar
  2.Microservises:  clerk/nextjs, next-cloudinary

                </div>
            </div>
        </div>
    )
}

export default CalendarContainer;