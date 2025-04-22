'use client'

import { Suspense } from 'react';  // Import Suspense
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

interface DATA {
    name: string,
    InterviewPreferrence: string,
    role: string,
    company: string,
    experience: string,
    feedback: string,
    question: string
}

function Page() {

    const searchParams = useSearchParams();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [experience, setExperience] = useState('');
    const [feedback, setFeedback] = useState('');
    const [data, setData] = useState<DATA | null>(null);
    const [question, setQuestion] = useState('');
    const router = useRouter();

    useEffect(() => {
        const encoded = searchParams.get('data');
        const decoded = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;
        setData(decoded);

        setName(decoded.name);
        setType(decoded.InterviewPreferrence);
        setRole(decoded.role);
        setCompany(decoded.company);
        setExperience(decoded.experience);
        setFeedback(decoded.feedback);
        setQuestion(decoded.question);
        //console.log(decoded);
    }, []);

    const exit = () => {
        router.push('/user');
    }

    const saveAndExit = async () => {
        let toastid = toast.loading("Saving your details");

        try {
            const res = await axios.post(`/api/history`, {
                name: data?.name,
                role: data?.role,
                experience: data?.experience,
                company: data?.company,
                type: data?.InterviewPreferrence,
                feedback: data?.feedback,
                question: question
            });

            if (res.data.success) {
                console.log(res.data);
                toast.dismiss(toastid);
                router.push('/user');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Suspense fallback={<div>Loading...</div>}> {/* Wrap your component with Suspense */}
            <div className="w-full min-h-screen pb-10 overflow-y-auto px-5 bg-gradient-to-br from-black to-purple-700 flex flex-col justify-start items-center relative">
                <h1 className='font-mono text-white tracking-widest py-5'>EVALUATE AI</h1>

                <div className="w-full sm:w-auto sm:px-10 md:px-12 lg:px-10 h-auto py-4 sm:py-7 md:py-10 px-3 flex flex-col justify-center items-center backdrop-blur-3xl bg-white/10 rounded-md lg:rounded-lg">
                    <h1 className="w-full text-center text-xl md:text-2xl xl:text-4xl text-white font-semibold mb-4">Mock Interview Details</h1>

                    <p className="w-full text-[12px] lg:text-sm text-start text-white font-light capitalize">Name: {name}</p>
                    <p className="w-full text-[12px] lg:text-sm text-start text-white font-light capitalize">Company: {company}</p>
                    <p className="w-full text-[12px] lg:text-sm text-start text-white font-light capitalize">Experience: {experience}</p>
                    <p className="w-full text-[12px] lg:text-sm text-start text-white font-light capitalize">Role: {role}</p>
                    <p className="w-full text-[12px] lg:text-sm text-start text-white font-light capitalize">Interview Type: {type}</p>
                </div>

                <div className="w-full sm:w-[60%] sm:px-10 md:px-12 lg:px-10 mt-5 h-auto py-4 sm:py-7 md:py-5 px-3 flex flex-col justify-center items-center backdrop-blur-3xl bg-white/10 rounded-md lg:rounded-lg">
                    <h1 className="w-full text-center text-xl md:text-2xl xl:text-4xl text-white font-semibold mb-4">Feedback</h1>

                    <p className="w-full text-start text-[12px] md:text-sm text-white">
                        <Markdown>
                            {data?.feedback}
                        </Markdown>
                    </p>
                </div>

                <p onClick={saveAndExit} className="w-auto px-4 lg:px-7 mt-5 py-2 rounded-full text-black bg-white cursor-pointer active:scale-95 duration-150 ease-in-out hover:opacity-80">Save and exit</p>
                <p onClick={exit} className="w-auto px-4 lg:px-7 mt-5 py-2 rounded-full text-black bg-white cursor-pointer active:scale-95 duration-150 ease-in-out hover:opacity-80">Exit without saving</p>

            </div>
        </Suspense>
    )
}

export default Page;
