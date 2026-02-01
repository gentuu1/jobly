"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBriefcase, FaRegHeart } from "react-icons/fa";
import { HiOutlineHome, HiOutlineSearch } from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { proFile } from "../utils/actions";

export default function MailLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname()
    
    const [isEmployer, setisEmployer] = useState<boolean | null>(null)
    
    useEffect(()=>{
        const isEmp = async()=>{
            const {isEmployer} = await proFile()

            setisEmployer(isEmployer)
        }
        isEmp()
    }, [])

    // if (isEmployer === null) {
    //     return null;
    // }


   
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <div className="">
                {children}
            </div>

        {
            isEmployer !== null && (

                    <div className="z-50 fixed bottom-0 bg-white flex lg:hidden  h-20 md:h-25 w-full justify-between md:px-20 px-5 items-center ">
                        <Link
                            className={`text-3xl md:text-5xl ${pathname === '/dashboard' && 'text-[#4B3BFF]'}`}
                            href='/dashboard'>
                            <HiOutlineHome />
                        </Link>
                        {
                            !isEmployer && (
                                <Link
                                    className={`text-3xl md:text-5xl ${pathname === '/dashboard/searchjob' && 'text-[#4B3BFF]'}`}
                                    href='/dashboard/searchjob'>
                                    <HiOutlineSearch />
                                </Link>
                            )
                        }

                        {
                            !isEmployer && (
                                <Link className={`text-3xl md:text-5xl ${pathname === '/dashboard/jobs' ? 'text-[#4B3BFF]' : ''}`} href='/dashboard/jobs'>
                                    <FaBriefcase />
                                </Link>
                            )
                        }

                        {
                            !isEmployer && (
                                <Link className={`text-3xl md:text-5xl ${pathname === '/dashboard/savedjobs' ? 'text-[#4B3BFF]' : ''}`} href='/dashboard/savedjobs'>
                                    <FaRegHeart />
                                </Link>
                            )
                        }

                        <Link className={`text-3xl md:text-5xl ${pathname === '/dashboard/profile' ? 'text-[#4B3BFF]' : ''}`} href='/dashboard/profile'>
                            <HiOutlineUserCircle />
                        </Link>
                    </div>
            )
        }

        </div>
    );
}