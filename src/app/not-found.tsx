import Link from "next/link"

function NotFoundPage() {
    return (
        <>
            <div className="w-full h-screen bg-gradient-to-br from-black to-purple-700 flex flex-col justify-start py-5 items-center">
                <h1 className='font-mono text-white tracking-widest py-5'>EVALUATE AI</h1>

                <h1 className="w-full text-center text-white text-xl md:text-3xl lg:text-4xl mt-10 px-10 font-bold">The page you are looking for is not available</h1>
                <Link href='/' className="w-auto mt-5 rounded-full bg-white text-black text-[12px] py-2 px-5 hover:opacity-80 duration-150 ease-in-out cursor-pointer">Move back to home page</Link>

            </div>
        </>
    )
}

export default NotFoundPage
