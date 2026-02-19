"use client"
import ProfileNavbar from '@/app/component/ProfileNavbar'
import RecApplybutton from '@/app/component/RecApplybutton'
import Spinner from '@/app/component/Spinner'
import { delSavedjob, fetchSaveJob } from '@/app/utils/actions'
import { JOBS } from '@/app/utils/type'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { MdOpenInNew } from 'react-icons/md'
import { toast } from 'react-toastify'

const Page = () => {
    const [jobss, setjobss] = useState<JOBS[]>([])
    const router = useRouter()
    const [isLoading, setisLoading] = useState(true)
    const [pendingId, setPendingId] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            const res = await fetchSaveJob()

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

    const delSaved = async (_id: string) => {
        setPendingId(_id)
        const res = await delSavedjob(_id)

        if (!res.success) {
            toast.error(res.message, {
                autoClose: 2000
            })
            setPendingId(null)
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
        <div className='md:pb-25 pb-20 lg:pb-0 '>
            <ProfileNavbar />
            <div className='w-full h-fit bg-[#F4F4F5]'>

                <div className='border-b h-24 w-full mt-5 flex flex-col justify-center px-3'>
                    <h3 className='lg:text-3xl text-4xl md:text-5xl  font-bold tracking-tight'>Saved jobs</h3>
                    <p className="text-[18px] text-gray-600">
                        Jobs you saved to apply later
                    </p>
                </div>

                <div className=' w-full h-fit  p-3 md:p-0'>
                    {
                        jobss.length > 0 ? (
                            <div className=' w-full h-fit md:h-fit grid lg:grid-cols-3 gap-5 md:gap-4 md:grid-cols-2 md:px-2 grid-cols-1 pt-5'>
                                {
                                    jobss.map((job, index) => (
                                        <form key={index} className='bg-white lg:min-h-85 md:min-h-110 h-95 rounded-2xl shadow-lg border border-neutral-400 py-3 '>

                                            <Link href={`/dashboard/jobs/${job._id}`} >
                                                <div className="w-[95%] h-20 lg:h-17 md:h-20 mb-5 m-auto flex  justify-between">
                                                    <div className=' w-20 '>
                                                        <Image
                                                            src={job.companyLogo}
                                                            alt='companyLogo'
                                                            height={500}
                                                            width={500}
                                                            loading="eager"
                                                            className='h-full w-full object-cover rounded-lg'
                                                        />
                                                    </div>
                                                    <div className=' w-fit text-right '>
                                                        <h1 className="text-3xl lg:text-2xl md:text-4xl font-bold ">₦{job.salary}</h1>
                                                        <p className="text-lg lg:text-sm md:text-lg">{job.paymentType}</p>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className=" h-70 lg:h-60 md:h-85 w-[95%] m-auto ">
                                                <Link href={`/dashboard/jobs/${job._id}`}>
                                                    <h3 className="text-2xl lg:text-xl md:text-3xl  font-semibold capitalize line-clamp-2">{job.title}</h3>
                                                    <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize">{job.companyName}</p>
                                                    <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize inline-block ">{job.location}</p>
                                                    <div className=" w-full flex mt-2 h-15 lg:h-10 items-center gap-2">
                                                        <p className=" h-10 lg:h-8 rounded-sm text-center lg:w-25 w-30 text-xl lg:text-sm font-bold text-[#005647] bg-[#D1FFF7] content-center capitalize">{job.jobType}</p>
                                                        <p className=" h-10 lg:h-8 lg:w-30 rounded-sm text-center w-40 text-xl lg:text-sm font-bold text-[#422BD9] bg-[#D9D9FC] content-center ">Urgent hiring</p>
                                                    </div>
                                                </Link>

                                                <div className="mt-5 lg:mt-3 gap-2 flex md:justify-start items-center lg:justify-start">
                                                    <RecApplybutton jobId={job._id} />


                                                    <button type='button' onClick={() => delSaved(job._id)} className="w-18 h-18 md:h-20 md:w-20 lg:h-16 lg:w-16 rounded-[100%] bg-transparent border border-red-500 text-red-500 text-[20px] font-semibold transition-all duration-400 hover:bg-red-50 flex items-center justify-center">
                                                        {
                                                            pendingId === job._id
                                                                ? <FaSpinner className='animate-spin' />
                                                                : <FiX />

                                                        }
                                                    </button>
                                                </div>

                                            </div>
                                        </form>
                                    ))
                                }


                            </div>
                        ) : (
                            <div className="w-full h-64 flex flex-col justify-center items-center gap-4 bg-white rounded-xl shadow-md">
                                <MdOpenInNew className="text-5xl text-gray-400" />
                                <h2 className="text-2xl font-semibold text-gray-600">No Saved Jobs</h2>
                                <p className="text-gray-500 text-center px-4">
                                    You haven’t saved any jobs yet. Browse jobs and save the ones you’re interested in to apply later.
                                </p>
                                <Link
                                    href="/dashboard/jobs"
                                    className="px-6 py-2 rounded-md bg-[#422BD9] text-white hover:bg-[#3220b0] transition"
                                >
                                    Browse Jobs
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Page
