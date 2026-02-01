import EmpJobs from '@/app/component/EmpJobs'
import ProfileNavbar from '@/app/component/ProfileNavbar'

const Page = () => {
  return (
    <div className='pb-20 md:pb-25 lg:pb-0'>
        <ProfileNavbar/>
      <EmpJobs/>
    </div>
  )
}

export default Page
