import React from 'react'

const Spinner = () => {
  return (
      <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
  )
}

export default Spinner
