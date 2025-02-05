'use client'

import { createTeacher, updateTeacher } from "@/lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import Pending from '@/components/loadings/Pending'
import { useEffect, useState } from "react";
import { handleClientScriptLoad } from "next/script";
import { useRouter } from 'next/navigation'


const StudentForm = ({ type, setOpen, id }:
  {
    type: 'create' | 'update' | 'delete', setOpen: any, id?: string
  }) => {
  const [state, formAction] = useFormState(
    type === 'create' ? createTeacher : updateTeacher, { saccess: '', error: '' }
  );

  const router = useRouter()
  const [img, setImg] = useState<any>('')

  if (state.saccess === 'Saccess') {
    console.log('if');
    setOpen(false)
    router.refresh()
  }

  const onSubmit = async (data: any) => {
    if (type === 'update') data.set('id', id)
    formAction(data);
  }

  useEffect(() => {
    if (state.saccess === 'Saccess') { console.log('refresh'); }
  }, [state])

  //const onSubmit = handleSubmit((data:any)=>{console.log(data)})//for hookForm

  return (
    <div className='' >
      <h2><span className=" font-bold ">{type}</span> a new student</h2>
      <form action={onSubmit} className="flex flex-col gap-4">

        <div className="md:flex justify-around mt-4">
          <div className="">
            <div>username</div>
            <input type="text" placeholder='username' name='username'
              className="border-b-2" />
          </div>

          <div >
            <div>password</div>
            <input type="text" placeholder="password" name="password"
              className=" border-b-2" />
          </div>
        </div>

        <div className="flex m-auto ">Other data</div>
        <div className="md:flex justify-around p-2 ">

          <div className="">
            <div>lastname</div>
            <input type="text" placeholder='lastname' name='lastname'
              className=" border-b-2 ring-gray-300" />
          </div>

          <div className="">
            <div>phone</div>
            <input type="text" placeholder="phone" name="phone"
              className=" border-b-2 ring-gray-300" />
          </div>
        </div>

        <div className="">
          <label className="">
            <Image src='/upload.png' width={28} height={28} alt=""></Image>
            <span>Upload photo</span>
          </label>
          <input type="file" id="img"></input>
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

export default StudentForm;