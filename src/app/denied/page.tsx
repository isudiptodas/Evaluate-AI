import Link from "next/link"

function page() {
    return (
        <>
            <div className="w-full h-screen bg-gradient-to-br from-black to-purple-700 flex flex-col justify-start py-5 items-center">
                <h1 className='font-mono text-white tracking-widest py-5'>EVALUATE AI</h1>

                <h1 className="w-full text-center text-white text-xl md:text-3xl lg:text-4xl xl:text-5xl mt-10 px-10 font-bold">You are unauthorized :(</h1>
                <Link href='/auth' className="w-auto mt-5 rounded-full bg-white text-black text-[12px] py-2 px-5 hover:opacity-80 duration-150 ease-in-out cursor-pointer">Login to continue</Link>

            </div>
        </>
    )
}

export default page
