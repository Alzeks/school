
import { UserButton, UserProfile } from "@clerk/nextjs";
import { currentUser, User } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const user = await currentUser()//for server
  
  return (
    <div className='flex w-[100%] items-center p-4 justify-between border-2 ' >
      {/* LEFT */}
      <div className="hidden md:flex items-center justify-center gap-2 rounded-full ring-[1.5px] ring-gray-300 p-2 ">
        <Image src='/search.png' width={24} height={24} alt="" />
        <input type='text' placeholder="emty search"
          className="w-[200px] outline-none bg-transparent" />
      </div>
      {/* Right */}
      <div className="flex items-center gap-6 px-2">
        <div className="bg-white flex justify-center items-center rounded-full w-7 h-7">
          <Image src='/message.png' width={20} height={20} alt="" />
        </div>
        <div className="bg-white flex justify-center items-center rounded-full w-7 h-7 relative">
          <Image src='/announcement.png' width={20} height={20} alt="" />
          <div className="absolute -top-3 -right-2 rounded-full w-5 h-5 bg-purple-500 text-white flex justify-center items-center">1</div>
        </div>
        <Link  href={`/${user?.publicMetadata.role}`}className="flex flex-col ">
          <div className="">Hello: {user?.username}</div>
          <div className="">to<span className="font-bold rounded-md hover:bg-slate-50"> {user?.publicMetadata.role as string}</span> page</div>
        </Link>
        <div className="">
          {user ? 
          <UserButton afterSwitchSessionUrl="" /> 
          :
          <div className="flex gap-2 items-center">
            <Link href='/sign-in' >Sign-in</Link>
            <Image src='/avatar.png' width={30} height={30} alt="" className="rounded-full" />
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;