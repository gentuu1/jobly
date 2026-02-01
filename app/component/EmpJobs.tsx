import React from 'react'
import { empJob } from '../utils/actions'
import { redirect } from 'next/navigation'
import { employerJOBS } from '../utils/type'
import DeleteJob from './DeleteJob'



const EmpJobs = async() => {
    const res = await empJob()
    let  jobs : employerJOBS[] = []
    if(!res.success){
        redirect('/dashboard')
    }

    if(res.jobs){
        jobs = res.jobs
    }

    

  return (
      <div>
          <div className="w-full h-fit bg-[#F4F4F5]">
              <div className="h-20 w-full border-b lg:px-10 md:px-10 px-5 flex flex-col justify-center sticky top-0 bg-[#F4F4F5] z-30">
                  <h3 className="text-3xl font-bold tracking-tight">
                      Jobs Posted by You
                  </h3>
              </div>

              <div className=" m-auto w-[95%] h-[90%] lg:h-[90%] flex flex-col gap-4 py-4 overflow-y-auto">
                  {
                    jobs.length === 0? (
                          <div className="w-full flex flex-col items-center justify-center h-150 md:h-170 lg:h-100 text-center bg-white rounded-lg border border-dashed border-indigo-600">
                              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                  No jobs posted yet
                              </h2>
                            </div>
                    ) : (
                              jobs.map((job) => (
                                  <form
                                      //   action={delJob ( job._id)}
                                      key={job._id}
                                      className="border border-neutral-300 rounded-lg p-5 flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow"
                                  >

                                      <h2 className="text-xl md:text-[25px] font-bold mb-3 capitalize">
                                          {job.title}
                                      </h2>


                                      <p className="text-gray-700 mb-2 lg:text-sm md:text-lg text-sm">
                                          <strong className="text-lg lg:text-[18px] md:text-[21px] font-bold">
                                              Description:
                                          </strong>{" "}
                                          {job.description}
                                      </p>

                                      <p className="text-gray-700 mb-2 lg:text-sm md:text-lg text-sm">
                                          <strong className="text-lg lg:text-[18px] md:text-[21px] font-bold">
                                              Requirements:
                                          </strong>{" "}
                                          {job.requirements}
                                      </p>

                                      <p className="text-gray-700 mb-2 lg:text-sm md:text-lg text-sm">
                                          <strong className="text-lg lg:text-[18px] md:text-[21px] font-bold">
                                              Salary:
                                          </strong>{" "}
                                          ₦{job.salary}
                                      </p>

                                      <p className="text-gray-700 mb-2 lg:text-sm md:text-lg text-sm">
                                          <strong className="text-lg lg:text-[18px] md:text-[21px] font-bold">
                                              Location:
                                          </strong>{" "}
                                          {job.location}
                                      </p>

                                      <p className="text-gray-700 mb-2 lg:text-sm md:text-lg text-sm">
                                          <strong className="text-lg lg:text-[18px] md:text-[21px] font-bold">
                                              Job Type:
                                          </strong>{" "}
                                          {job.jobType}
                                      </p>

                                      <p className="text-gray-700 mb-4 lg:text-sm md:text-lg text-sm">
                                          <strong className="text-lg lg:text-[18px] md:text-[21px] font-bold">
                                              Payment Type:
                                          </strong>{" "}
                                          {job.paymentType}
                                      </p>

                                      <DeleteJob JobId={job._id} />
                                  </form>
                              ))
                    )
                  }
              </div>
          </div>
      </div>

  )
}

export default EmpJobs
