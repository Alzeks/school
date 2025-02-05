'use client'

//import { createTeacher} from "@/lib/actions";
import { createSubject } from "@/lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import Pending from '@/components/loadings/Pending'
import { useEffect, useState } from "react";
import { handleClientScriptLoad } from "next/script";
import { useRouter } from 'next/navigation'
import { fetchAllTeachers } from "@/lib/fetchDaata";

const SubjectForm = ({ type, setOpen, relatedData, id }:
  {
    type: 'create' | 'update' | 'delete', setOpen: any,
    relatedData: { id: string, username: string }[],
    id: any
  }
) => {
  const [state, formAction] = useFormState(createSubject, { saccess: '', error: '' });
  const router = useRouter()

  if (state?.saccess === 'Saccess') {
    setOpen(false)
    router.refresh()
  }

  const onSubmit = async (data: FormData) => {
    formAction(data);
  }

  useEffect(() => {
    if (state.saccess === 'Saccess') { console.log('refresh'); }
  }, [state])

  return (
    <div className='' >
      <h2>Create a new subject</h2>
      <form action={onSubmit} className="flex flex-col gap-4">

        <div className="md:flex justify-around ">
          <div className="">
            <div>subject</div>
            <input type="text" placeholder='subject' name='subject'
              className="border-b-2" />
          </div>

          <div className="">
            <div>Teachers</div>
            <select name="teacher" defaultValue={'on'} className="ring-slate-300 p-1 rounded-md ">
              <option className="" value='' key={1}>Pick Teachers</option>
              {relatedData?.map(item => <option value={item.username} key={item.username}>{item.username}</option>)}
            </select>
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

export default SubjectForm;