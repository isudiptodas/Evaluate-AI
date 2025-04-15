import React from 'react'
import { IoMdTime } from "react-icons/io";

function InterviewBox({ className }: { className?: string }) {
    return (
        <>
            <div className={`overflow-hidden w-60 h-full bg-white rounded-md lg:rounded-lg flex flex-col  ${className}`}>
                <div className={` w-full px-2 py-2 h-auto flex flex-col gap-2`}>
                    <h1 className='text-3xl font-bold'>Frontend Developer</h1>
                    <span className={`w-full flex items-center gap-2 justify-center`}><IoMdTime className='text-sm font-bold' />may 5, 2025</span>
                </div>

                <div className={`w-full px-2 py-2 h-auto flex flex-col justify-start items-start`}>
                    <p className={`w-full bg-purple-600 text-white rounded-full cursor-pointer hover:opacity-80 duration-200 ease-in-out text-center active:scale-95 py-2`}>Join</p>
                </div>
            </div>
        </>
    )
}

export default InterviewBox
