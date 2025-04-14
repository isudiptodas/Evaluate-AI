import { TfiArrowTopRight } from "react-icons/tfi";
import Marquee from "react-fast-marquee";
import { companyLogo } from "./data/companyLogo";
import { MdManageAccounts } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { MdRecordVoiceOver } from "react-icons/md";

function page() {
  return (
    <>
      <div className='w-full h-auto flex flex-col justify-start items-center'>

        <div className='w-full min-h-screen pb-10 bg-gradient-to-br from-black to-purple-700 flex flex-col justify-start items-center'>
          <h1 className='font-mono text-white tracking-widest py-5'>EVALUATE AI</h1>

          <div className='w-full h-auto py-5 px-5 flex flex-col justify-start items-center gap-2'>
            <h1 className='text-white text-3xl md:text-5xl text-center lg:text-start w-full lg:px-10 lg:pt-6 font-bold lg:text-7xl'>Ace your next interview</h1>
            <p className='text-white text-[12px] md:text-sm font-light opacity-85 px-10 lg:text-start w-full lg:text-lg text-center'>Practice mock interviews, get feedback in real time and grab your dream job</p>

            <div className='w-full flex justify-center items-center lg:justify-start lg:px-10'>
              <p className='text-center w-auto px-3 py-1 lg:py-2 mt-5 text-[12px] lg:text-start rounded-full bg-white text-black cursor-pointer hover:opacity-80 duration-150 ease-in-out active:scale-95 flex justify-center items-center gap-2'>Try Now. It's Free <TfiArrowTopRight /></p>
            </div>
          </div>

          <h1 className="w-full text-center text-white capitalize text-xl font-bold px-5 mt-2 lg:text-start lg:px-14 lg:text-2xl">Companies you can try interview with</h1>

          <div className="w-[90%] flex flex-col justify-center items-center h-auto mt-5 px-2 py-5 backdrop-blur-3xl bg-white/10 rounded-md">
            <Marquee pauseOnHover={true}>
              {companyLogo.map((logo, index) => {
                return <span key={index} className=" mx-24 text-gray-400 text-5xl">{logo.logo}</span>
              })}
            </Marquee>
          </div>

          <div className="w-full flex flex-col justify-start items-center gap-2 mt-5">
            <h1 className="w-full text-center text-white capitalize text-xl font-bold px-5 mt-2 lg:text-start lg:px-14 lg:text-2xl">Try in 3 easy steps</h1>
            <div className="w-full lg:mt-5 h-auto px-5 grid grid-cols-1 justify-items-center md:grid-cols-3 lg:h-24 gap-2">
              <span className="w-[80%] px-5 flex flex-col justify-center items-center gap-4 text-center bg-white text-black rounded-md py-2 text-[12px] lg:text-lg cursor-pointer duration-150 ease-in-out">Create an account <span><MdManageAccounts className="text-3xl" /></span></span>
              <span className="w-[80%] px-5 flex flex-col justify-center items-center gap-4 text-center bg-white text-black rounded-md py-2 text-[12px] lg:text-lg cursor-pointer duration-150 ease-in-out">Choose your desired interview <span><IoMdOptions className="text-3xl" /></span></span>
              <span className="w-[80%] px-5 flex flex-col justify-center items-center gap-4 text-center bg-white text-black rounded-md py-2 text-[12px] lg:text-lg cursor-pointer duration-150 ease-in-out">Give mock interview & get feedback <span><MdRecordVoiceOver className="text-3xl" /></span></span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default page
