"use client"
import ProfileNavbar from "@/app/component/ProfileNavbar"
import Spinner from "@/app/component/Spinner"
import { applicaTions, delApplications } from "@/app/utils/actions"
import { JOBS } from "@/app/utils/type"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { toast } from "react-toastify"

const Page = () => {
    const [jobss, setjobss] = useState<JOBS[]>([])
    const [isLoading, setisLoading] = useState(true)
    const router = useRouter()
    const [pendingId, setPendingId] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            const res = await applicaTions()

            if (!res.success || !res.jobs) {
                toast.error(res.message, {
                    autoClose: 2000
                })

                setisLoading(false)
                router.push('/dashboard')
                return;
            }

            setjobss(res.jobs)
            setisLoading(false)
        }

        fetch()
    }, [])

    const RejApplication = async (_id: string) => {
            setPendingId(_id)
            const res = await delApplications(_id)

            if (!res.success) {
                toast.error(res.message, {
                    autoClose: 2000
                })

                return;
            }

            toast.success(res.message, {
                autoClose: 2000
            })

            setPendingId(null)
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
        <div className="w-full min-h-screen bg-[#F4F4F5] pb-15">
            <ProfileNavbar />

            <div className="h-20 w-full border-b lg:px-10 md:px-10 px-5 flex flex-col justify-center sticky top-0 bg-[#F4F4F5] z-30">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Applications
                </h3>
            </div>

            <div className="m-auto w-[95%] flex flex-col gap-5 py-6">

                {jobss.length === 0 && (
                    <div className="w-full flex flex-col items-center justify-center h-60 md:h-72 lg:h-80 text-center bg-white rounded-lg border border-dashed border-indigo-600">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            No applications yet
                        </h2>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {jobss.map((job, index) => (
                        <div
                            key={index}
                            className="flex flex-col border border-neutral-300 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                        src={job.companyLogo}
                                        alt={job.companyName}
                                        height={500}
                                        width={500}
                                        loading="eager"
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <h2 className="text-lg sm:text-xl md:text-xl font-bold capitalize">
                                    {job.companyName}
                                </h2>
                            </div>


                            <div className="mb-3">
                                {job.deleTe ? (
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl md:text-2xl font-bold capitalize line-through text-gray-400">
                                            {job.title}
                                        </h2>
                                        <span className="text-red-500 font-semibold text-sm md:text-base line-through">
                                            Deleted
                                        </span>
                                    </div>
                                ) : (
                                    <h2 className="text-xl md:text-2xl font-bold capitalize">
                                        {job.title}
                                    </h2>
                                )}
                            </div>


                            <div className="flex flex-col gap-1 text-gray-700 text-sm md:text-base">
                                <p>
                                    <strong className="font-semibold">Salary:</strong> ₦{job.salary}
                                </p>
                                <p>
                                    <strong className="font-semibold">Location:</strong> {job.location}
                                </p>
                                <p>
                                    <strong className="font-semibold">Job Type:</strong> {job.jobType}
                                </p>
                                <p>
                                    <strong className="font-semibold">Payment Type:</strong> {job.paymentType}
                                </p>
                            </div>

                            {/* Remove / Delete */}
                            <button type="button" onClick={() => RejApplication(job._id)} className="mt-4 py-2 rounded-lg border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition">
                                {
                                    pendingId === job._id ? "Removing..." : "Remove" 
                                }
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Page
