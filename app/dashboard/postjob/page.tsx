"use client"

import { useFormik } from "formik"
import * as yup from "yup"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import ProfileNavbar from "@/app/component/ProfileNavbar"
import { postJob } from "@/app/utils/actions"
import { toast } from "react-toastify"

const Page = () => {
    const [errormessage, seterrormessage] = useState("")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            requirements: "",
            salary: 0,
            location: "",
            jobType: "",
            paymentType: "",
        },
        onSubmit: (values) => {
            seterrormessage('')
            startTransition(async () => {
                const result = await postJob(values)
                if (!result.success) {
                    seterrormessage(result.message)
                    return;
                } 
                    toast.success(result.message, {
                        autoClose : 3000
                    })
                    
                    setTimeout(() => {
                        router.push('/dashboard')
                    }, 2000);
                
            })
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .required("Job title is required"),
            description: yup
                .string()
                .required("Description is required"),
            jobType: yup
                .string()
                .required("Job schedule is required"),
            requirements: yup
                .string()
                .required("Requirements are required"),
            salary: yup
                .number()
                .typeError("Salary must be number")
                .required("Salary is required"),
            location: yup
                .string()
                .required("Location is required"),
            paymentType: yup
                .string()
                .required("Payment type is required"),
        }),
    })

    return (
        <div className="min-h-screen min-w-screen flex flex-col bg-slate-50 pb-15 lg:pb-0 md:pb-20 overflow">
            <ProfileNavbar />
            <div className="flex  flex-1 items-center justify-center  px-4 py-10 bg-gradient-to-r from-blue-100 to-indigo-100">
                <form
                    onSubmit={formik.handleSubmit}
                    className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-10"
                >
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
                        Post a New Job
                    </h1>

                    {errormessage && (
                        <div className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm text-red-600 font-medium">
                            {errormessage}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={formik.handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5 md:py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="e.g. Social Assistant"
                                />
                                {formik.errors.title && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {formik.errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Salary
                                </label>
                                <input
                                    type="text"
                                    name="salary"
                                    onChange={formik.handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5 md:py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    placeholder="e.g. 10000"
                                />
                                {formik.errors.salary && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {formik.errors.salary}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Description
                            </label>
                            <textarea
                                name="description"
                                rows={3}
                                onChange={formik.handleChange}
                                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                                placeholder="Describe the job role, responsibilities, and expectations..."
                            />
                            {formik.errors.description && (
                                <p className="text-xs text-red-500 mt-1">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job Schedule
                                </label>
                                <select
                                    name="jobType"
                                    onChange={formik.handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5 md:py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="">Select job type</option>
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Temporary">Temporary</option>
                                </select>
                                {formik.errors.jobType && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {formik.errors.jobType}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Payment Type
                                </label>
                                <select
                                    name="paymentType"
                                    onChange={formik.handleChange}
                                    className="w-full rounded-lg border px-4 py-2.5 md:py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option value="">Select payment type</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Daily">Daily</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Contract">Contract</option>
                                </select>
                                {formik.errors.paymentType && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {formik.errors.paymentType}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                onChange={formik.handleChange}
                                className="w-full rounded-lg border px-4 py-2.5 md:py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="e.g. Osogbo, Osun"
                            />
                            {formik.errors.location && (
                                <p className="text-xs text-red-500 mt-1">
                                    {formik.errors.location}
                                </p>
                            )}
                        </div>

                        {/* Requirements */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Requirements
                            </label>
                            <input
                                type="text"
                                name="requirements"
                                onChange={formik.handleChange}
                                className="w-full rounded-lg border px-4 py-2.5 md:py-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Skills, experience, qualifications..."
                            />
                            {formik.errors.requirements && (
                                <p className="text-xs text-red-500 mt-1">
                                    {formik.errors.requirements}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-indigo-600 py-3 md:py-5 text-white font-semibold hover:bg-indigo-700 transition"
                        >
                            {isPending ? "posting...." : "Post Job"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
