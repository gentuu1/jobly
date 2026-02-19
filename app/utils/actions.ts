"use server"

import { cookies } from "next/headers";
import { userModel } from "../models/users";
import cloudinary from "./cloudinary";
import { dbConnect } from "./dbConnects"
import * as bcrypt from "bcrypt"
import { auth, encrypt, verifyUser } from "./session";
import { redirect } from "next/navigation";
import { datatoUpdatetype } from "./type";
import { revalidatePath, revalidateTag } from "next/cache";
import { jobModel } from "../models/jobs";
import { applicationModel } from "../models/applications";
import { savedJobsModel } from "../models/savedjobs";
import { IoReturnDownForwardSharp } from "react-icons/io5";
const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODE_MAIL,
        pass: process.env.NODE_MAIL_PASS
    },
});

let NEWEMAIL;



export const signUp = async (daTa: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    photo: string;
}) => {
    try {
        await dbConnect()

        daTa.email = daTa.email.toLowerCase().trim()

        const existing = await userModel.findOne({ email: daTa.email })

        if (existing) {
            return {
                success: false,
                message: 'User already exist! please login'
            }
        }

        let uploadedimage;

        if (daTa.photo) {
            uploadedimage = await cloudinary.uploader.upload(daTa.photo, {
                folder: 'utils/action',
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(daTa.password, salt)

        const createUser = {
            ...daTa,
            photo: uploadedimage?.secure_url,
            password: hashpassword
        }

        const user = await userModel.create(createUser)

        const cookieStore = await cookies()
        const token = await encrypt({ _id: user._id.toString() })
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        const message = {
            from: `"Jobly" <${process.env.NODE_MAIL}>`,
            to: user.email,
            subject: "WELCOME MESSAGE",
            html: `<div>
            <div className=" w-full pt-15 ">
                <h1 className="text-3xl font-bold ml-5">Welcome to Jobly</h1>

                <div className="w-full h-90 pl-5 pt-10 pr-4">
                    <p className="text-xl font-medium capitalize ">Hi ${user?.firstname}</p>
                   <p className="text-lg mt-5 mb-5">
                     We’re excited to have you as part of our community. Discover opportunities to learn, connect, and grow—whether you’re starting a new career path or taking your skills to the next level. Dive in and begin your journey with us today!
                    </p>
                    <a className="underline text-lg text-white bg-blue-600" href="">Get job</a>
                    <p className="text-lg ">© 2025 Our Community. All rights reserved.</p>
                </div>
            </div>
        </div>
`,
        };

        await transporter.sendMail(message, function (err: string) {
            if (err) {
                console.log(err);
            }
        });



        return {
            success: true,
            message: 'Account successfully created'
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }

}

export const employerSignup = async (daTa: {
    companyName: string;
    industry: string;
    companySize: string;
    companyLogo: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}) => {
    try {
        await dbConnect();

        daTa.email = daTa.email.toLowerCase().trim()

        if (!daTa.companyName || !daTa.industry || !daTa.companySize) {
            return {
                success: false,
                message: "All company details are required"
            }
        }


        const existingUser = await userModel.findOne({ email: daTa.email })

        if (existingUser) {
            return {
                success: false,
                message: 'User already exist! please login'
            }
        }


        let uploadedimage;

        if (daTa.companyLogo) {
            uploadedimage = await cloudinary.uploader.upload(daTa.companyLogo, {
                folder: 'utils/action',
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(daTa.password, salt)

        const createEmployer = {
            ...daTa,
            companyLogo: uploadedimage?.secure_url,
            password: hashedpassword,
            isEmployer: true
        }

        console.log(createEmployer);


        const user = await userModel.create(createEmployer)

        const cookieStore = await cookies()
        const token = await encrypt({ _id: user._id.toString() });
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        const message = {
            from: `"Jobly" <${process.env.NODE_MAIL}>`,
            to: user.email,
            subject: "WELCOME MESSAGE",
            html: `<div>
            <div className=" w-full pt-15 ">
                <h1 className="text-3xl font-bold ml-5">Welcome to Jobly</h1>

                <div className="w-full h-90 pl-5 pt-10 pr-4">
                    <p className="text-xl font-medium capitalize ">Hi ${user?.firstname}</p>
                    <p className="text-lg mt-5 mb-5">
                      Welcome to Jobly. You’re all set to start hiring smarter. Post roles, review applicants, and connect with top talent efficiently—all from one powerful platform.
                    </p>
                    <a className="underline text-lg text-white bg-blue-600" href="">Get job</a>
                    <p className="text-lg ">© 2025 Our Community. All rights reserved.</p>
                </div>
            </div>
        </div>
`,
        };

        await transporter.sendMail(message, function (err: string) {
            if (err) {
                console.log(err);
            }
        });


        return {
            success: true,
            message: 'Account successfully created'
        }


    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}


export const signIn = async (logData: {
    email: string;
    password: string;
}) => {
    try {
        await dbConnect();

        logData.email = logData.email.toLowerCase().trim()

        const user = await userModel.findOne({ email: logData.email })
        if (!user) {
            return {
                success: false,
                message: "Invalid credentials"
            }
        }

        const isPassword = await bcrypt.compare(logData.password, user.password)

        if (!isPassword) {
            return {
                success: false,
                message: "Invalid credentials"
            }
        }

        const cookieStore = await cookies()
        const token = await encrypt({ _id: user._id.toString() })
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        return {
            message: 'Logged in',
            success: true
        }


    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}


export const proFile = async () => {
    await dbConnect()

    const { success, user } = await verifyUser()

    if (!success) {
        redirect('/signin')
    }

    return {
        firstname: user.firstname,
        lastname: user.lastname,
        isEmployer: user.isEmployer,
        success: true
    }
}

export const fullProfile = async () => {
    try {
        await dbConnect()

        const { success, user } = await verifyUser()

        if (!success) {
            redirect('/signin')
        }

        return {
            firstname: user.firstname,
            lastname: user.lastname,
            companyName: user.companyName,
            industry: user.industry,
            companyLogo: user.companyLogo,
            companySize: user.companySize,
            phone: user.phone,
            location: user.location,
            isEmployer: user.isEmployer,
            bio: user.bio,
            photo: user.photo
        }
    } catch (error) {
        redirect('/signin')
    }
}


export const editBasic = async (data: {
    companyName: string;
    industry: string;
    companySize: string;
    companyLogo: string;
    firstname: string;
    lastname: string;
    photo: string;
    phone: string;
    location: string;
    bio: string;
}) => {
    try {
        await dbConnect()

        const activeUser = await auth()

        if (!activeUser.success) {
            redirect('/signin')
        }

        let uploadedphoto;
        let uploadedcompanyLogo;

        if (data.photo && data.photo.startsWith("data:image")) {
            uploadedphoto = await cloudinary.uploader.upload(data.photo, {
                folder: 'utils/action',
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })

            data.photo = uploadedphoto?.secure_url

            console.log('base64 successfully converted')
            console.log(data.photo)
        };

        if (data.companyLogo && data.companyLogo.startsWith("data:image")) {
            uploadedcompanyLogo = await cloudinary.uploader.upload(data.companyLogo, {
                folder: 'utils/action',
                transformation: [
                    { width: 500, height: 500, crop: 'fill' }
                ]
            })

            data.companyLogo = uploadedcompanyLogo?.secure_url

            console.log('base64 successfully converted')
            console.log(data.companyLogo)
        };

        const datatoUpdate: datatoUpdatetype = {}

        if ("companyName" in data) {
            datatoUpdate.companyName = data.companyName
        };
        if ("industry" in data) {
            datatoUpdate.industry = data.industry
        };
        if ("companySize" in data) {
            datatoUpdate.companySize = data.companySize
        };
        if ("companyLogo" in data) {
            datatoUpdate.companyLogo = data.companyLogo
        };
        if ("firstname" in data) {
            datatoUpdate.firstname = data.firstname
        };
        if ("lastname" in data) {
            datatoUpdate.lastname = data.lastname
        };
        if ("photo" in data) {
            datatoUpdate.photo = data.photo
        };
        if ("phone" in data) {
            datatoUpdate.phone = data.phone
        }
        if ("location" in data) {
            datatoUpdate.location = data.location
        };
        if ("bio" in data) {
            datatoUpdate.bio = data.bio
        }

        const user = await userModel.findByIdAndUpdate({ _id: activeUser._id }, datatoUpdate)
        revalidatePath("/dashboard/profile")
        revalidatePath('/')
        revalidatePath('/dashboard');
        return {
            success: true,
            message: "Profile updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "something went wrong"
        }
    }

};

export const deleteDp = async () => {
    try {
        await dbConnect()
        const { success, user } = await verifyUser()

        if (!success) {
            redirect('/signin')
        }

        if (user.isEmployer) {
            const deldp = await userModel.findByIdAndUpdate({ _id: user._id }, { companyLogo: '' })

            revalidatePath("/dashboard/profile")
            return {
                success: true,
                message: "Company logo successfully deleted"
            }
        }

        const deldp = await userModel.findByIdAndUpdate({ _id: user._id }, { photo: '' })
        revalidatePath("/dashboard/profile")
        return {
            success: true,
            message: "profile picture successfully deleted"
        }



    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export const logOut = async () => {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('token')
        redirect("/signin")

    } catch (error) {
        redirect("/signin")
    }
}

export const changePassword = async (passWords: {
    currentpassword: string;
    newpassword: string;
    confirmpassword: string
}) => {
    try {
        await dbConnect()

        const { _id, success } = await auth()
        if (!success) redirect('/signin');

        if (!passWords.currentpassword) {
            return {
                success: false,
                message: 'Input current password'
            }
        };

        if (!passWords.newpassword) {
            return {
                success: false,
                message: 'Input new password'
            }
        };

        if (passWords.newpassword.length < 8) {
            return {
                success: false,
                message: 'Password must be at least 8 characters'
            }
        };

        if (!passWords.confirmpassword) {
            return {
                success: false,
                message: 'confirm password'
            }
        }

        if (passWords.confirmpassword !== passWords.newpassword) {
            return {
                success: false,
                message: 'Passwords do not match'
            }
        }

        const user = await userModel.findById(_id)

        if (!user) {
            return {
                success: false,
                message: 'User not found'
            }
        }

        const isMatch = await bcrypt.compare(passWords.currentpassword, user.password)

        if (!isMatch) {
            return {
                success: false,
                message: 'Incorrect current password'
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(passWords.newpassword, salt)

        await userModel.findByIdAndUpdate(_id, { password: hashedpassword });

        const cookieStore = await cookies();
        cookieStore.delete("token")

        return {
            success: true,
            message: 'Password updated successfully '
        }

    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }

}


export const postJob = async (jobData: {
    title: string,
    description: string,
    requirements: string,
    salary: number,
    location: string,
    jobType: string,
    paymentType: string
}) => {

    try {
        await dbConnect()
        const { user, success } = await verifyUser();

        if (!success) {
            redirect("/signin")
        };

        if (jobData.salary <= 0) {
            return {
                success: false,
                message: `Salary can't be zero`
            }
        };

        if (jobData.title) {
            jobData.title = jobData.title.toLocaleLowerCase()
        }
        if (jobData.jobType) {
            jobData.jobType = jobData.jobType.toLocaleLowerCase()
        }


        const jobDetails = {
            ...jobData,
            employerId: user._id
        };



        await jobModel.create(jobDetails)
        revalidatePath('/')
        revalidatePath('/dashboard/postedjobs')
        revalidatePath('/dashboard')
        revalidatePath('/dashboard/jobs');

        return {
            success: true,
            message: "Job posted"
        }

    } catch (error) {
        return {
            success: false,
            message: "something went wrong"
        }
    }

}

export const deletePro = async () => {
    try {
        await dbConnect()

        const { success, _id } = await auth()
        if (!success) {
            return {
                success: false,
                message: "Action can not be done, try again later"
            }
        }

        const user = await userModel.findById(_id)

        if (!user) {
            return {
                success: false,
                message: "Account not found"
            }
        }

        if (user.isEmployer) {
            await jobModel.deleteMany({ employerId: _id })
        }
        await userModel.findByIdAndDelete(_id)
        revalidatePath('/dashboard/jobs')
        const cookieStore = await cookies()
        cookieStore.delete("token")

        return {
            success: true,
            message: "Account successfully deleted"
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong, try again later"
        }
    }
}

export const recjoBs = async () => {
    try {
        await dbConnect();

        const jobs = await jobModel.find()
            .sort({ createdAt: -1, _id: -1 })
            .limit(6)
            .populate("employerId", "companyName companyLogo");


        const joB = jobs.map(job => {
            return {
                jobType: job.jobType,
                title: job.title,
                salary: job.salary,
                location: job.location,
                paymentType: job.paymentType,
                companyName: job.employerId.companyName,
                companyLogo: job.employerId.companyLogo,
                _id: job._id.toString(),
            }
        })

        return {
            jobs: joB,
            success: true
        }



    } catch (error) {
        return {
            success: false,
            message: " something went wrong"
        }
    }
}

export const allJObs = async () => {
    try {
        await dbConnect();

        const jobs = await jobModel.find().populate("employerId", "companyName companyLogo").limit(30);

        const randomJobs = jobs.sort(() => Math.random() - 0.5)

        const joB = randomJobs.map(job => {

            return {
                jobType: job.jobType,
                _id: job._id.toString(),
                title: job.title,
                salary: job.salary,
                location: job.location,
                paymentType: job.paymentType,
                companyName: job.employerId.companyName,
                companyLogo: job.employerId.companyLogo

            }
        })

        return {
            jobs: joB,
            success: true
        }

    } catch (error) {
        return {
            success: false,
            message: " something went wrong"
        }
    }
}

export const empJob = async () => {
    try {
        await dbConnect();

        const { success, _id } = await auth();

        if (!success) {
            return {
                success: false,
                message: "Error fetching jobs"
            }
        }

        const employerjobs = await jobModel.find({ employerId: _id })

        const jObs = employerjobs.map(job => {

            const isJob = {
                _id: job._id.toString(),
                title: job.title,
                description: job.description,
                requirements: job.requirements,
                salary: job.salary,
                location: job.location,
                jobType: job.jobType,
                paymentType: job.paymentType
            }
            return isJob
        })

        return {
            message: '',
            success: true,
            jobs: jObs
        }


        // console.log(joBs)

    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}


export const delJob = async (
    JobId: string
) => {
    try {
        await dbConnect();

        const { success, _id } = await auth();
        if (!success) {
            return {
                success: false,
                message: `Action can not be done, try again later`
            }
        }
        const job = await jobModel.findById(JobId)

        if (!job) {
            return {
                success: false,
                message: "Job not found"
            }
        }

        if (job.employerId.toString() !== _id) {
            return {
                success: false,
                message: "You are not allowed to delete this job"
            }
        };

        await jobModel.findByIdAndDelete(JobId)
        await applicationModel.deleteMany({jobId : JobId})
        await savedJobsModel.deleteMany({ jobId: JobId })
        revalidatePath('/dashboard/postedjobs')
        revalidatePath('/dashboard')
        revalidatePath('/')

        return {
            success: true,
            message: 'Job successfully deleted'
        }


    } catch (error) {
        return {
            success: false,
            message: " Something went wrong, try again later"
        }
    }
}


export const applyJob = async (jobId: string) => {
    try {
        await dbConnect();

        const { success, _id } = await auth()

        if (!success) {
            return {
                success: false,
                message: 'Login required'
            }
        };

        const job = await jobModel.findById(jobId).populate("employerId", "companyName companyLogo");

        if (!job) {
            return {
                success: false,
                message: "This job can not be applied for"
            }
        };

        const alreadyApplied = await applicationModel.findOne({
            jobId,
            applicantId: _id,
        });

        if (alreadyApplied) {
            return {
                success: false,
                message: "You already applied for this job"
            }
        };

        if (job.employerId._id.toString() === _id) {
            return {
                success: false,
                message: "You can not apply for your own job"
            }
        }

        await applicationModel.create({
            jobId,
            applicantId: _id,
            employerId: job.employerId._id
        })

        const applicaTions = await applicationModel.findOne({ jobId, applicantId: _id })
            .populate("jobId", "title")
            .populate("employerId", "companyName email")
            .populate("applicantId", "firstname lastname location email")


        const employerMsg = {
            from: `"Jobly" <${process.env.NODE_MAIL}>`,
            to: applicaTions.employerId.email,
            subject: "New Job Application Received",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f5; color: #333;">
      
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
        <h1 style="margin: 0; font-size: 24px; color: #4B3BFF;">Jobly</h1>
      </div>

      <p style="font-size: 18px; margin-top: 20px;">Hi <strong>${applicaTions.employerId.companyName}</strong>,</p>

    
      <p style="font-size: 16px; line-height: 1.5;">
        You have received a new application for your job posting <strong>${applicaTions.jobId.title}</strong>.
      </p>

      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #ddd;">
        <p style="margin: 5px 0;"><strong>Applicant Name:</strong> ${applicaTions.applicantId.firstname} ${applicaTions.applicantId.lastname}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${applicaTions.applicantId.email}</p>
        <p style="margin: 5px 0;"><strong>Location:</strong> ${applicaTions.applicantId.location}</p>
      </div>

      <p style="font-size: 16px; margin-top: 20px; line-height: 1.5; color: #333;">
        Please make sure to contact the applicant as soon as possible regarding this application.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://jobly-w46h.vercel.app/dashboard/applicants" 
           style="background-color: #4B3BFF; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; display: inline-block;">
          View All Applicants
        </a>
      </div>

      <p style="font-size: 14px; color: #666; text-align: center; margin-top: 40px;">
        © 2026 Jobly. All rights reserved.
      </p>
    </div>
  `,
        };

        await transporter.sendMail(employerMsg, function (err: string) {
            if (err) {
                console.log(err);
            }
        });


        const applicantMsg = {
            from: `"Jobly" <${process.env.NODE_MAIL}>`,
            to: applicaTions.applicantId.email,
            subject: "Job Application Submitted Successfully",
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f5; color: #333;">
      
      <!-- Header -->
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
        <h1 style="margin: 0; font-size: 24px; color: #4B3BFF;">Jobly</h1>
      </div>

      <p style="font-size: 18px; margin-top: 20px;">Hi <strong>${applicaTions.applicantId.firstname}</strong>,</p>

      <p style="font-size: 16px; line-height: 1.5;">
        Your application for the position <strong>${applicaTions.jobId.title}</strong> at <strong>${applicaTions.employerId.companyName}</strong> has been successfully submitted.
      </p>

      <p style="font-size: 16px; line-height: 1.5;">
        We hope the employer will contact you soon. Thank you for using Jobly to find your next opportunity!
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://jobly-w46h.vercel.app/dashboard/jobs" 
           style="background-color: #4B3BFF; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; display: inline-block;">
          See More Jobs
        </a>
      </div>

      
      <p style="font-size: 14px; color: #666; text-align: center; margin-top: 40px;">
        © 2026 Jobly. All rights reserved.
      </p>
    </div>
  `,
        };


        await transporter.sendMail(applicantMsg, function (err: string) {
            if (err) {
                console.log(err);
            }
        });


        return {
            success: true,
            message: "Application successfully submited"
        }




    } catch (error) {
        return {
            success: false,
            message: "Something went wrong, try apply later!"
        }
    }
}

export const savedJobs = async (
    jobId: string
) => {
    try {
        await dbConnect();

        const { success, _id } = await auth();

        if (!success) {
            return {
                success: false,
                message: "Login required"
            }
        }

        const job = await jobModel.findById(jobId);

        if (!job) {
            return {
                success: false,
                message: " This job can not be applied for"
            }
        }

        const alreadySaved = await savedJobsModel.findOne({
            jobId,
            applicantId: _id
        })

        if (alreadySaved) {
            return {
                success: false,
                message: " This job has already been saved"
            }
        }

        await savedJobsModel.create({
            jobId,
            applicantId: _id
        })

        return {
            success: true,
            message: "Job saved"
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}

export const fetchSaveJob = async () => {
    try {
        await dbConnect();

        const { success, _id } = await auth()

        if (!success) {
            return {
                success: false,
                message: " Login required"
            }
        }

        const isJobs = await savedJobsModel.find({ applicantId: _id }).populate({
            path: 'jobId',
            select: "title location jobType salary employerId paymentType",
            populate: {
                path: "employerId",
                select: "companyName companyLogo "
            }
        })

        const jobs = isJobs.map(job => {
            const joBs = {
                _id: job.jobId._id.toString(),
                title: job.jobId.title,
                location: job.jobId.location,
                paymentType: job.jobId.paymentType,
                jobType: job.jobId.jobType,
                salary: job.jobId.salary,
                companyName: job.jobId.employerId.companyName,
                companyLogo: job.jobId.employerId.companyLogo
            }

            return joBs
        })



        return {
            success: true,
            jobs: jobs
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Something went wrong."
        }
    }
}

export const applicaTions = async () => {
    try {
        await dbConnect();
        const { success, _id } = await auth()

        if (!success) {
            return {
                success: false,
                message: "Login required"
            }
        }

        const applicaTions = await applicationModel.find({ 
            applicantId: _id,
            applicantDelete : false
         }).populate({
            path: 'jobId',
            select: "title salary paymentType jobType location ",
            populate: {
                path: "employerId",
                select: "companyName companyLogo "
            }
        })

        const jobs = applicaTions.map(job => {
            const jobs = {
                deleTe :  job.employerDelete,
                _id: job._id.toString(),
                title: job.jobId.title,
                location: job.jobId.location,
                paymentType: job.jobId.paymentType,
                jobType: job.jobId.jobType,
                salary: job.jobId.salary,
                companyName: job.jobId.employerId.companyName,
                companyLogo: job.jobId.employerId.companyLogo
            }

            return jobs
        })

        return {
            success: true,
            jobs
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"

        }
    }
}


export const appliCants = async ()=>{
    try {
        await dbConnect();

        const { success, _id} = await auth()

        if(!success){
            return {
                success : false,
                message: "Login required!"
            }
        }

        const isApplicants = await applicationModel.find({
            employerId : _id,
            employerDelete : false
        }).populate({
            path : "applicantId",
            select : "firstname lastname email photo"
        }).populate({
            path:"jobId",
            select: "title  jobType"
        }).sort({_id : -1})

        const applys = isApplicants.map(apply =>{
            const isApplys = {
                deleTe : apply.applicantDelete,
                _id : apply._id?.toString() || '',
                photo : apply.applicantId?.photo || '',
                firstname: apply.applicantId?.firstname || '',
                lastname: apply.applicantId?.lastname || '',
                email : apply.applicantId?.email || '',
                title : apply.jobId?.title || '',
                jobType: apply.jobId?.jobType || '',
            }

            return isApplys
        })

        revalidatePath('/dashboard/applications')
        revalidatePath('/dashboard/applicants')

        return {
            success : true, 
            applys
        }
    } catch (error) {
        console.log(error)
        return {
            success : false,
            message : "Something went wrong"
        }
    }
}


export const delApplications = async(applicationId : string)=>{
    try {
        await dbConnect();

        const {success, _id} = await auth()

        if(!success){
            return {
                success : false,
                message : "Login required"
            }
        }

        const isApplications = await applicationModel.findById(applicationId);

        if(!isApplications){
            return {
                success : false,
                message: "Application not found"
            }
        }

        const isUser = await userModel.findById(_id);

        if(!isUser){
           return {
            success : false,
            message : "User not found"
           }
        }

        if (!isUser.isEmployer && isApplications.applicantId.toString() !== _id) {
            return { success: false, message: "You cannot delete this application" };
        }

        if (isUser.isEmployer && isApplications.employerId.toString() !== _id) {
            return { success: false, message: "You cannot delete this application" };
        }

        if (!isUser.isEmployer && isApplications.applicantId.toString() == _id){
            isApplications.applicantDelete = true
        }

        if (isUser.isEmployer && isApplications.employerId.toString() == _id) {
            isApplications.employerDelete = true
        }

        await isApplications.save()

        revalidatePath('/dashboard/applications')
        revalidatePath('/dashboard/applicants')

        return {
            success : true,
            message: "Application successfully deleted"
        }
   
    } catch (error) {
        console.log(error);
        return {
            success : false,
            message : "Something went wrong"
        }
    }
}


export const delSavedjob = async (jobId : string)=>{
    try {
        await dbConnect();

        const {success, _id} =await auth();

        if(!success){
            return {
                success : false,
                message : "Login required"
            }
        }

        const isUser = await userModel.findOne({
            _id : _id,
            isEmployer : false
        })

        if(!isUser || isUser.isEmployer){
            return {
                success : false,
                message : "User not authorized"
            }
        }

       const deleteJob =  await savedJobsModel.findOneAndDelete({
            jobId,
            applicantId : _id
        })

        if (!deleteJob) {
            return {
                success: false,
                message: "Job not found"
            }
        }

        revalidatePath("/dashboard/savedjobs")
        return  {
            success : true,
            message : "Job successfully removed."
        }
    } catch (error) {
        console.log(error)
        return {
            success : false,
            message : 'Something went wrong'
        }
    }
}

export const searchJob = async(search :string)=>{
    try {
        await dbConnect();

        const {success} = await auth();

        if(!success){
            return {
                success : false,
                message  : "Login required"
            }
        }

        if(!search){
            return{ 
                success : false,
                message: "Please enter a search term"
            }
        };

        const jobs  = await jobModel.find({
            $or : [
                {title : {$regex : search, $options : "i"}},
                {jobType : {$regex : search, $options : "i"}}
            ]
        }).populate('employerId', "companyName companyLogo");

        if(!jobs){
            return {
                success : false,
                message : " No Jobs found"
            }
        };



        const randoms = jobs.sort(() => Math.random() - 0.5)

        const filteredJobs = randoms.map(job => {
            return {
                jobType: job.jobType,
                _id: job._id.toString(),
                title: job.title,
                salary: job.salary,
                location: job.location,
                paymentType: job.paymentType,
                companyName: job.employerId.companyName,
                companyLogo: job.employerId.companyLogo

            }

        })

        return {
            success : true,
            filteredJobs
        }

    } catch (error) {
        console.log(error)
        return {
            success : false,
            message : "Something went wrong"
        }
    }
}









export const reqOTP = async (newEmail: {
    newemail: string;
}) => {
    try {
        await dbConnect()
        const { success, _id } = await auth();

        if (!success) redirect('/signin');

        if (!newEmail.newemail) return { success: false, message: "input new email" }

        const user = await userModel.findById(_id)

        if (!user) redirect('/signin');


        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabet: false });

        const message = {
            from: `"Jobly" <${process.env.NODE_MAIL}>`,
            to: newEmail.newemail,
            subject: "VERIFY NEW EMAIL",
            html: `<div>
                <div className="w-full pt-15">
                    <div>
                    <h1 className="text-3xl font-bold ml-5">
                    Jobly
                    </h1>
                    </div>

                    <div className="w-full h-fit pl-5 pt-10 pr-4">
                        <p className="text-xl font-medium">You're almost done updating your email on Jobly. We just need to verify your new email address. Enter the verification code below on the Jobly Otp confirmation screen.</p>
                    <p className="text-xl font-medium">${OTP}</p>
                    <p className="text-lg mt-5 mb-5">
                        If you did not request this change, please ignore this message. Do not share this code with anyone.
                    </p>
                    </div>
                </div>
                </div>

`,
        };

        await transporter.sendMail(message, function (err: string) {
            if (err) {
                console.log(err);
            }
        });

        return {
            success: true,
            message: 'OTP sent to mail'
        }

    } catch (error) {
        return {
            success: false,
            message: "Something went wrong"
        }
    }
}


