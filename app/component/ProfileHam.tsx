"use client"

import Link from "next/link"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import { logOut } from "../utils/actions"

type Props = {
    firstname: string
    lastname: string
    isEmployer : boolean | null
}

const ProfileHam = ({
    lastname,
    firstname,
    isEmployer
}:Props) => {
    const [openMenu, setopenMenu] = useState(false)

    const OpenMenuBar = () => {
        if (!openMenu) {
            setopenMenu(true)
        } else {
            setopenMenu(false)
        }
    }

    const loGout =async()=>{
        const res = await logOut()
    }
    return (
        <div>
            <div>
                <FaBars onClick={OpenMenuBar} className='text-2xl' />

                <div className={`${openMenu ? 'fixed  top-0 right-0' : 'hidden'} w-full h-full lg:w-96 lg:h-full md:w-xl md:h-9/12 md:shadow-2xl lg:shadow-2xl md:rounded-b-4xl lg:rounded-bl-2xl lg:rounded-br-none bg-white z-50 `}>
                    <div className='shadow-sm h-fit w-full flex gap-3 items-center px-5 py-5 bg-[#F9F9FA] mb-5'>
                        <p className='h-18 lg:h-15 md:h-20 md:w-20 lg:w-15  w-18 bg-[#E6E6FA] text-[#4B3BFF] text-3xl lg:text-2xl font-bold rounded-[100%] text-center content-center cursor-pointer'>{(firstname && lastname)
                            ? `${firstname[0].toUpperCase()}${lastname[0].toUpperCase()}`
                            : ''}</p>
                        <h3 className="text-2xl md:text-[28px] lg:text-[20px] font-bold ">{`${firstname} ${lastname}`}</h3>
                        <FaTimes onClick={OpenMenuBar} className='text-2xl lg:text-[20px] ml-auto cursor-pointer' />
                    </div>

                    <div className='h-fit w-full  flex flex-col gap-5 lg:gap-2'>
                        <Link href='/dashboard/profile' className='text-[20px] md:text-[25px] lg:text-[15px] font-semibold ml-5'>Profile</Link>
                        <Link href='/dashboard' className='text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5'>Dashboard</Link>
                        <Link href='/dashboard/applications' className={`${isEmployer ? 'hidden' : 'block'} text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5 `}>Applications</Link>
                        <Link href='/dashboard/applicants' className={`${isEmployer ? 'block' : 'hidden'} text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5 `}>Applicant</Link>
                        <Link href='/dashboard/postedjobs' className={`${isEmployer ? 'block' : 'hidden'} text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5 `}>Posted jobs</Link>
                        <Link href='/dashboard/savedjobs' className={`${isEmployer ? 'hidden' : 'block'} text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5 `}>Saved jobs</Link>
                        <hr className="w-full border-neutral-300 my-5" />
                        <Link href='/dashboard/profile/pass&security' className='text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5'>Password & security</Link>
                        <Link href='' className='text-[20px] font-semibold md:text-[25px] lg:text-[15px] ml-5'>Contact us</Link>
                    </div>



                    <div className="h-20 mt-36 md:mt-20 lg:mt-20 pl-5">
                        <button onClick={()=>loGout()} className='border border-indigo-600 text-indigo-600  hover:bg-indigo-50 w-[95%] py-4 lg:py-3 font-semibold rounded-full text-[20px] lg:text-[15px]'>
                            Log out
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileHam