'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MdAccountCircle } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

interface DATA {
    name: string,
    interviewPreferrence: string,
    role: string,
    company: string,
    experience: string,
    questions: string,
}

function page() {

    const [active, setActive] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [messages, setMessages] = useState('');
    const [data, setData] = useState<DATA | null>(null);
    const router = useRouter();
    const vapi = useRef<Vapi | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        vapi.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC as string);
    }, []);

    useEffect(() => {
        const info = searchParams.get('data');
        const decoded = info ? JSON.parse(decodeURIComponent(info)) : null;
        setData(decoded);

        if (info === null) {
            router.push('/user');
        }
        else {
            setLoaded(true);
        }

    }, [searchParams]);

    useEffect(() => {

        if (!data) {
            return;
        }

        const options: {} = {
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            model: {
                provider: "openai",
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a interviewer and i am a candidate. I am here for a mock interview. My name is ${data?.name}
                        and applying for role - ${data?.role} in company - ${data?.company} and my experience is ${data?.experience} 
                        and my focus on ${data?.interviewPreferrence} type. So start the conversation by first greeting me and then ask 
                        me questions one by one. Even if the candidate ask for any help or suggestion then do so but dont give away entire answers. 
                        Additionally for the interview to be interesting and engaging add a little human touch by adding some phrases like : umm got it !
                        ohh yess yess, uhh haaaa, hmmm. Below I am providing you the questions. ${data?.questions}`,
                    },
                ],
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            name: "Mock Interviewer",
        }

        const id = toast.loading("Starting your interview");

        vapi.current?.start(options);

        vapi.current?.on('call-start', () => {
            toast.dismiss(id);
            vapi.current?.say(`Hello... I am Selina...and I am going to take your interview for this session are you ready ?`);
            toast.info("Call Started");
        });
        vapi.current?.on('speech-start', () => {
            setActive('model');
        });
        vapi.current?.on('speech-end', () => {
            setActive('user');
        });
        vapi.current?.on('error', () => {
            toast.error("Internal Error");
        });

        return () => {
            vapi.current?.stop();
        }
    }, [data]);

    const endCall = () => {
        vapi.current?.stop();
        toast.info("Mock Interview Ended");
        setTimeout(() => {
            router.push('/user');
        }, 2000);
    }

    return (
        <>
            <div className={`${loaded ? "block" : "hidden"} w-full min-h-screen bg-gradient-to-br from-black to-purple-700 flex flex-col gap-4 justify-start items-center`}>

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
                        <p className="z-30 text-white font-semibold text-lg absolute bottom-5 -translate-y-1/2 left-1/2 -translate-x-1/2">{data?.name} You</p>
                        <div className={`${active === 'user' ? "block" : "hidden"}  h-16 w-16 rounded-full bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 z-10 animate-ping absolute`}></div>
                    </div>

                </div>

                <div className={`w-full py-2 flex justify-center items-center`}>
                    <p className="px-4 py-2 rounded-full bg-red-500 text-white cursor-pointer hover:opacity-80 duration-150 ease-in-out flex justify-center items-center gap-2 text-lg" onClick={endCall}>End call<MdCallEnd /></p>
                </div>
            </div>

            {/* <div className={`${loaded ? "hidden" : "block"}  w-full px-4 py-4 h-auto flex flex-col justify-start items-center gap-3`}>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-36"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-32"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-32"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-36"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
                <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
            </div> */}
        </>
    )
}

export default page
