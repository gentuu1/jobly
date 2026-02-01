import React from 'react'
import ProfileNavbar from '../component/ProfileNavbar'
import Spinner from '../component/Spinner'

const loading = () => {
  return (
    <div>
        <ProfileNavbar/>
        <Spinner/>
    </div>
  )
}

export default loading
