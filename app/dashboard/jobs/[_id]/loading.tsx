import ProfileNavbar from '@/app/component/ProfileNavbar'
import Spinner from '@/app/component/Spinner'

const loading = () => {
  return (
    <div>
      <ProfileNavbar/>
      <Spinner/>
    </div>
  )
}

export default loading
