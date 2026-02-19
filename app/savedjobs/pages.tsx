import React from 'react'

const Pages = () => {
  return (
      <div className="min-h-screen bg-[#F4F4F5] pb-20">
          {/* Header */}
          <div className="h-24 w-full flex flex-col justify-center px-4 border-b bg-white">
              <h2 className="text-3xl font-bold tracking-tight">Saved Jobs</h2>
              <p className="text-[18px] text-gray-600">
                  Jobs you saved to apply later
              </p>
          </div>

          {/* Saved Jobs Grid */}
          <div className="w-full max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Saved Job Card */}
              <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between">

                  {/* Top */}
                  <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                          <div className="w-14 h-14 rounded-lg bg-gray-100" />
                          <div>
                              <h3 className="text-xl font-semibold line-clamp-2">
                                  Frontend Developer
                              </h3>
                              <p className="text-sm text-gray-500">
                                  Google • Remote
                              </p>
                          </div>
                      </div>

                      {/* Remove Button */}
                      <button className="text-red-500 text-sm font-semibold hover:underline">
                          Remove
                      </button>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-2 mt-3">
                      <span className="px-3 py-1 text-sm font-semibold rounded bg-[#D1FFF7] text-[#005647]">
                          Full-time
                      </span>
                      <span className="px-3 py-1 text-sm font-semibold rounded bg-[#D9D9FC] text-[#422BD9]">
                          Urgent
                      </span>
                  </div>

                  {/* Salary */}
                  <p className="text-xl font-bold mt-3">
                      ₦500,000
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4">
                      <button className="flex-1 py-2 rounded-lg border border-[#4B3BFF] text-[#4B3BFF] font-semibold">
                          View Job
                      </button>

                      <button className="flex-1 py-2 rounded-lg bg-[#4B3BFF] text-white font-semibold">
                          Apply
                      </button>
                  </div>

              </div>

              {/* Repeat Card for other saved jobs */}

          </div>
      </div>

  )
}

export default Pages
