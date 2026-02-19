"use client"

import { useTransition } from "react";
import { savedJobs } from "../utils/actions";
import { toast } from "react-toastify";
import { FaRegHeart, FaSpinner } from "react-icons/fa";

interface Props {
    jobId: string
};

const SingleJobSavebut = ({ jobId }: Props) => {

    const [isPending, startTransition] = useTransition();

    const Saved = (jobId: string) => {
        try {

            startTransition(async () => {
                const res = await savedJobs(jobId)

                if (!res.success) {
                    toast.error(res.message, {
                        autoClose: 2000
                    })
                    return;
                } else {
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
                onClick={() => Saved(jobId)}
                type="button"
                className="w-full h-14 rounded-full border border-[#4B3BFF] text-[#4B3BFF] text-lg font-semibold flex items-center justify-center gap-2"
            >

                {
                    isPending ? (
                        <FaSpinner className="inline-block animate-spin" />
                    ) : (
                            <> <FaRegHeart />
                                Save Job</>
                )
            }

            </button>
        </div>
    )
}

export default SingleJobSavebut
