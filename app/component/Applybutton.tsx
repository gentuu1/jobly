"use client"
import { useState, useTransition } from 'react'
import { MdOpenInNew } from 'react-icons/md'
import { toast } from 'react-toastify'
import { applyJob } from '../utils/actions'

interface Props {
    jobId: string
};

const Applybutton = ({ jobId }: Props) => {

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
                className="w-full h-14 rounded-full bg-[#6754E4] hover:bg-[#3921D7] text-white text-lg font-semibold transition"
            >
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

export default Applybutton
