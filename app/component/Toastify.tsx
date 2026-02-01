"use cient"
import { Slide, ToastContainer } from 'react-toastify'

const Toastify = () => {
  return (
      <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
      />
  )
}

export default Toastify
