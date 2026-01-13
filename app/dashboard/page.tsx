import { FaRegBell, FaRegHeart, FaSearch } from 'react-icons/fa'
import { LuFilePlus, LuFiles } from 'react-icons/lu'
import {  FiUsers } from 'react-icons/fi'
import { MdOpenInNew, MdPostAdd } from 'react-icons/md'
import Link from 'next/link'
import ProfileNavbar from '../component/ProfileNavbar'


const Page = async () => {
    const user = {
        isEmployer :true,
        fullname : 'sodiq'
    }

    return (
        <div className=' w-full overflow-x-hidden overflow-y-auto pb-15 md:pb-30 lg:pb-0'>
          <ProfileNavbar/>
        
            <header className={`${user.isEmployer ? "h-fit" : "h-70 lg:h-60"} w-full flex flex-col mt-5 px-3 md:px-7`}>
                <h1 className='text-4xl lg:text-3xl md:text-5xl font-bold capitalize'>{`hi,  ${user.fullname}`}</h1>
                <div className='w-full h-fit grid  grid-cols-2 lg:grid-cols-3 py-5 gap-5'>
                    <div className={`${user.isEmployer ? 'hidden' : 'flex'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
                        <FaRegHeart className='text-3xl md:text-4xl text-[#4B3BFF]' />
                        <p className='text-[22px] md:text-[25px] font-semibold'>Saved jobs</p>
                    </div>
                    <div className={`${user.isEmployer ? 'hidden' : 'flex'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
                        <LuFiles className='text-3xl md:text-4xl text-[#4B3BFF]' />
                        <p className='text-[22px] md:text-[25px] font-semibold'>Applications</p>
                    </div>
                    <div className={`${user.isEmployer ? 'flex' : 'hidden'} lg:max-w-100 border min-h-30 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
                        <LuFilePlus className='text-3xl md:text-4xl text-[#4B3BFF]' />
                        <p className='text-[22px] md:text-[25px] font-semibold'>Posted jobs</p>
                    </div>
                    <div className={`${user.isEmployer ? 'flex' : 'hidden'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
                        <FiUsers className='text-3xl md:text-4xl text-[#4B3BFF]' />
                        <p className='text-[22px] md:text-[25px] font-semibold'>Applicants</p>
                    </div>
                    <Link href=''>
                        <div className={`${user.isEmployer ? 'flex' : 'hidden'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
                            <MdPostAdd className='text-3xl md:text-4xl text-[#4B3BFF]' />
                            <p className='text-[22px] md:text-[25px] font-semibold'>Post a job</p>
                        </div>
                    </Link>
                </div>
            </header>

            <hr className='w-[90%] md:w-[95%] lg:w-[95%] m-auto my-10 md:my-15 lg:my-15 border-neutral-400'/>

            <div>
                  {/* <RecentJob /> */}
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
                          {/* { */}
                
                          <form className="w-[95%] border lg:w-100 md:max-w-140 h-95 lg:h-85 md:h-110 m-auto rounded-2xl p-2  shadow-lg border-neutral-400">
                
                            <div className="w-[95%] h-20 lg:h-17 md:h-20 m-auto flex  justify-between   border">
                              <div className='border w-30 '>
                                {/* <Image
                                      src={}
                                      alt='companyLogo'
                                      height={500}
                                      width={500}
                                      loading="eager"
                                      className='h-full w-full object-cover'
                                    /> */}
                                <h1>companyLogo</h1>
                              </div>
                              <div className='border w-fit text-right '>
                                <h1 className="t ext-3xl lg:text-2xl md:text-4xl font-bold ">₦{1000}</h1>
                                <p className="text-lg lg:text-sm md:text-lg">{"Hourly"}</p>
                              </div>
                            </div>
                
                            <div className=" h-70 lg:h-60 md:h-85 w-[95%] m-auto ">
                              <h3 className="text-2xl lg:text-xl md:text-3xl  font-semibold capitalize line-clamp-2">{"jobbb.title"}</h3>
                              <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize">{"jobbb.companyName"}</p>
                              <p className="text-[20px] md:text-[25px] lg:text-[15px] capitalize inline-block ">{"jobbb.location"}</p>
                              <div className=" w-full flex mt-2 h-15 lg:h-10 items-center gap-2">
                                <p className=" h-10 lg:h-8 rounded-sm text-center lg:w-25 w-30 text-xl lg:text-sm font-bold text-[#005647] bg-[#D1FFF7] content-center ">Just posted</p>
                                <p className=" h-10 lg:h-8 lg:w-30 rounded-sm text-center w-40 text-xl lg:text-sm font-bold text-[#422BD9] bg-[#D9D9FC] content-center ">Urgent hiring</p>
                              </div>
                
                              <div className=" mt-5 lg:mt-3 flex gap-2 border md:justify-start items-center lg:justify-start ">
                                <button className="w-60 md:w-100 lg:w-75 md:mr-5 lg:mr-0  lg:h-15 h-18 md:h-20 md:rounded-full lg:mt-0 mt-0 md:mt-2  rounded-full lg:rounded-3xl bg-[#6754E4] hover:bg-[#3921D7] text-white text-[20px] lg:text-[15px] font-semibold transition-all duration-400">
                                  Apply Now <MdOpenInNew className="inline-block" />
                                </button>
                                <button className="w-18 h-18 md:h-20 md:w-20 lg:h-15 lg:w-15 rounded-[100%]  bg-transparent border border-[#4B3BFF] text-[#4B3BFF] text-[20px] font-semibold transition-all duration-400">
                                  <FaRegHeart className="inline-block bg-transparent" />
                                </button>
                              </div>
                
                            </div>
                
                          </form>
                          {/* )) */}
                          {/* } */}
                        </div>
                      </div>
            </div>
        </div>
    )
}

export default Page