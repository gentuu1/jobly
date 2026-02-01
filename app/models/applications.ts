import { model, models, Schema } from "mongoose";
import { applica_tions } from "../utils/type";



const applicationSchema = new Schema<applica_tions>({
    jobId: { type: Schema.Types.ObjectId, ref: 'job', required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

export const applicationModel = models.application<applica_tions> || model<applica_tions>("application", applicationSchema)