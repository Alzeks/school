// import { SignIn } from '@clerk/nextjs'
// export default function Page() {
//   //return <SignIn afterSignOutUrl={'/list/teacher'}/>
//   return <SignIn />
// }

'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LoginPage = () => {
let { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    const role = user?.publicMetadata.role || ''  
    if (role) router.push(`/${role}`)
  })
 
  return (
    <div className='h-screen flex items-center justify-center bg-slate-100' > 
      <SignIn.Root >
        <SignIn.Step name='start' className='p-12 rounded-md flex flex-col gap-2'>
          <h1 className='text-xl font-bold flex items-center gap-2'>
            <Image src='/logo.png' alt='' width={24} height={24} />
            School
          </h1>
          <h2>Sign-in</h2>
          <Clerk.GlobalError className='text-sm text-red-500' />

          <Clerk.Field name='identifier' className='flex flex-col gap-2'>
            <Clerk.Label className='text-sm text-gray-400'>Username:admin | teacher | student</Clerk.Label>
            <Clerk.Input
              type='text'
              required
              placeholder='name'
              className='p-2 rounded-md ring-1 ring-gray-500'
            />
            <Clerk.FieldError className='text-sm text-red-500' />
          </Clerk.Field>

          <Clerk.Field name='password' className='flex flex-col gap-2'>
            <Clerk.Label className='text-sm text-gray-400'>Password:admin | teacher | student</Clerk.Label>
            <Clerk.Input
              type='text'
              required
              placeholder='password'
              className='p-2 rounded-md ring-1 ring-gray-500'
            />
            <Clerk.FieldError className='text-sm text-red-500' />
          </Clerk.Field>

          <SignIn.Action submit
            className='bg-blue-400 rounded-md p-2 text-white '>
            Sign-in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}

export default LoginPage;