"server only"

import { jwtVerify, SignJWT } from "jose"
import { JWTPayload } from "./type"
import { cookies } from "next/headers"
import { userModel } from "../models/users"
import { dbConnect } from "./dbConnects"

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET)


export const encrypt = (payload: { _id: string }) => {
    const token = new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime("2d")
        .sign(encodedKey)

    return token
}

export const decrypt = async (token: string): Promise<JWTPayload> => {
    try {
        const { payload } = await jwtVerify(token, encodedKey, { algorithms: ['HS256'] })
        //{payload:{_id:""}}
        return { ...payload, success: true }
    } catch (error) {
        return { success: false }
    }
}

export const verifyUser = async () => {
    await dbConnect()
    const { _id, success } = await auth()
    if (!success) {
        return {
            success: false
        }
    }

    const user = await userModel.findById(_id)

    if (!user) {
        return {
            success: false,
        }
    }

    return {
        success: true,
        user
    }
}

export const auth = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        return {
            success: false
        }
    }

    const { _id, success } = await decrypt(token)

    if (!success) {
        return {
            success: false
        }
    }

    return {
        _id,
        success: true
    }
}