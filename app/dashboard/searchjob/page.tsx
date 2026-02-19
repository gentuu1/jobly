"use client"
import ProfileNavbar from '@/app/component/ProfileNavbar'
import RecApplybutton from '@/app/component/RecApplybutton'
import SavejobButton from '@/app/component/SavejobButton'
import Spinner from '@/app/component/Spinner'
import { searchJob } from '@/app/utils/actions'
import { JOBS, search_jobs } from '@/app/utils/type'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [isLoading, setisLoading] = useState(true)  
  const [jobss, setjobss] = useState<search_jobs[]>([])
  const searchParams = useSearchParams()
  const search = searchParams.get('search')


  useEffect(()=>{
    const fetchSearch = async()=>{

      if(!search){
        setisLoading(false);
        return;
      };

      const res = await searchJob(search!)

      if(!res.success){
        setisLoading(false)
        toast.error(res?.message)
        return;
      }

      setjobss(res.filteredJobs || [])
      setisLoading(false)
    }

    fetchSearch()

  }, [search])


  if (isLoading) {
      return (
        <>
          <ProfileNavbar />
          <Spinner />
        </>
      )
  
    }
  return (
    <div className='pb-20 md:pb-25 lg:pb-0 min-h-screen'>
      <ProfileNavbar />

      <div className='w-full h-fit bg-[#F4F4F5]'>
        <div className='h-24 w-full mt-5 flex flex-col justify-center px-3 border-b'>
          <h3 className='text-3xl md:text-4xl font-bold tracking-tight'>Jobs Searched</h3>
          <p className='text-gray-600'>{jobss.length} job{jobss.length !== 1 ? 's' : ''} found</p>
        </div>

        {jobss.length === 0 ? (
          <div className="w-full h-64 flex flex-col justify-center items-center gap-4 bg-white rounded-xl shadow-md mt-10">
            <p className="text-4xl text-gray-400">🔍</p>
            <h2 className="text-2xl font-semibold text-gray-600">No jobs found</h2>
            <p className="text-gray-500 text-center px-4">
              Try a different keyword or check back later for new jobs.
            </p>
            <Link
              href="/dashboard/jobs"
              className="px-6 py-2 rounded-md bg-[#422BD9] text-white hover:bg-[#3220b0] transition"
            >
              Browse All Jobs
            </Link>
          </div>
        ) : (
          <div className='w-full h-200 lg:h-120 md:h-250 p-3 md:p-0 overflow-scroll'>
            <div className='w-full h-fit md:h-fit grid lg:grid-cols-3 gap-5 md:gap-4 md:grid-cols-2 md:px-2 grid-cols-1 lg:p-5 pt-5'>
              {jobss.map((job, index) => (
                <div key={index} className='bg-white lg:min-w-82 lg:min-h-85 md:min-h-110 min-h-fit rounded-2xl shadow-lg pt-2'>

                  <Link href={`/dashboard/jobs/${job._id}`}>
                    <div className="w-[95%] h-20 lg:h-17 md:h-20 mb-5 m-auto flex justify-between">
                      <div className='w-20'>
                        <Image
                          src={job.companyLogo}
                          alt='companyLogo'
                          height={500}
                          width={500}
                          loading="eager"
                          className='h-full w-full object-cover rounded-lg'
                        />
                      </div>
                      <div className='w-fit text-right'>
                        <h1 className="text-3xl lg:text-2xl md:text-4xl font-bold">₦{job.salary}</h1>
                        <p className="text-lg lg:text-sm md:text-lg">{job.paymentType}</p>
                      </div>
                    </div>
                  </Link>

                  <div className="h-70 lg:h-60 md:h-85 w-[95%] m-auto">
                    <Link href={`/dashboard/jobs/${job._id}`}>
                      <h3 className="text-2xl lg:text-xl md:text-3xl font-semibold capitalize line-clamp-2">{job.title}</h3>
                      <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize">{job.companyName}</p>
                      <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize inline-block">{job.location}</p>
                      <div className="w-full flex mt-2 h-15 lg:h-10 items-center gap-2">
                        <p className="h-10 lg:h-8 rounded-sm text-center lg:w-25 w-30 text-xl lg:text-sm font-bold text-[#005647] bg-[#D1FFF7] content-center capitalize">{job.jobType}</p>
                        <p className="h-10 lg:h-8 lg:w-30 rounded-sm text-center w-40 text-xl lg:text-sm font-bold text-[#422BD9] bg-[#D9D9FC] content-center">Urgent hiring</p>
                      </div>
                    </Link>

                    <div className="mt-5 lg:mt-3 flex gap-2 md:justify-center items-center lg:justify-center justify-between">
                      <RecApplybutton jobId={job._id} />
                      <SavejobButton jobId={job._id} />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
