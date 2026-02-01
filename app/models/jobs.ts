import { Job } from "@/app/utils/type";
import { model, models, Schema } from "mongoose";

const jobsSchema = new Schema<Job>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    employerId: { type: Schema.Types.ObjectId, ref:'user', required: true },
    paymentType: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

export const jobModel = models.job<Job> || model<Job>("job", jobsSchema)