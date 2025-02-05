'use client'

//import {  teachersData } from "@/lib/data"
//import { create } from "domain"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import { deleteTeacher, deleteStudent, deleteSubject, deleteSchedule } from "@/lib/actions"
import dynamic from "next/dynamic"
import { FormModalType } from "@/lib/types"
//import { useFormState } from "react-dom"

const TeacherForm = dynamic(() => import('./forms/TeacherForm'), { loading: () => <h1>Loading..</h1> })
const StudentForm = dynamic(() => import('./forms/StudentForm'), { loading: () => <h1>Loading..</h1> })
const SubjectForm = dynamic(() => import('./forms/SubjectForm'), { loading: () => <h1>Loading..</h1> })
const ScheduleForm = dynamic(() => import('./forms/ScheduleForm'), { loading: () => <h1>Loading..</h1> })

//PICK WHOT WILL BE DELETED
const deleteAction = { teacher: deleteTeacher, student: deleteStudent, subject: deleteSubject, schedule: deleteSchedule }

const forms: {
    [key: string]:
    (type: 'create' | 'update' | 'delete', setOpen: Dispatch<SetStateAction<boolean>>, relatedData: any, id?: string | undefined) => JSX.Element;
} =
{
    teacher: (type, setOpen, relatedData, id) => <TeacherForm type={type} setOpen={setOpen} relatedData={relatedData} id={id} />,
    student: (type, setOpen, relatedData, id) => <StudentForm type={type} setOpen={setOpen} id={id} />,
    subject: (type, setOpen, relatedData, id) => <SubjectForm type={type} setOpen={setOpen} relatedData={relatedData} id={id} />,
    schedule: (type, setOpen, relatedData, id) => <ScheduleForm type={type} setOpen={setOpen} relatedData={relatedData} id={id} />,
}

const FormModal = ({ table, type, id, relatedData }:
    FormModalType & { relatedData?: unknown }) => {
    const [isOpen, setOpen] = useState(false)

    const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
    const bg = type === 'create'
        ? 'bg-yellow-400'
        : type === 'update'
            ? 'bg-slate-500'
            : 'bg-purple-500'

    const Form = ({ table, type, id, }: FormModalType) => {

        const handleDelete = () => { deleteAction[table](id) }
        //DELETE FORM
        return type === 'delete' && id ?
            <form action={handleDelete} className=" " >
                <div className="text-center font-medium my-4">Are yuo shure to {type}?</div>
                <button className="bg-red-700 text-white w-full p-2 rounded-md">Delete</button>
            </form> :
            //CREATE FORM
            (forms[table](type, setOpen, relatedData, id))

    }
    return (<>
        <button className={`flex items-center justify-center rounded-full ${bg} ${size} hover:bg-slate-400`}
            onClick={() => setOpen(true)}>
            <Image src={`/${type}.png`} width={16} height={16} alt="" />
        </button>
        {/* MODAL WINDOW */}
        {isOpen && (
            <div className='w-screen h-[100%] bg-black bg-opacity-60 absolute top-0 left-0 
            z-50 flex items-center justify-center' >
                <div className="w-[50%] md:w-[60%] lg:w-[70%] xl:w-[60%] bg-white 
                 p-4 rounded-md justify-center items-center relative ">
                    <div className="cursor-pointer absolute top-2 right-2"
                        onClick={() => setOpen(false)}>
                        <Image src='/close.png' width={16} height={16} alt="" />
                    </div >
                    <Form type={type} table={table} id={id} />
                </div>
            </div>
        )
        }
    </>
    )
}

export default FormModal;