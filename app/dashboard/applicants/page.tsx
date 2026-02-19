"use client"
import ProfileNavbar from '@/app/component/ProfileNavbar'
import Spinner from '@/app/component/Spinner'
import { appliCants, delApplications } from '@/app/utils/actions'
import { applicantInfo } from '@/app/utils/type'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { FiUserX, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'

const Page = () => {
  const router = useRouter()
  const [applicants, setapplicants] = useState<applicantInfo[]>([])
  const [isLoading, setisLoading] = useState(true)
  const [pendingId, setPendingId] = useState<string | null>(null)


  useEffect(() => {
    const applicants = async () => {
      const res = await appliCants()

      if (!res.success) {
        toast.error(res?.message, {
          autoClose: 2000
        })
        setisLoading(false)
        return;
      }

      setapplicants(res.applys || [])
      setisLoading(false)
    }

    applicants()
  }, [])

  const RejApplication = async (_id: string) => {
      setPendingId(_id)
      const res = await delApplications(_id)

      if (!res.success) {
        toast.error(res.message, {
          autoClose: 2000
        })

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
    <div className="min-h-screen bg-gray-100 pb-20 md:pb-25 lg:pb-5">
      <ProfileNavbar />

      <div className='p-6 border-b mb-3'>
        <h1 className="text-3xl lg:text-4xl md:text-4xl font-bold">Applicants</h1>
      </div>


      <div className="space-y-4 lg:px-5 px-3">
        {applicants.length > 0 ? (
          applicants.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md lg:p-5 md:p-5 p-2 flex items-center gap-4"
            >
              {/* Profile Picture */}
              <Image
                src={item.photo || "/img/profileimage.jpg"}
                alt="Profile"
                width={500}
                height={500}
                className="w-16 h-16 md:h-18 md:w-18 rounded-full object-cover border"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className={`text-lg md:text-2xl font-semibold capitalize 
                     ${item.deleTe ? "line-through text-gray-400" : ""}`}>
                    {item.firstname} {item.lastname}
                  </h2>

                  {item.deleTe && (
                    <span className="text-red-500 text-sm md:text-base font-semibold line-through">
                      Deleted
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-lg">
                  <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                    {item.email}
                  </a>
                </p>

                <div className="mt-2">
                  <p className="font-medium text-gray-800 text-lg capitalize">
                    <strong className='md:text-2xl text-lg '>  Applied for:</strong> {item.title}
                  </p>

                  <p className="text-lg text-gray-500 capitalize">
                    {item.jobType}
                  </p>
                </div>
              </div>

              <button onClick={() => RejApplication(item._id)} className="text-gray-400 hover:text-red-500 text-lg border lg:p-3 p-2">
                {
                  pendingId === item._id
                    ? <FaSpinner className='animate-spin' />
                    : <FiX />

                }
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center italic py-6 flex items-center justify-center gap-2">
            <FiUserX className="text-xl" /> No applicants have applied for your jobs yet.
          </p>
        )}
      </div>
    </div>


  )
}

export default Page
