'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react";
import Markdown from 'react-markdown'
import { useRouter } from "next/navigation";

interface DATA {
  name: string,
  type: string,
  role: string,
  company: string,
  experience: string,
  feedback: string
}

function FeedbackContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [feedback, setFeedback] = useState('');
  const [data, setData] = useState<DATA | null>(null);
  const router = useRouter();

  useEffect(() => {
    const encoded = searchParams.get('data');
    const decoded = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;
    setData(decoded);

    setName(decoded.name);
    setType(decoded.type);
    setRole(decoded.role);
    setCompany(decoded.company);
    setExperience(decoded.experience);
    setFeedback(decoded.feedback);
  }, []);

  const save = async () => {
    router.push('/user');
  }

  return (
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
            {feedback}
          </Markdown>
        </p>
      </div>

      <p onClick={save} className="w-auto px-4 lg:px-7 mt-5 py-2 rounded-full text-black bg-white cursor-pointer active:scale-95 duration-150 ease-in-out hover:opacity-80">Go Back</p>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <FeedbackContent />
    </Suspense>
  );
}
