export type UserT = {
  id: string, username: string, phone?: string, lastname: string,
  address?: string, img: string, subject: string
}

export type subjectT = { id: string, img: string, subject: string }

export type FormModalType = {
  table: 'teacher' | 'student' | 'subject' | 'schedule',
  type: 'create' | 'update' | 'delete',
  id?: string | undefined
  //relatedData?: any
}
