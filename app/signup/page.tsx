"use client"

import { useFormik } from "formik";
import * as yup from 'yup';
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import Link from "next/link";
import Navbar from "../component/Navbar";

const Page = () => {
    const [errormessage, seterrormessage] = useState('')
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            formik.setFieldValue("photo", '')
            return
        };

        const reader = new FileReader();
        reader.onloadend = () => {
            const photobase64 = reader.result as string
           formik.setFieldValue("photo", photobase64)
        }
        reader.readAsDataURL(file)
    }

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            photo:''
        },
        onSubmit: async (values) => {
            seterrormessage('')
            try {
                startTransition(async () => {
        
                    console.log({ ...values });
                   
                })
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema: yup.object({
            firstname: yup.string().required('First name is required'),
            lastname: yup.string().required('Last name is required'),
            email: yup.string().required('Email is required').email('Please enter a valid email'),
            password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters")
        })
    })

    return (
        <div>
            <Navbar />
            <form onSubmit={formik.handleSubmit} className=" w-screen lg:h-full min-h-screen md:h-275 overflow-auto flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
                <div className="bg-white  rounded-2xl shadow-xl w-[95%] md:w-[90%] lg:w-150 p-10 flex flex-col">
                    <h1 className="text-3xl lg:text-[45px] md:text-5xl font-bold text-center text-gray-800">Applicant Signup</h1>
                    <p className="text-center text-gray-500 md:text-lg text-sm lg:text-sm mb-2 mt-2 md:mb-3 md:mt-3">
                        Click <Link href="/employersignup" className="text-indigo-500 cursor-pointer hover:underline">here</Link> to create an Employer Account.
                    </p>

                    {errormessage && (
                        <div className="bg-red-50 border border-red-400 h-14 text-center flex items-center justify-center text-red-400">
                            <p className="text-sm font-bold">{errormessage}</p>
                        </div>
                    )}

                    {/* First + Last Name */}
                    <div className="flex flex-col gap-2 mt-4">
                        <label className="text-gray-600 md:text-lg lg:text-[15px]">Name</label>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    name="firstname"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    placeholder="First name"
                                    className={`mb-3 w-full rounded-lg px-4 py-3 md:py-5 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                        ${formik.errors.firstname ? "border border-red-500" : "border border-gray-300"}`}
                                />
                                {formik.errors.firstname && (
                                    <small className="text-red-400">{formik.errors.firstname}</small>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    name="lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    placeholder="Last name"
                                    className={`w-full rounded-lg px-4 py-3 md:py-5 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                        ${formik.errors.lastname ? "border border-red-500" : "border border-gray-300"}`}
                                />
                                {formik.errors.lastname && (
                                    <small className="text-red-400">{formik.errors.lastname}</small>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-600 md:text-lg lg:text-[15px]">Email</label>
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            type="email"
                            placeholder="example@mail.com"
                            className={`mb-3 rounded-lg px-4 py-3 md:py-5 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                ${formik.errors.email ? "border border-red-500" : "border border-gray-300"}`}
                        />
                        {formik.errors.email && (
                            <small className="text-red-400">{formik.errors.email}</small>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-600 md:text-lg lg:text-[15px]">Password</label>
                        <input
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            type="password"
                            placeholder="••••••••"
                            className={`mb-3 rounded-lg px-4 py-3 md:py-5 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                ${formik.errors.password ? "border border-red-500" : "border border-gray-300"}`}
                        />
                        {formik.errors.password && (
                            <small className="text-red-400">{formik.errors.password}</small>
                        )}
                    </div>

                    {/* Profile Picture */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-600 md:text-lg lg:text-[15px]">
                            Profile Picture <span className="text-sm text-gray-400">(optional)</span>
                        </label>
                        <input
                            type="file"
                            onChange={handlePhoto}
                            className="border border-gray-300 rounded-lg px-4 py-3  md:py-5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type='submit'
                        className="bg-indigo-500 text-white font-semibold rounded-lg py-3 md:py-6 w-full hover:bg-indigo-600 transition duration-200 mt-5"
                    >
                        {isPending ? "Creating..." : 'Create'}
                    </button>

                    <p className="text-center text-gray-500 text-sm md:text-lg lg:text-sm mt-6">
                        Already have an account? <Link href='/signin' className="text-indigo-500 cursor-pointer hover:underline">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Page
