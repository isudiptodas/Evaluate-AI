'use client'

import { useRouter } from "next/navigation"
import { useState } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";

function page() {

    const[active, setActive] = useState('');

    return (
        <>
            <div className="w-full min-h-screen bg-gradient-to-br from-black to-purple-700 flex flex-col gap-4 justify-start items-center">

                <h1 className='font-mono text-white tracking-widest py-5'>EVALUATE AI</h1>

                <div className="w-full h-full flex px-3 py-2 flex-col lg:flex-row justify-start items-center gap-4">

                    <div className="w-full h-72 rounded-md lg:rounded-lg backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-2 relative">
                        <div className="h-16 z-30 w-16 rounded-full overflow-hidden">
                            <img src="/ai-voice.png" />
                        </div>
                        <p className="z-30 text-white font-semibold text-lg absolute bottom-5 -translate-y-1/2 left-1/2 -translate-x-1/2">Selina</p>
                        <div className={`${active === 'model' ? "block" : "hidden"} h-16 w-16 rounded-full bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 animate-ping absolute`}></div>
                    </div>
                    <div className="w-full h-72 rounded-md lg:rounded-lg backdrop-blur-3xl bg-white/10 flex flex-col justify-center items-center gap-2 relative">
                        <div className="h-16 z-30 w-16 bg-white rounded-full flex justify-center items-center overflow-hidden">
                            <MdAccountCircle className="text-6xl" />
                        </div>
                        <p className="z-30 text-white font-semibold text-lg absolute bottom-5 -translate-y-1/2 left-1/2 -translate-x-1/2">(Sudipto) You</p>
                        <div className={`${active === 'user' ? "block" : "hidden"}  h-16 w-16 rounded-full bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 animate-ping absolute`}></div>
                    </div>

                </div>

                <div className={`w-full py-2 flex justify-center items-center`}>
                    <p className="px-4 py-2 rounded-full bg-red-500 text-white cursor-pointer hover:opacity-80 duration-150 ease-in-out flex justify-center items-center gap-2 text-lg">End call<MdCallEnd /></p>
                </div>
            </div>
        </>
    )
}

export default page
