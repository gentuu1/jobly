"use client";
import { useEffect, useState } from 'react';
import ProfileHam from './ProfileHam'
import { FaRegBell, FaSearch } from 'react-icons/fa'
import { proFile } from '../utils/actions';

const ProfileNavbar = () => {

    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [isEmployer, setisEmployer] = useState<boolean | null>(null)

    const profile = async () => {
        const result = await proFile()

        setfirstname(result?.firstname)
        setlastname(result.lastname)
        setisEmployer(result.isEmployer)
    }

    useEffect(()=>{
        profile()
    },[])

    if(isEmployer === null){
        return <nav className='w-full bg-white shadow-sm p-10 h-30 content-center'>
            <h1 className="text-3xl md:text-5xl lg:text-[35px] font-extrabold text-indigo-600 tracking-tight">
                Workly
            </h1>
        </nav>
    }

    
    return (
        <div>
            <nav className='  h-fit pb-5 lg:h-30  w-full gap-5 items-center flex flex-col sticky top-0 shadow-sm z-50 bg-white'>
                <div className=' flex h-30 w-full gap-5 items-center p-5 md:pl-10 justify-between'>
                    <h1 className="text-3xl md:text-5xl lg:text-[35px] font-extrabold text-indigo-600 tracking-tight">
                        Workly
                    </h1>

                    {
                        !isEmployer  && (
                            <form className='border lg:w-[45%] lg:h-12 h-15 md:h-16 hidden md:hidden lg:flex lg:gap-5 rounded-full items-center'>
                                <input
                                    type="text"
                                    placeholder='Search'
                                    className='pl-5 h-full lg:w-[85%] md:w-[85%]  lg:mr-4  outline-0  text-3xl lg:text-[15px] font-semibold placeholder:text-2xl lg:placeholder:text-[15px]'
                                />

                                <button type='submit' className='h-15 flex w-15 lg:h-12 lg:w-12 rounded-full justify-center items-center text-white font-bold lg:text-2xl text-3xl border bg-[#4B3BFF] '><FaSearch /></button>
                            </form>
                        )
                    }

                    <div className=' w-45 md:w-50 lg:w-40 lg:h-15 h-18 flex items-center gap-5 '>
                        <p className='h-17 lg:h-15 lg:w-15  w-17 bg-[#E6E6FA] text-[#4B3BFF] text-2xl lg:text-2xl font-bold rounded-[100%] capitalize text-center content-center cursor-pointer'>{firstname[0]}</p>
                        <FaRegBell className='size-8 md:size-10 lg:size-8' />
                        < ProfileHam firstname={firstname} lastname={lastname} isEmployer={isEmployer}/>
                    </div>
                </div>

                {
                    !isEmployer && (
                        <form className='border w-[90%] md:w-[70%] h-14 md:h-16 flex lg:hidden gap-3 md:gap-5 rounded-full items-center'>
                            <input
                                type="text"
                                placeholder='Search'
                                className='pl-5 h-full w-[80%] md:w-[85%]  mr-0 md:mr-8 outline-0  text-3xl font-semibold placeholder:text-2xl'
                            />

                            <button type='submit' className='h-15 flex w-15 rounded-full justify-center items-center text-white font-bold text-3xl border bg-[#4B3BFF] '><FaSearch /></button>
                        </form>
                    )
                }
            </nav>
        </div>
    )
}

export default ProfileNavbar
