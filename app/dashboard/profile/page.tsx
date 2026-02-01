"use client"
import ProfileNavbar from '@/app/component/ProfileNavbar'
import { deleteDp, deletePro, editBasic, fullProfile } from '@/app/utils/actions'
import { useFormik } from 'formik'
import * as yup from "yup"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react'
import { FaBookOpen, FaBuilding, FaInfoCircle, FaRegAddressBook, FaRegUser, FaUser } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { HiBookOpen, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineCog, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineUserGroup } from 'react-icons/hi'
import { HiOutlineBuildingOffice, HiOutlinePhoto } from 'react-icons/hi2'
import { MdAddCircleOutline } from 'react-icons/md'
import Spinner from '@/app/component/Spinner'
import { toast } from 'react-toastify'

const Page = () => {
    const [isLoading, setisLoading] = useState(true)
    const [editbasic, seteditbasic] = useState(false)
    const [isEmployer, setisEmployer] = useState<boolean | null>(null)
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [photo, setphoto] = useState('')
    const [companyName, setcompanyName] = useState('')
    const [industry, setindustry] = useState('')
    const [companyLogo, setcompanyLogo] = useState('')
    const [companySize, setcompanySize] = useState('')
    const [phone, setphone] = useState('')
    const [location, setlocation] = useState('')
    const [bio, setbio] = useState('')
    const router = useRouter()
    const [showdelete, setshowdelete] = useState(false)
    const [openCloseAcc, setopenCloseAcc] = useState(false)

    const [ispending, startTransition] = useTransition()

    const fullprofile = async () => {
        const result = await fullProfile()

        setisEmployer(result?.isEmployer)
        setfirstname(result?.firstname)
        setlastname(result?.lastname)
        setphoto(result?.photo)
        setcompanyName(result?.companyName)
        setindustry(result?.industry)
        setcompanyLogo(result?.companyLogo)
        setcompanySize(result?.companySize)
        setphone(result?.phone)
        setlocation(result?.location)
        setbio(result?.bio)


        formik.setValues({
            isEmployer: result?.isEmployer,
            companyName: result?.companyName || '',
            industry: result?.industry || '',
            companySize: result?.companySize || '',
            companyLogo: result?.companyLogo || '',
            firstname: result?.firstname || '',
            lastname: result?.lastname || '',
            photo: result?.photo || '',
            phone: result?.phone || '',
            location: result?.location || '',
            bio: result?.bio || ''
        })

        setisLoading(false)
    }

    useEffect(() => {

        fullprofile()
    }, []);

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            formik.setFieldValue("photo", photo)
            return
        };

        const reader = new FileReader();
        reader.onloadend = () => {
            const photobase64 = reader.result as string
            formik.setFieldValue("photo", photobase64)
        }
        reader.readAsDataURL(file)
    };

    const handlecompanyLogo = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            formik.setFieldValue("companyLogo", companyLogo)
            return
        };

        const reader = new FileReader();
        reader.onloadend = () => {
            const photobase64 = reader.result as string
            formik.setFieldValue("companyLogo", photobase64)
        }
        reader.readAsDataURL(file)
    };

    const formik = useFormik({
        initialValues: {
            isEmployer: false,
            companyName: '',
            industry: '',
            companySize: '',
            companyLogo: '',
            firstname: '',
            lastname: '',
            photo: '',
            phone: '',
            location: '',
            bio: ''

        },
        onSubmit: (values) => {
            startTransition(async () => {
                const result = await editBasic({ ...values })

                if (!result.success) {
                    router.push('/signin')
                    return;
                }
                toast.success(result.message, {
                    autoClose: 2000
                })

                fullprofile()
                seteditbasic(false)

            })

        },

        validationSchema: yup.object({

            companyName: yup.string().when("isEmployer", {

                is: true,
                then: (schema) => schema.required("Required"),
                otherwise: (schema) => schema.notRequired(),
            }),

            industry: yup.string().when("isEmployer", {
                is: true,
                then: (schema) => schema.required("Required"),
                otherwise: (schema) => schema.notRequired(),
            }),

            companySize: yup.string().when("isEmployer", {

                is: true,
                then: (schema) => schema.required("Required"),
                otherwise: (schema) => schema.notRequired(),
            }),

            firstname: yup.string().required("Required"),
            lastname: yup.string().required("Required"),
        })
    });

    const showDelete = () => {
        const activeimage = isEmployer ? companyLogo : photo
        if (!activeimage) {
            return;
        } else {
            if (showdelete) {
                setshowdelete(false)
            } else {
                setshowdelete(true)
            }
        }
    }

    const delPropic = () => {
        startTransition(async () => {
            const result = await deleteDp()

            if (!result.success) {
                toast.error(result.message, {
                    autoClose: 2000
                })
                return;
            }
            fullprofile()
            toast.success(result.message, {
                autoClose: 2000
            })
            setshowdelete(false)

        })
    }

    const closebasic = () => {
        seteditbasic(false)
        fullprofile()
    }

    const deleteProfile = ()=>{
        try {
            startTransition(async()=>{
                const res = await deletePro()

                if(!res.success){
                    toast.error(res.message, {
                        autoClose : 2000
                    })

                    return;
                }

                toast.success(res.message, {
                    autoClose : 2000
                })

                router.push('/signin')
            })
        } catch (error) {
            console.log("something went wrong", error)
        }
    }


    if (isLoading) {
        return (
            <>
                <ProfileNavbar />
                <Spinner />
            </>
        )
    }

    return (
        <div className='pb-20 md:pb-25'>
            <ProfileNavbar />

            <div className=' w-full px-5 mt-10'>

                <div className='flex justify-between w-full items-center pr-5'>
                    <h1 className='lg:text-5xl md:text-5xl text-4xl font-bold tracking-tight'>Profile</h1>

                    <div className=' flex flex-col items-center'>
                        <Image
                            onClick={() => showDelete()}
                            src={companyLogo || '/img/profileimage.jpg'}
                            alt='companyLogo'
                            height={500}
                            width={500}
                            loading="eager"
                            className={`cursor-pointer h-15 w-15 object-cover rounded-full ${isEmployer ? 'block' : 'hidden'}`}
                        />

                        <Image
                            onClick={() => showDelete()}
                            src={photo || '/img/profileimage.jpg'}
                            alt='companyLogo'
                            height={500}
                            width={500}
                            loading="eager"
                            className={`cursor-pointer h-15 w-15 object-cover rounded-full ${isEmployer ? 'hidden' : 'block'}`}
                        />

                        <button onClick={() => delPropic()} className={` ${showdelete ? 'block' : 'hidden'} cursor-pointer border px-3 py-2 bg-red-500 text-white rounded`}>
                            {
                                ispending ? 'deleting...' : 'Delete'
                            }
                        </button>

                        {/* {showdelete && (
                            <button
                                className='fixed top-0 right-0 border px-3 py-2 bg-red-500 text-white rounded'
                                onClick={() => console.log("Delete clicked")}
                            >
                                Delete
                            </button>
                        )} */}
                    </div>
                </div>


                <hr className='w-full border-neutral-400 my-7' />

                <div className='w-full flex lg:flex-row md:flex-col flex-col lg:justify-between lg:gap-0 md:gap-7 gap-5 lg:items-center h-fit'>
                    <h1 className='lg:text-4xl md:text-4xl text-3xl font-bold tracking-tight'>Basic info</h1>
                    <button onClick={() => seteditbasic(true)} className='cursor-pointer  lg:py-4 lg:px-8 md:py-4  py-3 border rounded-4xl bg-transparent border-[#4B3BFF] text-[#4B3BFF] hover:text-[#3126af] lg:text-[15px] md:text-[22px] text-[20px] font-semibold transition-all duration-400 '>Add basic info</button>
                </div>

                <div
                    className={`${editbasic ? 'fixed' : 'hidden'} inset-0 bg-black/40 z-30`}
                    onClick={() => closebasic()}
                />

                <section className={`${editbasic ? 'fixed' : "hidden"} lg:w-2xl md:w-150 w-[90%] h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50`} >

                    <div className='w-full flex justify-between p-5 border-b border-neutral-400 shadow-sm z-50'>
                        <h2 className='text-[20px] font-bold'>Edit basic info</h2>
                        <Link href="" onClick={() => closebasic()}>
                            <p className='text-[#4B3BFF] text-[15px] font-semibold cursor-pointer hover:text-[#3126af]'>cancel</p>
                        </Link>
                    </div>

                    <div className='h-60 lg:h-50 w-full p-5 flex flex-col gap-2 overflow-y-scroll'>

                        <div className={`${isEmployer ? "block" : "hidden"}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-gray-600">Company Name</label>
                                    <input
                                        value={formik.values.companyName}
                                        onChange={formik.handleChange}
                                        name="companyName"
                                        type="text"
                                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                    />
                                    {
                                        formik.errors.companyName && (
                                            <small className='text-red-500 text-lg'>{formik.errors.companyName}</small>
                                        )
                                    }
                                </div>


                                <div className="flex flex-col">
                                    <label className="text-gray-600">Industry</label>
                                    <input
                                        value={formik.values.industry}
                                        onChange={formik.handleChange}
                                        name="industry"
                                        type="text"
                                        className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                    />
                                    {
                                        formik.errors.industry && (
                                            <small className='text-red-500 text-lg'>{formik.errors.industry}</small>
                                        )
                                    }

                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-gray-600">Company Size</label>
                                    <select
                                        value={formik.values.companySize}
                                        onChange={formik.handleChange}
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
                                    {
                                        formik.errors.companySize && (
                                            <small className='text-red-500 text-lg'>{formik.errors.companySize}</small>
                                        )
                                    }
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-gray-600">Company Logo</label>
                                    <input
                                        onChange={handlecompanyLogo}
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
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    name="firstname"
                                    type="text"
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                />
                                {
                                    formik.errors.firstname && (
                                        <small className='text-red-500 text-lg'>{formik.errors.firstname}</small>
                                    )
                                }

                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-600">Last Name</label>
                                <input
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    name="lastname"
                                    type="text"
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                />
                                {
                                    formik.errors.lastname && (
                                        <small className='text-red-500 text-lg'>{formik.errors.lastname}</small>
                                    )
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-600">Phone</label>
                                <input
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    name="phone"
                                    type='text'
                                    className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                                />
                            </div>

                            <div className={`${isEmployer ? "hidden" : "block"} flex flex-col`}>
                                <label className="text-gray-600">Profile</label>
                                <input
                                    // value={formik.values.photo}
                                    onChange={handlePhoto}
                                    type="file"
                                    name="photo"
                                    className="border rounded-lg px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-2 file:text-sm file:font-medium file:text-indigo-600 hover:file:bg-indigo-100 hover:border-indigo-600"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <label className="text-gray-600">Location</label>
                            <input
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                name="location"
                                type="text"
                                placeholder='e.g.  osogbo, osun'
                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600">Bio</label>
                            <textarea
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                name="bio"
                                rows={3}
                                placeholder="Write a short bio..."
                                className="border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 hover:border-indigo-600"
                            />
                        </div>

                    </div>

                    <div className='w-full flex flex-col px-5 py-2 border-t  border-t-neutral-400 shadow-sm z-50'>
                        <button type='button' onClick={() => formik.handleSubmit()} className='text-[20px] text-white py-3 bg-[#4B3BFF] rounded-3xl z-50'>
                            {ispending ? "saving changes..." : "save"}
                        </button>
                    </div>

                </section>

                <section className={`${isEmployer === null && 'hidden'} w-full flex flex-col h-fit gap-2 lg:mt-5 md:mt-7 my-5`}>

                    <div className='flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <FaRegUser className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`${firstname || ''}  ${lastname || ''}`}</p>
                        <Link onClick={() => seteditbasic(true)} href=''>
                            <p className={`${phone && 'lg:hidden'} hidden md:hidden lg:block text-[17px] ml-20 text-[#4B3BFF] font-bold cursor-pointer`}> Add phone</p>
                        </Link>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlineBuildingOffice className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`${companyName || ''}`}</p>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlineBriefcase className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`${industry || ''}`}</p>
                    </div>

                    <div className={`${isEmployer ? "flex" : "hidden"} items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlineUserGroup className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='capitalize lg:text-[15px] text-[17px] md:text-[22px]'>{`${companySize}`}</p>
                    </div>

                    <div className={`flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <HiOutlinePhone className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className=' lg:text-[15px] text-[17px] md:text-[22px]'>{`${phone || 'Add your phone number'}`}</p>
                    </div>

                    <div className='flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <HiOutlineLocationMarker className='lg:text-[20px] text-[23px] md:text-[25px]' />
                        <p className='lg:text-[15px] text-[17px] md:text-[22px]'>{`${location || 'Your location will appear here once set'}`}</p>
                    </div>

                    <div className={`${phone && 'hidden md:hidden'} lg:hidden md:flex flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3`}>
                        <MdAddCircleOutline className='lg:text-[20px] md:text-[25px] text-[23px] text-[#4B3BFF]' />
                        <Link onClick={() => seteditbasic(true)} href=''>
                            <p className={`text-[17px] md:text-[22px] text-[#4B3BFF] font-bold cursor-pointer`}> Add phone</p>
                        </Link>
                    </div>

                    <div className='flex items-center lg:gap-2 gap-3 md:gap-3 h-fit py-3'>
                        <HiOutlineBookOpen size={40} className='text-[25px] lg:text-[20px] md:text-[25px]' />
                        <p className=' lg:text-[15px] text-[17px] md:text-[22px]'>{`${bio || "No bio yet"}`}</p>
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
                        <button onClick={() => setopenCloseAcc(true)} className='bg-[#C91737] text-white lg:text-[13px] text-[15px] md:text-[17px] font-semibold lg:py-3 lg:px-8 md:py-4 md:px-8 px-8 py-3.5  rounded-4xl cursor-pointer md:mt-5 lg:mt-5 mt-1'>
                            Close my account
                        </button>
                    </div>

                    {openCloseAcc && (
                        <>

                            <div
                                className="fixed inset-0 bg-black/50 z-40"
                                onClick={() => setopenCloseAcc(false)}
                            />


                            <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-[90%] sm:w-80 md:w-96 lg:w-1/2">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600 mb-4 text-center">
                                    Delete Account
                                </h2>

                                <p className="text-sm md:text-base text-gray-700 mb-6 text-center">
                                    Are you sure you want to delete your account? <br />
                                    <span className="font-semibold text-red-600">This action cannot be undone.</span>
                                </p>

                               
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                   
                                    <button
                                        onClick={() => setopenCloseAcc(false)}
                                        className="flex-1 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-2xl hover:bg-gray-300 transition"
                                    >
                                        Cancel
                                    </button>

                             
                                    <button
                                        onClick={deleteProfile}
                                        className="flex-1 bg-[#C91737] text-white font-semibold py-2 px-4 rounded-2xl hover:bg-red-700 transition"
                                    >
                                       {
                                        ispending ? "Deleting..." : "Delete"
                                       }
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default Page
