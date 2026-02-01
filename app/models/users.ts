
import { model, models, Schema } from "mongoose";
import { User } from "../utils/type";


const userSchema = new Schema<User>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }, 
    email: { type: String, required: true },
    password: { type: String, required: true },
    isEmployer: { type: Boolean, required: true, default: false },
    photo: { type: String, required: false },
    companyName: { type: String, required: false },
    companyLogo: { type: String, required: false },
    industry: { type: String, required: false },
    companySize: { type: String, required: false },
    location : {type : String, required: false},
    bio:{type: String, required:false},
    phone:{type:String, required:false}
})

export const userModel = models.user<User> || model<User>('user', userSchema)