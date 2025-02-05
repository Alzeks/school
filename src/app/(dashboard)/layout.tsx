import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex  ">
      {/* LEFT PART */}
      <div className="w-[15%] min-w-[160px] p-2 bg-slate-50">
        <Link className='flex justify-center items-center gap-2' href='/'>
        <Image src='/logo.png' width={32} height={32} alt="im"/>
        <span className="hidden lg:block">School</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT PART */}
      <div className="w-[85%] bg-slate-200 ">
        <Navbar />
        <div className=''>{children}</div>
      </div>
    </div>
  );
}
