'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/animated-modal';
import InterviewBoxPast from "@/components/InterviewBoxPast";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

function page() {

  const [loaded, setLoaded] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [data, setData] = useState<{ id: string, name: string, email: string }>();
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [InterviewPreferrence, setInterviewPreferrence] = useState('');
  const router = useRouter();

  const getData = async () => {
    try {
      const res = await axios.get('/api/user');
      //console.log(res.data.found);

      if (res.data.status === 200) {
        setData(res.data.found);
        setLoaded(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const array = [
    {
      role: 'frontend'
    },
    {
      role: 'backend'
    },
    {
      role: 'fullstack'
    },
    {
      role: 'java'
    },
    {
      role: 'MERN'
    },
  ];

  const preferrence = [
    'behavioral',
    'technical',
    'cultural',
    'communication',
    'hr/general',
  ];

  const startMockInterview = async () => {
    if (!role || !InterviewPreferrence || !experience || !company) {
      toast.error("Please fill all the details");
      return;
    }

    let id = toast.loading("Starting mock interview");

    try {
      setGenerating(true);
      const res = await axios.post(`/api/gemini`, {
        role, InterviewPreferrence, company, experience, name: data?.name
      });

      const info = {
        name: data?.name,
        role, InterviewPreferrence, company, experience, question: res.data.resp
      }

      if (res.data.success) {
        const send = JSON.stringify(info);
        const DATA = encodeURIComponent(send);
        setGenerating(false);
        toast.dismiss(id);
        router.push(`/user/mock-interview?data=${DATA}`);
      }

      //console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    finally {
      setGenerating(false);
      toast.dismiss(id);
      setRole('');
      setExperience('');
      setInterviewPreferrence('');
      setCompany('');
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-black to-purple-700 overflow-hidden">

        <h1 className='font-mono text-white tracking-widest py-5'>EVALUATE AI</h1>

        <div className="w-full relative md:w-[80%] lg:mt-4 px-5 flex lg:px-10 flex-col justify-start items-center gap-2 pb-10">

          <div className={`w-full relative px-3 py-5 backdrop-blur-3xl rounded-md bg-white/10 lg:rounded-lg h-auto flex flex-col lg:flex-row justify-start md:justify-center items-center lg:gap-5`}>
            <p className="w-full md:w-auto  text-white text-[15px] md:text-2xl lg:text-5xl text-start">Welcome</p>
            <h1 className="w-full md:w-auto  text-start text-white font-bold text-5xl">Sudipto</h1>
          </div>

          <p className="w-full text-center text-white text-sm lg:text-lg mt-5">Schedule a new interview</p>

          <Modal>
            <ModalTrigger>
              <p className="w-auto text-center px-4 py-2 rounded-md bg-white text-bl cursor-pointer hover:opacity-80 duration-150 ease-in-out active:scale-95">Create a new mock</p>
            </ModalTrigger>
            <ModalBody>
              <ModalContent className="w-full px-3 md:px-3 lg:px-3 overflow-y-auto gap-3 py-2">
                <h1 className="w-full py-2 text-xl font-bold px-2 text-center">Help us Know More About Your Interview Type</h1>
                <input onChange={(e) => setRole(e.target.value)} type="text" className=" w-full bg-gray-200 px-3 py-2 rounded-md lg:rounded-lg outline-none" placeholder="Enter your desired role for interview" />
                <input onChange={(e) => setCompany(e.target.value)} type="text" className=" w-full bg-gray-200 px-3 py-2 rounded-md lg:rounded-lg outline-none" placeholder="Company (if any)" />
                <input onChange={(e) => setExperience(e.target.value)} type="text" className=" w-full bg-gray-200 px-3 py-2 rounded-md lg:rounded-lg outline-none" placeholder="Years of experience (0 in case of fresher)" />

                <p className="w-full text-start justify-center items-start mt-2 text-sm">Select your interview preferrence</p>
                <div className="w-full flex overflow-x-auto justify-start items-start gap-2">
                  {preferrence.map((pref, index) => {
                    return <span key={index} className={`text-[12px] capitalize w-auto lg:text-sm md:rounded-md lg:rounded-lg px-3 py-1 md:py-2 rounded-full cursor-pointer ${InterviewPreferrence === pref ? "bg-fuchsia-700 text-white" : "bg-gray-200 text-black"} duration-200 ease-in-out active:scale-95`} onClick={() => setInterviewPreferrence(pref)}>{pref}</span>
                  })}
                </div>
                <p className="w-full rounded-md lg:rounded-lg bg-gradient-to-r from-purple-400 to-purple-700 text-white text-center py-2 hover:opacity-80 duration-150 ease-in-out cursor-pointer" onClick={startMockInterview}>{generating ? "Starting . . ." : "Start Mock Interview"}</p>
              </ModalContent>
            </ModalBody>
          </Modal>

          <hr className="w-full h-[1px] bg-gray-200 my-3" />

          {/* past list */}
          <div className="w-full flex justify-between items-center mt-2 px-3">
            <h1 className="w-auto text-start text-white font-bold text-3xl">Past Sessions</h1>
          </div>

          <div className={`w-full px-5 py-5 mt-2 rounded-md lg:rounded-lg backdrop-blur-3xl bg-white/10 duration-200 transition-all flex justify-start items-center gap-4 ease-in-out h-60`}>
            <div className={`flex w-full h-full overflow-x-auto gap-4 justify-start items-start `}>
              {array.map((role, index) => {
                return <div key={index}>
                  <Drawer>
                    <DrawerTrigger>
                      <InterviewBoxPast className={`cursor-pointer`} />
                    </DrawerTrigger>
                    <DrawerContent className={`h-[70vh]`}>

                    </DrawerContent>
                  </Drawer></div>
              })}
            </div>
          </div>

        </div>

        <div className={`${loaded ? "hidden" : "block"}  w-full px-4 py-4 h-auto flex flex-col justify-start items-center gap-3`}>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-36"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-32"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-32"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-36"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
          <div className="w-full rounded-md backdrop-blur-3xl bg-white/10 h-10"></div>
        </div>
      </div>
    </>
  )
}

export default page
