'use client'

import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import moment from 'moment'
//import { calendarEvents } from '@/lib/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation';


const localizer = momentLocalizer(moment)

const BigCalendar = () => {
     const searchParams = useSearchParams()
      
     const day: any  = searchParams.get('date')?.slice(8, 10)//way to get dey
     let d: any = day ? parseInt(day) : new Date().getDate()
     let m: any =  new Date().getMonth()

     const myEv = [{
          title: "History",
          //allDay: false,
          start: new Date(2025, m, d, 14, 0),
          end: new Date(2025, m, d, 14, 45),
          desc: 'desc'
     },
     {
          title: "Math",
          allDay: false,
          start: new Date(2025, 0, 31, 13, 0),
          end:   new Date(2025, 0, 31, 13, 45),
     },
     ]
     
     const [view, setView] = useState<View>(Views.WORK_WEEK)
     const handleView = (selectedView: View) => { setView(selectedView) }
     return (
          <div className="">
               <Calendar
                    localizer={localizer}
                    events={myEv}
                    startAccessor='start'
                    endAccessor='end'
                    views={["work_week", "day", "agenda"]}
                    view={view}
                    style={{ height: '98%' }}
                    onView={handleView}
                    min={new Date(2024, 1, 0, 8, 0, 0)}
                    max={new Date(2024, 1, 0, 17, 0, 0)} 
                    
               />
          </div>
     )
}

export default BigCalendar;