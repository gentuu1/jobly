"use client"
import { useFormik } from 'formik'
import * as yup from "yup"
import Link from 'next/link'
import { useState } from 'react'
import ForgotNavbar from '../component/ForgotNavbar'
import { useRouter } from 'next/navigation'



const Page = () => {
    const [confirmotp, setconfirmotp] = useState(false);
    const router = useRouter()

    const formikemail = useFormik({
        initialValues: {
            emailaddress: ''
        },
        onSubmit: (values) => {
            console.log(values);
            setconfirmotp(true)
        },

        validationSchema: yup.object({
            emailaddress: yup.string().required("Required").email("Enter a valid email")
        })
    });

    const formikotp = useFormik({
        initialValues: {
            otp: ''
        },
        onSubmit: (values) => {
            console.log(values);
            router.push('/forgot/updatepassword')
        },

        validationSchema: yup.object({
            otp: yup.string().required("Confirm otp")
        })
    })
    return (
        <div>
          <ForgotNavbar/>


            <section className=" lg:w-xl md:w-[70%] w-full h-fit px-5 flex flex-col justify-center m-auto mt-5">
                <h1 className="lg:text-3xl md:text-4xl text-3xl tracking-tight text-center text-[#262262]">Forgot your password?</h1>
                <p className='text-center lg:text-2xl md:text-[20px] text-lg mt-3'>We'll email you an otp to reset it.</p>
                <input
                    className={`${formikemail.errors.emailaddress && formikemail.touched.emailaddress ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-5 `}
                    placeholder="Email address"
                    name="emailaddress"
                    type="text"
                    onChange={formikemail.handleChange}
                />
                {
                    formikemail.errors.emailaddress && formikemail.touched.emailaddress && (
                        <small className='text-red-600 text-[15px] lg:text-[14px] md:text-[17px]'>{formikemail.errors.emailaddress}</small>
                    )
                }

                <input
                    className={`${formikotp.errors.otp && formikotp.touched.otp ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} ${confirmotp ? 'block' : "hidden"} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-5 `}
                    placeholder="Otp"
                    name="otp"
                    type="text"
                    onChange={formikotp.handleChange}
                />
                {
                    formikotp.errors.otp && formikotp.touched.otp && (
                        <small className='text-red-600 text-[15px] lg:text-[14px] md:text-[17px]'>{formikotp.errors.otp}</small>
                    )
                }

                <div className="flex justify-end-safe h-fit items-center pl-auto gap-2 mt-3">
                    <Link href='/signin'>
                        <button className="lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8  py-3 px-6.5  text-[#3921D7] font-semibold bg-transparent hover:bg-[#F4F4F5] rounded-3xl cursor-pointer transition-all duration-300">Cancel</button>
                    </Link>

                    {/* confirm email button */}
                    <button type='button' onClick={() => formikemail.handleSubmit()} className={`lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8 py-3 px-6.5  text-white font-semibold bg-[#4B3BFF] hover:bg-[#3921D7] rounded-3xl cursor-pointer transition-all duration-300 ${confirmotp ? 'hidden' : 'block'}`}>Send email</button>

                    {/* confirm otp button */}

                    <button type='button' onClick={() => formikotp.handleSubmit()} className={`lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8 py-3 px-6.5  text-white font-semibold bg-[#4B3BFF] hover:bg-[#3921D7] rounded-3xl cursor-pointer transition-all duration-300 ${confirmotp ? 'block' : 'hidden'}`}>Confirm otp</button>


                </div>
            </section>

        </div>
    )
}

export default Page
