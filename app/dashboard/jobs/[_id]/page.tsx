import Applybutton from '@/app/component/Applybutton'
import ProfileNavbar from '@/app/component/ProfileNavbar'
import { jobModel } from '@/app/models/jobs'
import { dbConnect } from '@/app/utils/dbConnects'
import Image from 'next/image'
import { FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa'
import { MdOpenInNew } from 'react-icons/md'

const Page = async ({ params }: { params: { _id: string } }) => {
  await dbConnect()
  const {_id} = await params

  const product = await jobModel
    .findById(_id)
    .populate('employerId', 'companyLogo companyName')

  if (!product) return null

  return (
    <div className="min-h-screen bg-[#F4F4F5] pb-20">
      <ProfileNavbar />

    
      <div className="w-full bg-white">

        <div className="max-w-6xl w-full mx-auto px-5 py-8 flex flex-col gap-4">

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden border bg-white">
              <Image
                src={product.employerId.companyLogo}
                alt="Company logo"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="md:text-3xl text-[25px] font-bold capitalize">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 capitalize">
                {product.employerId.companyName}
              </p>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <FaMapMarkerAlt />
                <span className="capitalize">{product.location}</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-bold">₦{product.salary}</p>
              <p className="text-gray-600">{product.paymentType}</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 text-sm font-semibold rounded-md bg-[#D1FFF7] text-[#005647]">
              {product.jobType}
            </span>
            <span className="px-3 py-1 text-sm font-semibold rounded-md bg-[#D9D9FC] text-[#422BD9]">
              Urgent hiring
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-5 mt-8 flex flex-col lg:flex-row gap-6">
        
        <div className="lg:flex-2 bg-white rounded-2xl shadow p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-2">Job Description</h2>
            <p className="text-gray-700 text-lg leading-relaxed ">
              {product.description}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-2">Requirements</h2>
            <p className="text-gray-700 text-lg leading-relaxed ">
              {product.requirements}
            </p>
          </section>
        </div>
        
        <div className="lg:flex-1 bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
          <form className="flex flex-col gap-4">
            <Applybutton jobId ={product._id.toString()}/>

            <button
              type="button"
              className="w-full h-14 rounded-full border border-[#4B3BFF] text-[#4B3BFF] text-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaRegHeart />
              Save Job
            </button>

            <p className="text-sm text-gray-500 text-center mt-2">
              You can apply directly on this platform
            </p>
          </form>
        </div>

      </div>


    </div>
  )
}

export default Page
