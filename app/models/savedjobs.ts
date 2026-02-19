import { model, models, Schema } from "mongoose";
import { saved_Jobs } from "../utils/type";


const savedJobsSchema = new Schema<saved_Jobs>({
    jobId: {
        type : Schema.Types.ObjectId,
        ref  : "job",
        required : true
    },

    applicantId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

export const savedJobsModel = models.savedjob<saved_Jobs> || model<saved_Jobs>("savedjob", savedJobsSchema)