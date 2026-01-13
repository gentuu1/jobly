"use client"
import ProfileNavbar from "@/app/component/ProfileNavbar"
import { useFormik } from "formik"
import * as yup from "yup"
import Link from "next/link"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"

const Page = () => {
    const [openeditPass, setopeneditPass] = useState(false)
    const [openeditEmail, setopeneditEmail] = useState(false)

    const formik = useFormik({
        initialValues: {
            currentpassword: '',
            newpassword: '',
            confirmpassword: ''
        },
        onSubmit: (values) => {
            console.log(values);
        },

        validationSchema: yup.object({
            currentpassword: yup.string().required("Required"),
            newpassword: yup.string().required("Required").min(8, "Password must be atleast 8 characaters"),
            confirmpassword: yup.string().required("Required").oneOf([yup.ref('newpassword')], "Passwords do no match")
        })
    })

    const formikemail = useFormik({
        initialValues: {
            newemail: '',
        },
        onSubmit: (values) => {
            console.log(values);

        },

        validationSchema: yup.object({
            newemail: yup.string().required("Required").email('Enter a valid email')
        })
    })


    return (
        <div>
            <ProfileNavbar />

            <section className="mt-10 flex flex-col gap-5">
                <h1 className="lg:text-4xl md:text-5xl text-3xl font-bold tracking-tight lg:ml-24 md:ml-10 ml-5 ">Password & Security</h1>

                <div className=" border lg:w-[85%] md:w-[90%] w-[90%] h-fit border-neutral-300 rounded-sm shadow-sm m-auto">
                    <div className="border-b border-neutral-300 w-full lg:h-16 md:h-18 h-20 content-center lg:px-10 md:px-5 px-5">
                        <h3 className="lg:text-[20px] text-[18px] md:text-[23px] font-bold tracking-tight"> Update your email address or change your password.</h3>
                    </div>

                    <div className=" w-full h-20 flex justify-between lg:px-10 md:px-5 px-5 items-center">
                        <div className=" w-fit flex flex-col justify-center h-16">
                            <h3 className="lg:text-[17px] md:text-[20px] text-[20px] font-bold tracking-tight">Email</h3>
                            <p className="lg:text-[14px] md:text-[16px] text-[17px] tracking-tight">{`Azeezsodiq221@gmail.com`}</p>
                        </div>

                        <div className=" w-fit flex flex-col justify-center h-16">
                            <Link onClick={() => setopeneditEmail(true)} href=''><p className="lg:text-[14px] md:text-[17px] text-[18px] pointer-cursor">Edit</p></Link>
                        </div>
                    </div>

                    <hr className="border-neutral-300 w-[90%] m-auto" />

                    <div className=" w-full h-20 flex justify-between lg:px-10 md:px-5 px-5 items-center">
                        <div className=" w-fit flex flex-col justify-center h-16">
                            <h3 className="lg:text-[17px] md:text-[20px] text-[20px] font-bold tracking-tight">Password</h3>
                            <p className="lg:text-[17px] md:text-[20px] text-[18px] tracking-tight">{`**********`}</p>
                        </div>

                        <div className=" w-fit flex flex-col justify-center h-16">
                            <Link onClick={() => setopeneditPass(true)} href=''><p className="lg:text-[14px] md:text-[17px] text-[18px] pointer-cursor">Edit</p></Link>
                        </div>
                    </div>

                </div>

            </section>

            {/* edit password section*/}
            <section className={`${openeditPass ? 'fixed' : 'hidden'} inset-0  py-5 z-50 bg-white`}>
                <div className='h-20 md:h-22 lg:h-20 w-full flex justify-between items-center px-5'>
                    <h1 className="text-3xl md:text-4xl lg:text-3xl font-extrabold text-indigo-600 tracking-tight">
                        Workly
                    </h1>

                    <FaTimes onClick={() => setopeneditPass(false)} className='text-3xl md:text-5xl lg:text-4xl md:font-light text-indigo-600 cursor-pointer ' />
                </div>

                <form onSubmit={formik.handleSubmit} className=" lg:w-xl md:w-[70%] w-full h-fit px-5 flex flex-col justify-center m-auto mt-5">
                    <h1 className="lg:text-3xl md:text-4xl text-3xl tracking-tight text-center text-[#262262]">Edit password</h1>
                    <input
                        className={`${formik.errors.currentpassword && formik.touched.currentpassword ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-5 `}
                        placeholder="Current password"
                        name="currentpassword"
                        type="password"
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.currentpassword && formik.touched.currentpassword && (
                            <small className='text-red-600 text-[15px] lg:text-[14px] md:text-[17px]'>{formik.errors.currentpassword}</small>
                        )
                    }


                    <input
                        className={`${formik.errors.newpassword && formik.touched.newpassword ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-3 `}
                        placeholder="New password"
                        name="newpassword"
                        type="password"
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.newpassword && formik.touched.newpassword && (
                            <small className='text-red-600 text-[15px] lg:text-[14px] md:text-[17px]'>{formik.errors.newpassword}</small>
                        )
                    }

                    <input
                        className={`${formik.errors.confirmpassword && formik.touched.confirmpassword ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-3 `}
                        name="confirmpassword"
                        placeholder="Confirm password"
                        type="password"
                        onChange={formik.handleChange}
                    />
                    {
                        formik.errors.confirmpassword && formik.touched.confirmpassword && (
                            <small className='text-red-600 text-[15px] lg:text-[14px]'>{formik.errors.confirmpassword}</small>
                        )
                    }

                    <div className="flex justify-end-safe h-fit items-center pl-auto gap-2 mt-3">
                        <button type="button" onClick={() => setopeneditPass(false)} className="lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8  py-3 px-6.5  text-[#3921D7] font-semibold bg-transparent hover:bg-[#F4F4F5] rounded-3xl cursor-pointer transition-all duration-300">Cancel</button>
                       
                        <button type="submit" className="lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8 py-3 px-6.5  text-white font-semibold bg-[#4B3BFF] hover:bg-[#3921D7] rounded-3xl cursor-pointer transition-all duration-300">Save</button>
                    </div>
                </form>
            </section>

            {/* edit email section */}
            <section className={`${openeditEmail ? 'fixed' : 'hidden'} inset-0 py-5 z-50 bg-white`}>
                <div className='h-20 md:h-22 lg:h-20 w-full flex justify-between items-center px-5'>
                    <h1 className="text-3xl md:text-4xl lg:text-3xl font-extrabold text-indigo-600 tracking-tight">
                        Workly
                    </h1>

                    <FaTimes onClick={() => setopeneditEmail(false)} className='text-3xl md:text-5xl lg:text-4xl md:font-light text-indigo-600 cursor-pointer ' />
                </div>

                <form onSubmit={formikemail.handleSubmit} className=" lg:w-xl md:w-[70%] w-full h-fit px-5 flex flex-col justify-center m-auto mt-5">
                    <h1 className="lg:text-3xl md:text-4xl text-3xl tracking-tight text-center text-[#262262]">Edit and verify your new email address</h1>
                    <input
                        className={`${formikemail.errors.newemail && formikemail.touched.newemail ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-5 `}
                        placeholder="New email"
                        name="newemail"
                        type="email"
                        onChange={formikemail.handleChange}
                    />
                    {
                        formikemail.errors.newemail && formikemail.touched.newemail && (
                            <small className='text-red-600 text-[15px] lg:text-[14px] md:text-[17px]'>{formikemail.errors.newemail}</small>
                        )
                    }

                    <div className="flex justify-end-safe h-fit items-center pl-auto gap-2 mt-3">
                    
                         <button type="button" onClick={() => setopeneditEmail(false)} className="lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8  py-3 px-6.5  text-[#3921D7] font-semibold bg-transparent hover:bg-[#F4F4F5] rounded-3xl cursor-pointer transition-all duration-300">Cancel</button>
                        
                        <button type="submit" className="lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8 py-3 px-6.5  text-white font-semibold bg-[#4B3BFF] hover:bg-[#3921D7] rounded-3xl cursor-pointer transition-all duration-300">Send code</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Page
