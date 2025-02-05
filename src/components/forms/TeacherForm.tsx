'use client'
//WAY going render by TeacherForm and list/teachers
import { createTeacher, updateTeacher } from "@/lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import Pending from '@/components/loadings/Pending'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary';
import { fetchSubjects } from "@/lib/fetchDaata";

const TeacherForm = ({ type, setOpen, relatedData, id }:
  {
    type: 'create' | 'update' | 'delete',
    setOpen: Dispatch<SetStateAction<boolean>>, relatedData: { id: string, subject: string }[], id: any
  }) => {//?
  //const [subjects, setSubjects] = useState([])
  const [state, formAction] = useFormState(
    type === 'create' ? createTeacher : updateTeacher, { saccess: '', error: '' }
  );
  const [img, setImg] = useState<any>('')
  const router = useRouter()

  if (state.saccess === 'Saccess') {
    setOpen(false)
    router.refresh()
  }

  const onSubmit = async (data: FormData) => {
    if (type === 'update') data.set('id', id)
    // data.set('img', img ? img.secure_url  : '') //production
    data.set('img', img.secure_url ? img.secure_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Macaca_nigra_self-portrait_large.jpg/433px-Macaca_nigra_self-portrait_large.jpg')
    formAction(data);
  }

  useEffect(() => {
    if (state.saccess === 'Saccess') { console.log('refresh useEffect'); }
  }, [state])
  //const onSubmit = handleSubmit((data:any)=>{console.log(data)})//for hookForm
  return (
    <div className='' >
      <h2>{type === 'create' ? 'Create a new teacher' : 'Update teacher'}</h2>
      <form action={(e) => onSubmit(e)} className="flex flex-col gap-4 mt-4">


        <div className="md:flex justify-around ">
          <div className="">
            <div>Teacher name</div>
            <input type="text" placeholder='username' name='username'
              className="border-b-2" />
          </div>
          <div className="">
            <div>password</div>
            <input type="text" placeholder='password' name='password'
              className="border-b-2" />
          </div>
          <div className="">
            <div>Subject</div>
            <select name="subject" defaultValue={'on'}
              className="ring-slate-300 p-1 rounded-md ">
              {relatedData?.map(item => <option value={item.subject} key={item.subject}>{item.subject}</option>)}

            </select>
          </div>
        </div>

        <div>so on</div>
        <div className="md:flex justify-around items-center p-2 ">
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
          <div className="mt-8">
            <CldUploadWidget uploadPreset="school" onSuccess={(result, { widget }) => {
              setImg(result.info)
              widget.close()
            }}>
              {({ open }) => {
                return (
                  <div onClick={() => open()}>Choos your photo
                    <Image src='/upload.png' width={28} height={28} alt=""></Image>
                  </div>
                )
              }}
            </CldUploadWidget>
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

export default TeacherForm;