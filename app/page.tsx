import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import NavBar from "./component/Navbar";
import Recentjob from "./component/Recentjob";


export default function Home() {
  return (
    <div className="min-h-fit">
      <NavBar />

      <header className=" w-full lg:w-screen flex flex-col lg:pt-30 pt-35 items-center mt-2 lg:h-175 h-160 bg-[url('/img/homeImage.png')] bg-cover bg-center ">
        <h1 className="lg:text-6xl md:text-6xl text-5xl font-bold text-white text-center lg:mt-35 mt-20">
          Find work you'll love, fast.
        </h1>

        <div className="w-full md:h-75 lg:h-75 h-70 lg:mt-25 mt-15 bg-[#5742EE] opacity-80 flex flex-col lg:flex-row md:flex-row items-center lg:gap-0 md:gap-5 gap-5 lg:justify-between lg:px-10 md:px-5">
          <div className="lg:w-180 md:w-150  w-full text-center lg:text-start md:text-start  h-30 lg:px-15 px-5 flex flex-col justify-center lg:mt-0 mt-5">
            <h1 className="lg:text-4xl md:text-4xl text-3xl font-bold text-white">Experience the new way to work</h1>
            <p className="lg:text-3xl md:text-3xl text-[22px] font-medium  text-white lg:mt-0 mt-2"> See jobs we've picked just for you</p>
          </div>

          <button className="hover:bg-white/20 lg:py-3 md:py-4 md:px-8 py-4 px-8 lg:px-7 text-lg text-white font-medium bg-transparent rounded-full border-white border">
            Get Started
          </button>
        </div>
      </header>

      <Recentjob />



      <section className="w-full lg:px-7">
        <div className=" w-full h-fit flex flex-col lg:flex-row md:flex-row ">

          <div className="w-full h-90 lg:h-120 md:h-130 lg:w-7xl md:w-4xl ">
            <Image
              src={'/img/editorial.jpg'}
              alt="bg image"
              width={500}
              height={500}
              className="h-full w-full object-cover object-right md:object-center"
            />
          </div>

          <div className="w-full h-90 lg:h-120 md:h-130 md:pl-10 p-5 bg-[#E9E9EA] content-center lg:p-10 lg:bg-white md:bg-white">
            <h2 className="text-[45px] font-bold md:text-[50px] ">Let the jobs find you</h2>
            <p className="text-xl md:text-[25px] mb-4">Create your free profile to get interview invites and jobs that work for you.</p>
            <button className="bg-[#624ced] hover:bg-[#3921D7] text-white text-2xl font-semibold px-10 py-4 mt-5 rounded-full duration-300 transition-all">Get hired</button>
          </div>
        </div>

        <div className="w-full h-fit flex flex-col lg:flex-row-reverse md:flex-row-reverse ">

          <div className="w-full h-90 lg:h-120 md:h-130 lg:w-7xl md:w-4xl  ">
            <Image
              src={'/img/jobfindyou.jpg'}
              alt="bg image"
              width={500}
              height={500}
              className="h-full w-full object-cover object-right md:object-center"
            />
          </div>

          <div className="w-full lg:w-[50% ] h-90 lg:h-120 md:h-130 md:pl-10 p-5 bg-[#E9E9EA] content-center lg:p-10 lg:bg-white md:bg-white">
            <h2 className="text-[45px] font-bold md:text-[50px] ">Your job is personal</h2>
            <p className="text-xl mb-4 md:text-[25px]">Tell us more about your goals and we'll match you with the right jobs to help you reach them.</p>
            <button className="bg-[#624ced] hover:bg-[#3921D7] text-white text-2xl font-semibold px-10 py-4 mt-5 rounded-full duration-300 transition-all">See Jobs</button>
          </div>
        </div>

        <div className=" w-full h-fit flex flex-col lg:flex-row md:flex-row ">

          <div className="w-full h-90 lg:h-120 md:h-130 lg:w-7xl md:w-4xl">
            <Image
              src={'/img/paperwork.jpg'}
              alt="bg image"
              width={500}
              height={500}
              className="h-full w-full object-cover object-right md:obect-center"
            />
          </div>

          <div className="w-full lg:w-[50% ] h-90 lg:h-120 md:h-130 md:pl-10 p-5 bg-[#E9E9EA] content-center lg:p-10 lg:bg-white md:bg-white">
            <h2 className="text-[45px] font-bold md:text-[50px]  ">Skip the paperwork</h2>
            <p className="text-xl mb-4 md:text-[25px] ">Your profile is your application. Apply to get jobs instantly.</p>
            <Link href='/signup'> <button className="bg-[#624ced] hover:bg-[#3921D7] text-white text-2xl font-semibold px-10 py-4 mt-5 rounded-full duration-300 transition-all">Create profile</button></Link>
          </div>
        </div>
      </section>

      <div className="w-full h-fit flex flex-col gap-5 items-center pt-10 pb-2 ">
        <hr className="w-[95%] my-10 md:my-15" />
        <h1 className="lg:text-4xl md:text-4xl text-3xl font-semibold text-center">Still haven't found what you're looking for?</h1>
        <Link href=''>
          <button className="lg:py-4 lg:px-6 md:py-5 md:px-10 px-10 py-5 lg:text-lg md:text-2xl text-lg bg-[#624ced] hover:bg-[#3921D7] text-white rounded-full font-semibold">Browse jobs</button>
        </Link>
      </div>
      
    </div>
  );
}
