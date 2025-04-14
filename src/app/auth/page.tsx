'use client'

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react"
import { FiArrowUpRight } from "react-icons/fi";

function page() {

    const [authType, setAuthType] = useState('login');
    const [visible, setVisible] = useState(false);

    return (
        <>
            <div className="w-full flex pt-5 flex-col justify-start min-h-screen bg-gradient-to-br from-black to-purple-700 items-center gap-3">
                
                <h1 className='font-mono mb-20 text-white tracking-widest py-5'>EVALUATE AI</h1>

                <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto py-2 backdrop-blur-3xl bg-white/10 px-2 flex justify-between items-center rounded-md">
                    <span className={`w-full rounded-md py-2 px-2 text-center ${authType === 'login' ? "bg-white text-black" : "text-white bg-transparent"} hover:opacity-80 duration-100 ease-in-out active:scale-95 cursor-pointer`} onClick={() => setAuthType('login')}>Login</span>
                    <span className={`w-full rounded-md py-2 px-2 text-center ${authType === 'signup' ? "bg-white text-black" : "text-white bg-transparent"} hover:opacity-80 duration-100 ease-in-out active:scale-95 cursor-pointer`} onClick={() => setAuthType('signup')}>Sign Up</span>
                </div>

                <div className={`${authType === 'login' ? "block" : "hidden"} w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto py-5 px-4 backdrop-blur-3xl rounded-md bg-white/10 flex flex-col justify-center items-start gap-3`}>
                    <input type="text" className="w-full rounded-md bg-white/15 py-2 px-3 text-white text-[12px] lg:text-sm outline-none" placeholder="Enter email" />
                    <div className="w-full relative">
                        <span onClick={() => setVisible(!visible)} className="absolute cursor-pointer text-gray-400 right-5 top-2">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                        <input type={visible ? "text" : "password"} className="w-full rounded-md bg-white/15 py-2 px-3 text-white text-[12px] lg:text-sm outline-none" placeholder="Enter password" />
                    </div>
                    <p className="w-full flex justify-center items-center gap-2 py-2 rounded-md bg-white text-black cursor-pointer hover:opacity-80 duration-150 ease-in-out active:scale-95 text-[12px] lg:text-sm">Enter <FiArrowUpRight /></p>
                </div>

                <div className={`${authType === 'signup' ? "block" : "hidden"} w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto py-5 px-4 backdrop-blur-3xl rounded-md bg-white/10 flex flex-col justify-center items-start gap-3`}>
                    <input type="text" className="w-full rounded-md bg-white/15 py-2 px-3 text-white text-[12px] lg:text-sm outline-none" placeholder="Enter full name" />
                    <input type="text" className="w-full rounded-md bg-white/15 py-2 px-3 text-white text-[12px] lg:text-sm outline-none" placeholder="Enter email" />
                    <div className="w-full relative">
                        <span onClick={() => setVisible(!visible)} className="absolute cursor-pointer text-gray-400 right-5 top-2">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                        <input type={visible ? "text" : "password"} className="w-full rounded-md bg-white/15 py-2 px-3 text-white text-[12px] lg:text-sm outline-none" placeholder="Enter password" />
                    </div>
                    <div className="w-full relative">
                        <span onClick={() => setVisible(!visible)} className="absolute cursor-pointer text-gray-400 right-5 top-2">{visible ? <FaEye /> : <FaEyeSlash />}</span>
                        <input type={visible ? "text" : "password"} className="w-full rounded-md bg-white/15 py-2 px-3 text-white text-[12px] lg:text-sm outline-none" placeholder="Confirm password" />
                    </div>
                    <p className="w-full flex justify-center items-center gap-2 py-2 rounded-md bg-white text-black cursor-pointer hover:opacity-80 duration-150 ease-in-out active:scale-95 text-[12px] lg:text-sm">Create Account <FiArrowUpRight /></p>
                </div>
            </div>
        </>
    )
}

export default page
