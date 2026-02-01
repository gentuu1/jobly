'use client'
import React, { useState, useTransition } from 'react'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as yup from "yup"
import Link from 'next/link'
import Navbar from '../component/Navbar'
import { signIn } from '../utils/actions'
import {  toast } from 'react-toastify'

const Page = () => {
    const [errormessage, seterrormessage] = useState('')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        onSubmit: async (values) => {
            seterrormessage('')
            try {
                startTransition(async () => {
                    const res = await signIn({ ...values })
                    if (!res.success) {
                        seterrormessage(res.message)
                        return;
                    }

                    toast.success(res.message, {
                        autoClose : 2000
                    })


                    setTimeout(() => {
                        router.push("/dashboard")
                    }, 2000)
                })
            } catch (error) {
                console.log(error)
            }

        },

        validationSchema: yup.object({
            email: yup.string()
                .required('Required')
                .email('please enter a valid email'),
            password: yup
                .string()
                .required("Required")
        })
    })

    return (
        <div>
            <Navbar />
            <form onSubmit={formik.handleSubmit} className=" w-full lg:min-h-fit  h-150 md:min-h-200 overflow-auto flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
                <div className="bg-white rounded-2xl shadow-xl lg:w-150 md:w-[90%]   w-[95%] p-10 ">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800  ">SIGNIN</h1>
                    <div className={`${errormessage ? "block" : "hidden"} bg-red-50 border-red-400 border h-14 text-center content-center m-auto text-red-400`}>
                        <p className="text-sm font-bold">{errormessage ? errormessage : 'hello'}</p>
                    </div>


                    <div className="flex flex-col gap-6">

                        <div className="flex flex-col">
                            <label className="text-gray-600 md:text-lg mb-2">Email</label>
                            <input
                                name="email"
                                onChange={formik.handleChange}
                                type="email"
                                placeholder="example@mail.com"
                                className={`${formik.errors.email ? "border-red-500 border" : 'border-gray-300 border'} border-gray-300 rounded-lg px-4 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-indigo-400`}

                            />
                            {
                                formik.errors.email && (
                                    <small className='text-red-300 text-lg'>{formik.errors.email}</small>
                                )
                            }
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 mb-2 md:text-lg">Password</label>
                            <input
                                name="password"
                                onChange={formik.handleChange}
                                type="password"
                                placeholder="••••••••"
                                className={`${formik.errors.password ? "border-red-500 border" : 'border-gray-300 border'} border-gray-300 rounded-lg px-4 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-indigo-400`}

                            />
                            {
                                formik.errors.password && (
                                    <small className='text-red-300 text-lg'>{formik.errors.password}</small>
                                )
                            }
                        </div>

                        <button
                            type='submit'
                            // onClick={formik.handleSubmit}
                            className="bg-indigo-500 text-white font-semibold rounded-lg py-3 w-full hover:bg-indigo-600 transition duration-200">
                            {
                                isPending ? "Logging in..." : 'Login'
                            }
                        </button>
                    </div>


                    <p className="text-center text-gray-500 text-sm md:text-lg mt-6">
                        Don't have an account? <Link href='/signup' className="text-indigo-500 cursor-pointer hover:underline">create account</Link>
                    </p>

                    <Link href='/forgot'>
                        <p className='text-sm md:text-lg mt-3 text-center text-indigo-600 hover:underline cursor-pointer '>Forget password ?</p>
                    </Link>
                </div>


            </form>
        </div>
    )
}

export default Page