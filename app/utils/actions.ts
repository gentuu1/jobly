"use server"

import { dbConnect } from "./dbConnects"

export const signUp = async(daTa :{})=>{
    await dbConnect()

}