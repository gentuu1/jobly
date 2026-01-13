"use client"
import ForgotNavbar from '@/app/component/ForgotNavbar'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    const formik = useFormik({
        initialValues:{
            newpassword:''
        },
        onSubmit:(values)=>{
            console.log(values);
        },

        validationSchema : yup.object({
            newpassword: yup.string().required('Required').min(8, 'Password must be at least 8 characters')
        })
    })

  return (
    <div>
      <ForgotNavbar/>

          <section className=" lg:w-xl md:w-[70%] w-full h-fit px-5 flex flex-col justify-center m-auto mt-5">
              <h1 className="lg:text-3xl md:text-4xl text-3xl tracking-tight text-center text-[#262262]">Update password</h1>
              <input
                  className={`${formik.errors.newpassword && formik.touched.newpassword ? 'border-red-600 ' : 'border-neutral-300 hover:border-[#3921D7]'} lg:h-12 md:h-14 h-12 md:text-[17px] text-[17px] lg:text-sm px-2 outline-0 border  rounded-sm mt-5 `}
                  placeholder="New password"
                  name="newpassword"
                  type="password"
                  onChange={formik.handleChange}
              />
              {
                  formik.errors.newpassword && formik.touched.newpassword && (
                      <small className='text-red-600 text-[15px] lg:text-[14px] md:text-[17px]'>{formik.errors.newpassword}</small>
                  )
              }

              <div className="flex justify-end-safe h-fit items-center pl-auto gap-2 mt-3">
                  <Link href='/signin'>
                      <button className="lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8  py-3 px-6.5  text-[#3921D7] font-semibold bg-transparent hover:bg-[#F4F4F5] rounded-3xl cursor-pointer transition-all duration-300">Cancel</button>
                  </Link>

                  {/* confirm email button */}
                  <button type='button' onClick={() => formik.handleSubmit()} className={`lg:text-[17px] md:text-[20px] text-[20px] lg:py-3 lg:px-7 md:py-4 md:px-8 py-3 px-6.5  text-white font-semibold bg-[#4B3BFF] hover:bg-[#3921D7] rounded-3xl cursor-pointer transition-all duration-300`}>Update</button>
              </div>
          </section>
    </div>
  )
}

export default Page
