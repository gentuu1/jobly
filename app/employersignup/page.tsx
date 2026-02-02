"use client"

import { useFormik } from "formik"
import * as yup from "yup"
import { ChangeEvent, useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "../component/Navbar"
import { employerSignup } from "../utils/actions"
import { toast } from "react-toastify"

const Page = () => {
    const [errormessage, seterrormessage] = useState('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            formik.setFieldValue("companyLogo", '');
            return;
        }

        const reader = new FileReader()

        reader.onloadend = () => {
            const photoBase64 = reader.result as string;
            formik.setFieldValue("companyLogo", photoBase64);
        }

        reader.readAsDataURL(file)
    }

    const formik = useFormik({
        initialValues: {
            companyName: '',
            industry: '',
            companySize: '',
            companyLogo: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            try {
                startTransition(async () => {
                    seterrormessage('')
                    const res = await employerSignup({ ...values })
                    if (!res.success) {
                        seterrormessage(res.message)
                        return;
                    } 

                       toast.success(res.message, {
                        autoClose : 2000
                       })
                       
                       setTimeout(() => {
                           router.push('/dashboard')
                       }, 2000);
                
                })
            } catch (error) {
                console.log(error)
            }
        },

        validationSchema: yup.object({
            companyName: yup
                .string()
                .required("Required"),
            industry: yup
                .string()
                .required('Required'),
            companySize: yup
                .string()
                .required('Required'),
            companyLogo: yup
                .string()
                .required('Required'),
            firstname: yup
                .string()
                .required('Required'),
            lastname: yup
                .string()
                .required('Required'),
            email: yup
                .string()
                .required('Required')
                .email(' enter a valid email'),
            password: yup
                .string()
                .required("Required")
                .min(8, "Password must be at least 8 characters")
        })
    })
    return (
        <div>
            <Navbar />
            <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
                <form onSubmit={formik.handleSubmit} className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-10">

                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
                        Employer Signup
                    </h1>

                    <p className="text-center text-gray-500 text-sm md:text-base mt-2 mb-6">
                        Register your company to post jobs and hire applicants.
                    </p>

                    <div className={`${errormessage ? "block" : "hidden"} bg-red-50 border-red-400 border h-14 text-center content-center m-auto text-red-400`}>
                        <p className="text-sm font-bold">{errormessage ? errormessage : 'hello'}</p>

                    </div>

                    <div className="flex flex-col gap-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-2">Company Name</label>
                                <input
                                    onChange={formik.handleChange}
                                    name="companyName"
                                    type="text"
                                    placeholder="e.g. BrightKey Ltd."
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {
                                    formik.errors.companyName && (
                                        <small className='text-red-300 text-lg'>{formik.errors.companyName}</small>
                                    )
                                }
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-2">Industry</label>
                                <input
                                    onChange={formik.handleChange}
                                    name="industry"
                                    type="text"
                                    placeholder="e.g. Tech, Finance"
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {
                                    formik.errors.industry && (
                                        <small className='text-red-300 text-lg'>{formik.errors.industry}</small>
                                    )
                                }
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-2">Company Size</label>
                                <select
                                    onChange={formik.handleChange}
                                    name="companySize"
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                                        <small className='text-red-300 text-lg'>{formik.errors.companySize}</small>
                                    )
                                }
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-2">Company Logo</label>
                                <input
                                    onChange={handlePhoto}
                                    name="companyLogo"
                                    type="file"
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {
                                    formik.errors.companyLogo && (
                                        <small className='text-red-300 text-lg'>{formik.errors.companyLogo}</small>
                                    )
                                }
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-2">First Name</label>
                                <input
                                    onChange={formik.handleChange}
                                    name="firstname"
                                    type="text"
                                    placeholder="e.g. John"
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {
                                    formik.errors.firstname && (
                                        <small className='text-red-300 text-lg'>{formik.errors.firstname}</small>
                                    )
                                }
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-600 mb-2">Last Name</label>
                                <input
                                    onChange={formik.handleChange}
                                    name="lastname"
                                    type="text"
                                    placeholder="e.g. Doe"
                                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                />
                                {
                                    formik.errors.lastname && (
                                        <small className='text-red-300 text-lg'>{formik.errors.lastname}</small>
                                    )
                                }
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 mb-2">Email</label>
                            <input
                                onChange={formik.handleChange}
                                name="email"
                                type="email"
                                placeholder="e.g. johndoe@example.com"
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {
                                formik.errors.email && (
                                    <small className='text-red-300 text-lg'>{formik.errors.email}</small>
                                )
                            }
                        </div>

                        <div className="flex flex-col">
                            <label className="text-gray-600 mb-2">Password</label>
                            <input
                                onChange={formik.handleChange}
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {
                                formik.errors.password && (
                                    <small className='text-red-300 text-lg'>{formik.errors.password}</small>
                                )
                            }
                        </div>


                        <button
                            type="submit"
                            className="bg-indigo-500 text-white font-semibold rounded-lg py-3 w-full hover:bg-indigo-600 transition"
                        >
                            {
                                isPending ? "creating..." : 'Create'
                            }
                        </button>
                    </div>

                    <p className="text-center text-gray-500 md:text-lg text-sm mt-2 md:mb-3 md:mt-3">
                        Click <Link href="/signup" className="text-indigo-500 cursor-pointer hover:underline">here</Link> to create an Applicant Account.
                    </p>
                    <p className="text-center text-gray-500 text-sm md:text-base mt-3">
                        Already have an account? <Link href='/signin' className="text-indigo-500 underline cursor-pointer">Login</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Page