import { Schema } from "mongoose";

export interface User {
   firstname:string;
   lastname:string;
    email: string;
    password: string;
    isEmployer: boolean;
    photo: string;
    companyName: string;
    companyLogo: string;
    industry: string;
    companySize: string;
    location : string;
    bio:string;
    phone:string
}

export type JWTPayload = {
    _id?: string;
    iat?: number;
    exp?: number;
    success: boolean;
};

export interface datatoUpdatetype {
    companyName?: string;
    industry?: string;
    companySize?: string;
    companyLogo?: string;
    firstname?: string;
    lastname?: string;
    photo?: string;
    phone?: string;
    location?: string;
    bio?: string;
}

export interface Job {
    title: string,
    description: string,
    requirements: string,
    salary: number,
    location: string,
    jobType: string,
    employerId: Schema.Types.ObjectId,
    paymentType: string,
    createdAt : Date
}

export interface applica_tions {
    jobId: Schema.Types.ObjectId,
    applicantId: Schema.Types.ObjectId,
    employerId: Schema.Types.ObjectId
}

export interface JOBS {
    jobType : string,
    _id: string,
    title: string;
    salary: number;
    location: string;
    paymentType: string;
    companyName: string,
    companyLogo: string
}

export interface employerJOBS {
    _id: string,
    title: string,
    description: string,
    requirements: string,
    salary: number,
    location: string,
    jobType:string,
    paymentType: string
}