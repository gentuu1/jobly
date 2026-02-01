"use client"

import { useTransition } from "react";
import { delJob } from "../utils/actions";
import { toast } from "react-toastify";

interface Props {
    JobId : string;
}

const DeleteJob = ({
    JobId
}: Props) => {
    const [isPending, startTransition]= useTransition()
    
    const dJob = (JobId : string)=>{
        try {
            startTransition(async()=>{
                const res = await delJob(JobId)

                if(!res.success){
                    toast.error(res.message, {
                        autoClose : 2000
                    })
                    return;
                }

                toast.success(res.message, {
                    autoClose : 2000
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
  return (
      <div className="flex justify-end pt-2 border-t">
          <button
                onClick={()=>dJob(JobId)}
              type='button'
              className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-1.5 rounded-md"
          >
             {
                isPending ? "Deleting..." : "Delete"
            }
          </button>
      </div>
  )
}

export default DeleteJob
