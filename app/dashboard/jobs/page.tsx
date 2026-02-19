import ProfileNavbar from '@/app/component/ProfileNavbar'
import RecApplybutton from '@/app/component/RecApplybutton'
import SavejobButton from '@/app/component/SavejobButton'
import { allJObs } from '@/app/utils/actions'
import { JOBS } from '@/app/utils/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'

const Page = async() => {
    const { success, jobs } = await allJObs()

    let jobss: JOBS[] = []
    let jobslength = 0;

    if(success && jobs){
        jobss = jobs.slice(0,30)
        jobslength = jobs.length
    }


    return (
        <div className='pb-20 lg:pb-0 min-h-screen '>
            <ProfileNavbar />

            <div className='w-full h-fit bg-[#F4F4F5]'>

                <div className=' h-24 w-full mt-5 flex flex-col justify-center px-3 border-b '>
                    <h3 className='text-3xl md:text-4x1 font-bold tracking-tight'>Jobs</h3>
                    <p className='text-[18px] font-medium tracking-tight'>{`showing ${jobss.length} of ${jobslength} jobs`}</p>
                </div>

                <div className='w-full h-200 lg:h-120 md:h-250 p-3 md:p-0 overflow-scroll'>
                    <div className='w-full h-fit md:h-fit grid lg:grid-cols-3 gap-5 md:gap-4 md:grid-cols-2 md:px-2 grid-cols-1  lg:p-5 pt-5'>
                        {
                            jobss.map((job, index) => (
                                <div key={index} className='bg-white lg:min-h-85 md:min-h-110  min-h-fit rounded-2xl shadow-lg pt-2 '>

                                   <Link href={`/dashboard/jobs/${job._id}`}>
                                        <div className="w-[95%] h-20 lg:h-17 md:h-20 mb-5 m-auto flex  justify-between ">
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
                                            <div className='w-fit text-right '>
                                                <h1 className="text-3xl lg:text-2xl md:text-4xl font-bold ">₦{(job.salary)}</h1>
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
                                                <p className=" h-10 lg:h-8 rounded-sm text-center lg:w-25 w-30 text-xl lg:text-sm font-bold text-[#005647] bg-[#D1FFF7] content-center capitalize ">{job.jobType}</p>
                                                <p className=" h-10 lg:h-8 lg:w-30 rounded-sm text-center w-40 text-xl lg:text-sm font-bold text-[#422BD9] bg-[#D9D9FC] content-center ">Urgent hiring</p>
                                            </div>
                                        </Link>

                                        <div className="mt-5 lg:mt-3 flex gap-2  md:justify-start items-center lg:justify-start justify-between ">
                                            <RecApplybutton jobId={job._id} />
                                            <SavejobButton jobId={job._id} />
                                        </div>

                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
