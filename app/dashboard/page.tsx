
import { FaRegHeart } from 'react-icons/fa'
import { LuFilePlus, LuFiles } from 'react-icons/lu'
import { FiUsers } from 'react-icons/fi'
import { MdOpenInNew, MdPostAdd } from 'react-icons/md'
import Link from 'next/link'
import ProfileNavbar from '../component/ProfileNavbar'
import { proFile } from '../utils/actions'
import Recentjob from '../component/Recentjob'


const Page = async() => {

  const {isEmployer, firstname} = await proFile();


 

  return (
    <div className=' w-full overflow-x-hidden overflow-y-auto pb-15 md:pb-30 lg:pb-0'>
      <ProfileNavbar />

      <header className={`${isEmployer ? "h-fit" : "h-70 lg:h-60"} w-full flex flex-col mt-5 px-3 md:px-7`}>
        <h1 className='text-3xl lg:text-3xl md:text-5xl font-bold capitalize'>{`hi,  ${firstname}`}</h1>
        <div className='w-full h-fit grid  grid-cols-2 lg:grid-cols-3 py-5 gap-5'>
          <div className={`${isEmployer ? 'hidden' : 'flex'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
            <FaRegHeart className='text-3xl md:text-4xl text-[#4B3BFF]' />
            <p className='text-[22px] md:text-[25px] font-semibold'>Saved jobs</p>
          </div>
          <div className={`${isEmployer ? 'hidden' : 'flex'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
            <LuFiles className='text-3xl md:text-4xl text-[#4B3BFF]' />
            <p className='text-[22px] md:text-[25px] font-semibold'>Applications</p>
          </div>
          <Link href='/dashboard/postedjobs'>
            <div className={`${isEmployer ? 'flex' : 'hidden'} lg:max-w-100 border min-h-30 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
              <LuFilePlus className='text-3xl md:text-4xl text-[#4B3BFF]' />
              <p className='text-[22px] md:text-[25px] font-semibold'>Posted jobs</p>
            </div>
          </Link>
          <div className={`${isEmployer ? 'flex' : 'hidden'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
            <FiUsers className='text-3xl md:text-4xl text-[#4B3BFF]' />
            <p className='text-[22px] md:text-[25px] font-semibold'>Applicants</p>
          </div>
          <Link href='/dashboard/postjob'>
            <div className={`${isEmployer ? 'flex' : 'hidden'} border min-h-30 lg:max-w-100 rounded-xl border-[#A9A9AF] hover:border-black flex-col gap-3 px-5 justify-center `}>
              <MdPostAdd className='text-3xl md:text-4xl text-[#4B3BFF]' />
              <p className='text-[22px] md:text-[25px] font-semibold'>Post a job</p>
            </div>
          </Link>
        </div>
      </header>

      <hr className='w-[90%] md:w-[95%] lg:w-[95%] m-auto my-10 md:my-15 lg:my-15 border-neutral-400' />

      {
        !isEmployer && <div>
          <Recentjob/>
        </div>
      }
    </div>
  )
}

export default Page