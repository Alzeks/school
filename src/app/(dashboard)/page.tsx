import Image from "next/image"

const Homepage = () => {
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className="flex gap-[1px] my-16 md:gap-4">
        <Image src='/profile.png' width={35} height={35} alt=""></Image>
        <Image src='/search.png' width={35} height={35} alt=""></Image>
        <Image src='/message.png' width={35} height={35} alt=""></Image>
        <Image src='/announcement.png' width={35} height={35} alt=""></Image>
        <Image src='/sort.png' width={35} height={35} alt=""></Image>
        <Image src='/assignment.png' width={35} height={35} alt=""></Image>
        <Image src='/lesson.png' width={35} height={35} alt=""></Image>
        <Image src='/exam.png' width={35} height={35} alt=""></Image>
        <Image src='/setting.png' width={35} height={35} alt=""></Image>
      </div>
      <h1 className="flex items-center text-2xl md:text-5xl lg:text-7xl font-bold text-slate-800 mt-20">School management</h1>
    </div>
  )
}

export default Homepage