"use client"
import { useState, useTransition } from 'react'
import { MdOpenInNew } from 'react-icons/md'
import { toast } from 'react-toastify'
import { applyJob } from '../utils/actions'

interface Props {
    jobId: string
};
const RecApplybutton = ({jobId} : Props) => {

    const [isPending, startTransition] = useTransition()
    const [applied, setapplied] = useState(false)

    const alert = async (jobId: string) => {
        startTransition(async () => {
            const res = await applyJob(jobId)

            if (!res.success) {
                toast.error(res.message, {
                    autoClose: 3000
                })
                setapplied(false)
                return;
            }

            toast.success(res.message, {
                autoClose: 3000
            })

            setapplied(true)
        })

    }

    return (
        <div>
            <button
                onClick={() => alert(jobId)}
                type="button"
                className="w-60 md:w-64 lg:w-65 md:mr-0 lg:mr-0   lg:h-15 h-18 md:h-20 md:rounded-full lg:mt-0 mt-0 md:mt-2  rounded-full lg:rounded-3xl bg-[#6754E4] hover:bg-[#3921D7] text-white text-[20px] lg:text-[15px] font-semibold transition-all duration-400">
                {isPending ? (
                    "Applying..."
                ) : applied ? (
                    "Applied"
                ) : (
                    <>
                        Apply Now <MdOpenInNew className="inline-block ml-1" />
                    </>
                )}
            </button>
        </div>
    )
}

export default RecApplybutton
