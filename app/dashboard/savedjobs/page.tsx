import ProfileNavbar from '@/app/component/ProfileNavbar'
import Image from 'next/image'
import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'

const Page = () => {
    const jobss = [
        {
            companyLogo: 'https://images-workbench.99static.com/29Uq-OCdMn3kQwfxF2O3trrp2fM=/99designs-contests-attachments/54/54227/attachment_54227073',
            salary: 2000,
            paymentType: "hourly",
            title: 'assistance',
            companyName: "royal",
            location: 'osogbo, osun',

        },
        {
            companyLogo: 'https://images-workbench.99static.com/29Uq-OCdMn3kQwfxF2O3trrp2fM=/99designs-contests-attachments/54/54227/attachment_54227073',
            salary: 2000,
            paymentType: "hourly",
            title: 'assistance',
            companyName: "royal",
            location: 'osogbo, osun',

        },
        {
            companyLogo: 'https://images-workbench.99static.com/29Uq-OCdMn3kQwfxF2O3trrp2fM=/99designs-contests-attachments/54/54227/attachment_54227073',
            salary: 2000,
            paymentType: "hourly",
            title: 'assistance',
            companyName: "royal",
            location: 'osogbo, osun',

        }
    ]

  return (
    <div className='md:pb-25'>
        <ProfileNavbar/>
          <div className='w-full border h-fit bg-white'>

              <div className='border h-24 w-full mt-5 flex flex-col justify-center px-3'>
                  <h3 className='lg:text-3xl text-4xl md:text-5xl  font-bold tracking-tight'>Saved jobs</h3>
                  
              </div>

              <div className='border w-full h-fit  p-3 md:p-0'>
                  <div className='border w-full h-fit md:h-fit grid lg:grid-cols-3 gap-5 md:gap-4 md:grid-cols-2 md:px-2 grid-cols-1 pt-5'>
                      {
                          jobss.map((job, index) => (
                              <form key={index} className='bg-white lg:min-h-85 md:min-h-110 h-95 rounded-2xl shadow-lg border border-neutral-400 '>

                                  <div className="w-[95%] h-20 lg:h-17 md:h-20 mb-5 m-auto flex  justify-between   border">
                                      <div className='border w-20 '>
                                          <Image
                                              src={job.companyLogo}
                                              alt='companyLogo'
                                              height={500}
                                              width={500}
                                              loading="eager"
                                              className='h-full w-full object-cover rounded-lg'
                                          />
                                      </div>
                                      <div className='border w-fit text-right '>
                                          <h1 className="text-3xl lg:text-2xl md:text-4xl font-bold ">₦{job.salary}</h1>
                                          <p className="text-lg lg:text-sm md:text-lg">{job.paymentType}</p>
                                      </div>
                                  </div>

                                  <div className=" h-70 lg:h-60 md:h-85 w-[95%] m-auto ">
                                      <h3 className="text-2xl lg:text-xl md:text-3xl  font-semibold capitalize line-clamp-2">{job.title}</h3>
                                      <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize">{job.companyName}</p>
                                      <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize inline-block ">{job.location}</p>
                                      <div className=" w-full flex mt-2 h-15 lg:h-10 items-center gap-2">
                                          <p className=" h-10 lg:h-8 rounded-sm text-center lg:w-25 w-30 text-xl lg:text-sm font-bold text-[#005647] bg-[#D1FFF7] content-center ">Just posted</p>
                                          <p className=" h-10 lg:h-8 lg:w-30 rounded-sm text-center w-40 text-xl lg:text-sm font-bold text-[#422BD9] bg-[#D9D9FC] content-center ">Urgent hiring</p>
                                      </div>

                                      <div className=" mt-5 lg:mt-3 flex gap-2 border md:justify-start items-center lg:justify-start ">
                                          <button className="w-65 mr-2 md:w-70 lg:w-75 md:mr-3 lg:mr-2  lg:h-15 h-18 md:h-20 md:rounded-full lg:mt-0 mt-0 md:mt-2  rounded-full lg:rounded-3xl bg-[#6754E4] hover:bg-[#3921D7] text-white text-[20px] lg:text-[15px] font-semibold transition-all duration-400">
                                              Apply Now <MdOpenInNew className="inline-block" />
                                          </button>
                                          <button className="w-18 h-18 md:h-20 md:w-20 lg:h-15 lg:w-15 rounded-[100%]  bg-transparent border border-[#4B3BFF] text-[#4B3BFF] text-[20px] font-semibold transition-all duration-400">
                                              <FaRegHeart className="inline-block bg-transparent" />
                                          </button>
                                      </div>

                                  </div>
                              </form>
                          ))
                      }


                  </div>
              </div>
          </div>
    </div>
  )
}

export default Page
