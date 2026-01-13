"use client"
import Link from 'next/link'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'


const Navbar = () => {
    const [openMenu, setopenMenu] = useState(false)

    const OpenMenuBar = () => {
        if (!openMenu) {
            setopenMenu(true)
        } else {
            setopenMenu(false)
        }
    }
    return (
        <div>
            <nav className="sticky top-0 z-50 w-full h-30 md:h-36 lg:w-screen lg:h-20 flex justify-between  items-center bg-white px-5 lg:px-10 shadow-sm">
                <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                    Workly
                </h1>


                <div className=" items-center hidden md:flex lg:flex md:gap-4 lg:gap-5 md:ml-10 lg:ml-70 lg:w-200 md:w-150 justify-end  ">
                    <Link href="/employers" className=" text-gray-700 md:text-2xl  hover:text-indigo-600 font-medium">
                        Employers
                    </Link>

                    <Link href="/jobs" className=" text-gray-700 md:text-2xl hover:text-indigo-600 font-medium ">
                        Find Jobs
                    </Link>

                    <Link href="/signin">
                        <button className="lg:px-5 lg:py-2 px-5 py-3 text-sm md:text-lg font-semibold border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300">
                            Sign In
                        </button>
                    </Link>

                    <Link href="/signup">
                        <button className="lg:px-5 lg:py-2 px-5 py-3 text:sm md:text-lg font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300">
                            Get Started
                        </button>
                    </Link>
                </div>

                <div className='md:hidden lg:hidden block border'>
                    <FaBars onClick={OpenMenuBar} className='text-2xl' />

                    <div className={`${openMenu ? 'fixed  top-0 right-0' : 'hidden'} w-full h-full bg-white z-50 pt-5`}>
                        <div className='h-20 w-full flex justify-between items-center px-5'>
                            <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                                Workly
                            </h1>

                            <FaTimes onClick={OpenMenuBar} className='text-3xl' />
                        </div>

                        <div className=' h-150 w-full p-5 flex flex-col gap-5'>
                            <Link href='' className='text-2xl font-semibold'>Employers</Link>
                            <Link href='' className='text-2xl font-semibold'>Contact us</Link>
                            <Link href='' className='text-2xl font-semibold'>Help Center</Link>
                            <Link href='/' className='text-2xl font-semibold mb-10'>Home</Link>

                            <Link href='/signup'>
                                <button className='bg-indigo-600 hover:bg-indigo-700 w-[95%] py-5 font-semibold rounded-full mt-40 text-white text-[20px] m-auto'>
                                    Create an account
                                </button>
                            </Link>

                            <Link href='/signin'>
                                <button className='border border-indigo-600 text-indigo-600  hover:bg-indigo-50 w-[95%] py-5 font-semibold rounded-full text-[20px] m-auto'>
                                    Log in
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar