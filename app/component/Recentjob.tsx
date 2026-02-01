import React from 'react'
import { recjoBs } from '../utils/actions'
import { JOBS } from '../utils/type'
import { FaRegHeart } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import RecApplybutton from './RecApplybutton'

const Recentjob = async () => {
    const { success, jobs } = await recjoBs()
    let recentJobs: JOBS[] = []


    if (success && jobs) {
        recentJobs = jobs.splice(0, 5)
    }

    return (
        <div>
            <div className="  w-full h-125 lg:h-100 md:h-140 flex flex-col gap-4 lg:gap-0 mt-5">
                <div className='flex justify-between w-full px-5 lg:pr-30 md:pr-30'>
                    <h1 className="text-2xl md:text-3xl lg:text-2xl font-bold">
                        Recently Added Jobs
                    </h1>

                    <Link href='/dashboard/jobs'
                        className='text-2xl text-[#4B3BFF]'
                    >
                        view all
                    </Link>
                </div>

                <div className="flex w-full  h-110 lg:h-100 md:h-125 overflow-x-scroll gap-5 px-3">
                    {
                        recentJobs?.map((jobbb, index) => (
                            <div key={index} className="w-[95%] border lg:w-100 md:max-w-140 h-95 lg:h-85 md:h-110 m-auto rounded-2xl p-2  shadow-lg border-neutral-400">

                                <Link href={`/dashboard/jobs/${jobbb._id}`}>
                                    <div className="w-[95%] h-20 lg:h-17 md:h-20 m-auto flex  justify-between ">
                                        <div className=' rounded-3xl w-24 '>
                                            <Image
                                                src={jobbb.companyLogo}
                                                alt='companyLogo'
                                                height={500}
                                                width={500}
                                                loading="eager"
                                                className='h-full w-full object-cover rounded-lg'
                                            />
                                        </div>
                                        <div className=' w-fit text-right '>
                                            <h1 className="text-2xl lg:text-2xl md:text-4xl font-bold ">₦{jobbb.salary}</h1>
                                            <p className=" text-lg lg:text-sm md:text-lg">{jobbb.paymentType}</p>
                                        </div>
                                    </div>
                               </Link>

                                <div className=" h-70 lg:h-60 md:h-85 w-[95%] m-auto ">
                                    <Link href={`/dashboard/jobs/${jobbb._id}`}>
                                        <h3 className="text-2xl lg:text-xl md:text-3xl  font-semibold capitalize line-clamp-2">{jobbb.title}</h3>
                                        <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize">{jobbb.companyName}</p>
                                        <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize inline-block ">{jobbb.location}</p>
                                        <div className=" w-full flex mt-2 h-15 lg:h-10 items-center gap-2">
                                            <p className=" h-10 lg:h-8 rounded-sm text-center lg:w-25 w-30 text-xl lg:text-sm font-bold text-[#005647] bg-[#D1FFF7] content-center ">{jobbb.jobType}</p>
                                            <p className=" h-10 lg:h-8 lg:w-30 rounded-sm text-center w-40 text-xl lg:text-sm font-bold text-[#422BD9] bg-[#D9D9FC] content-center ">Urgent hiring</p>
                                        </div>
                                  </Link>

                                    <div className=" mt-5 lg:mt-3 flex gap-2 md:justify-start items-center lg:justify-start ">
                                        
                                        <RecApplybutton jobId={jobbb._id}/>

                                        <button className="w-18 h-18 md:h-20 md:w-20 lg:h-15 lg:w-15 rounded-[100%]  bg-transparent border border-[#4B3BFF] text-[#4B3BFF] text-[20px] font-semibold transition-all duration-400">
                                            <FaRegHeart className="inline-block bg-transparent" />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Recentjob
