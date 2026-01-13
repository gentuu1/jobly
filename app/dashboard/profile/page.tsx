"use client"
import ProfileNavbar from '@/app/component/ProfileNavbar'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaBookOpen, FaBuilding, FaInfoCircle, FaRegAddressBook, FaRegUser, FaUser } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { HiBookOpen, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineCog, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineUserGroup } from 'react-icons/hi'
import { HiOutlineBuildingOffice, HiOutlinePhoto } from 'react-icons/hi2'
import { MdAddCircleOutline } from 'react-icons/md'

const Page = () => {
    const [editbasic, seteditbasic] = useState(false)
    const [isEmployer, setisEmployer] = useState(true)   
   

    return (
        <div className='pb-20'>
            <ProfileNavbar />

            <div className='w-full px-5 mt-10'>
                <h1 className='lg:text-5xl md:text-5xl text-4xl font-bold tracking-tight'>Profile</h1>
                <hr className='w-full border-neutral-400 my-7' />

                <div className='w-full flex lg:flex-row md:flex-col flex-col lg:justify-between lg:gap-0 md:gap-7 gap-5 lg:items-center h-fit'>
                    <h1 className='lg:text-4xl md:text-4xl text-3xl font-bold tracking-tight'>Basic info</h1>
                    <button onClick={() => seteditbasic(true)} className='cursor-pointer  lg:py-4 lg:px-8 md:py-4  py-3 border rounded-4xl bg-transparent border-[#4B3BFF] text-[#4B3BFF] hover:text-[#3126af] lg:text-[15px] md:text-[22px] text-[20px] font-semibold transition-all duration-400 '>Add basic info</button>
                </div>

                <div
                    className={`${editbasic ? 'fixed' : 'hidden'} inset-0 bg-black/40 z-40`}
                    onClick={() => seteditbasic(false)}
                />

                <section className={`${editbasic ? 'fixed' : "hidden"} lg:w-2xl md:w-150 w-[90%] h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50`} >

                    <div className='w-full flex justify-between p-5 border-b border-neutral-400 shadow-sm z-50'>
                        <h2 className='text-[20px] font-bold'>Edit basic info</h2>
                        <Link href="" onClick={() => seteditbasic(false)}>
                            <p className='text-[#4B3BFF] text-[15px] font-semibold cursor-pointer hover:text-[#3126af]'>cancel</p>
                        </Link>
                    </div>

                    <div className='h-60 lg:h-50 w-full p-5 flex flex-col gap-2 overflow-y-scroll'>

                       <div className={`${isEmployer ? "block" : "hidden"}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-gray-600">Company Name</label>
                                    <input
                                        name="companyName"
                                        type="text"
                                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-600">Industry</label>
                                    <input
                                        name="industry"
                                        type="text"
                                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                    />


                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-gray-600">Company Size</label>
                                    <select
                                        name="companySize"
                                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                    >
                                        <option value="">Select size</option>
                                        <option value="1-10">1–10 employees</option>
                                        <option value="11-50">11–50 employees</option>
                                        <option value="51-200">51–200 employees</option>
                                        <option value="201-500">201–500 employees</option>
                                        <option value="500+">500+ employees</option>
                                    </select>

                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-600">Company Logo</label>
                                    <input
                                        type="file"
                                        name="companyLogo"
                                        className="border rounded-lg px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-2 file:text-sm file:font-medium file:text-indigo-600 hover:file:bg-indigo-100 hover:border-indigo-600"
                                    />
                                </div>
                            </div>


                            <hr className="my-4" />
                       </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-600">First Name</label>
                                <input
                                    name="firstname"
                                    type="text"
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                />
                                
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-600">Last Name</label>
                                <input
                                    name="lastname"
                                    type="text"
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-600">Phone</label>
                                <input
                                    name="phone"
                                    type="text"
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                />
                            </div>

                            <div className={`${isEmployer? "hidden" : "block"} flex flex-col`}>
                                <label className="text-gray-600">Photo</label>
                                <input
                                    type="file"
                                    name="photo"
                                    className="border rounded-lg px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-2 file:text-sm file:font-medium file:text-indigo-600 hover:file:bg-indigo-100 hover:border-indigo-600"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <label className="text-gray-600">Location</label>
                            <input
                                name="location"
                                type="text"
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600">Bio</label>
                            <textarea
                                name="bio"
                                rows={3}
                                placeholder="Write a short bio..."
                                className="border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                            />
                        </div>

                    </div>

                    <div className='w-full flex flex-col px-5 py-2 border-t  border-t-neutral-400 shadow-sm z-50'>
                        <button className='text-[20px] text-white py-3 bg-[#4B3BFF] rounded-3xl'>Save</button>
                    </div>

                </section>

                <section className=' w-full flex flex-col h-fit gap-2 lg:mt-5 md:mt-7 my-5'>

                    <div className='flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <FaRegUser className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`Azeez sodiq`}</p>
                        <Link onClick={()=>seteditbasic(true)} href=''>
                            <p className='hidden md:hidden lg:block text-[17px] ml-20 text-[#4B3BFF] font-bold cursor-pointer'> Add phone</p>
                        </Link>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlineBuildingOffice className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`Brightkey Limited`}</p>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlineBriefcase className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`Tech`}</p>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlineUserGroup className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`500+`}</p>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlinePhoto className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`Osun, Osogbo`}</p>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlinePhone className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`+1234567`}</p>
                    </div>



                    <div className='flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <HiOutlineLocationMarker className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`Osun, Osogbo`}</p>
                    </div>

                    <div className='lg:hidden md:flex flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <MdAddCircleOutline className='lg:text-[20px] md:text-[25px] text-[23px] text-[#4B3BFF]' />
                        <Link onClick={() => seteditbasic(true)} href=''>
                            <p className='text-[17px] md:text-[22px] text-[#4B3BFF] font-bold cursor-pointer'> Add phone</p>
                        </Link>
                    </div>

                    <div className='flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <HiOutlineBookOpen size={40} className='text-[25px] lg:text-[20px] md:text-[25px]' />
                        <p className=' lg:text-[15px] text-[17px] md:text-[22px]'>{`I am actively looking for new jobs and am open to all types of work experiences.`}</p>
                    </div>

                    <div className='flex items-center h-fit py-3'>
                        <p>
                            <span className='lg:text-[14px] text-[15px] md:text-[17px] font-bold text-[#53525E] mr-1'>
                                Looking to change your email?
                            </span>
                            <span className='lg:text-[14px] text-[15px] md:text-[17px]'>
                                You can edit it from the
                            </span>
                            <Link href='/dashboard/profile/pass&security'>
                                <span className='lg:text-[14px] text-[15px] md:text-[17px] font-bold text-[#4B3BFF] ml-1 cursor-pointer'>Password and Security Page</span>
                            </Link>
                        </p>

                    </div>


                    <div>
                        <button className='bg-[#C91737] text-white lg:text-[13px] text-[15px] md:text-[17px] font-semibold lg:py-3 lg:px-8 md:py-4 md:px-8 px-8 py-3.5  rounded-4xl cursor-pointer md:mt-5 lg:mt-5 mt-1'>
                            Close my account
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page
