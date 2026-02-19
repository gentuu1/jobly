"use client"
import { toast } from 'react-toastify';
import { savedJobs } from '../utils/actions';
import { FaRegHeart, FaSpinner } from 'react-icons/fa';
import { useTransition } from 'react';

interface Props {
    jobId : string
}

const SavejobButton = ({jobId} : Props) => {

    const [isPending, startTransition] = useTransition();

    const Saved = (jobId : string) =>{
        try {

            startTransition(async()=>{
                const res = await savedJobs(jobId)

                if(!res.success){
                    toast.error(res.message, {
                        autoClose : 2000
                    })
                    return;
                }else{
                    toast.success(res.message, {
                        autoClose: 2000
                    })
                }
                
            })
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                autoClose: 2000
            })
        }
    }
  return (
    <div>
          <button
          type='button'
          onClick={()=>Saved(jobId)}
          className="w-18 h-18 md:h-20 md:w-20 lg:h-15 lg:w-15 rounded-[100%]  bg-transparent border border-[#4B3BFF] text-[#4B3BFF] text-[20px] font-semibold transition-all duration-400">
             {
                isPending ? (
                      <FaSpinner className="inline-block animate-spin" />
                ) : (
                     <FaRegHeart className="inline-block" />
                )
             }
          </button>
    </div>
  )
}

export default SavejobButton
