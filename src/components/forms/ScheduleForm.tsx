'use client'

import { createSchedule, createTeacher, updateSchedule, updateTeacher,  } from "@/lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import Pending from '@/components/loadings/Pending'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { scheduler } from "node:timers/promises";

const classes = ['7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b', '11a', '11b'];
const days = ['monday', 'tuesdey', 'wednesday', 'thursday', 'friday']
const subjects = ['math', 'art', 'english', 'physics', 'history', 'biology', 'geography']

const ScheduleForm = ({ type, setOpen, relatedData, id }:
  {
    type: 'create' | 'update' | 'delete',
    setOpen: Dispatch<SetStateAction<boolean>>,
    relatedData: { id: string, subject: string }[], id: any
  }
) => {//?

   const [state, formAction] = useFormState(
      type === 'create' ? createSchedule : updateSchedule, { saccess: '', error: '' }
    );
    const [img, setImg] = useState<any>('')
    const router = useRouter()
  
    if (state.saccess === 'Saccess') {
      setOpen(false)
      router.refresh()
    }

  const onSubmit = async (data: FormData) => {
    if (type === 'update') data.set('id', id)
    //data.set('img', img.secure_url ? img.secure_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/433px-Macaca_nigra_self-portrait_large.jpg'
    formAction(data);
  }

  useEffect(() => {
    if (state.saccess === 'Saccess') { console.log('refresh useEffect'); }
  }, [state])

  return (
    <div className='' >
      <div className="flex">
        <h2>{type === 'create' ? 'Create' : 'Update'} a schedual</h2>
      </div>
      <form action={(e) => onSubmit(e)} className="flex flex-col gap-4 mt-4">

        <div>
          <div className="xl:flex justify-around ">

            <div className="">
              <div>StartTime</div>
              <input type="text" placeholder='start time' name='startTime'
                className=" border-b-2 ring-gray-300" />
            </div>

            <div className="">
              <div>EndTime</div>
              <input type="text" placeholder="end time" name="endTime"
                className=" border-b-2 ring-gray-300" />
            </div>
          </div>

          <div className="flex justify-around mt-4">
            <div className="">
              <div>Class</div>
              <select name="clas" defaultValue={'on'} className="ring-slate-300 p-1 rounded-md ">
                <option value='' key='empty'>Choose class</option>
                {classes?.map(item => <option value={item} key={item}>{item}</option>)}
              </select>
            </div>
            <div className="">
              <div>Subject</div>
              <select name="subject" defaultValue={'on'} className="ring-slate-300 p-1 rounded-md ">
                <option value='' key='empty'>Choose subject</option>
                {subjects?.map(item => <option value={item} key={item}>{item}</option>)}
              </select>
            </div>
            <div className="">
              <div>Day</div>
              <select name="day" defaultValue={'on'} className="ring-slate-300 p-1 rounded-md ">
                <option value='' key='empty'>Choose day</option>
                {days?.map(day => <option value={day} key={day}>{day}</option>)}
              </select>
            </div>

          </div>
        </div>
        {state.error && <span className="text-red-500  text-sm">{state.error}err</span>}
        {state.saccess && <span className="text-green-500  text-sm mx-auto">{state.saccess}</span>}

        <button type='submit' className="bg-blue-500 w-full text-white rounded-md p-2">
          <div className="flex justify-center items-center gap-4">
            <div>{type === 'create' ? 'Create' : 'Update'}</div> <Pending />
          </div>
        </button>

      </form>
    </div>
  )
}

export default ScheduleForm;