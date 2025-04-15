'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from '@/components/ui/animated-modal';
import { IoSettingsOutline } from "react-icons/io5";
import InterviewBoxList from "@/components/InterviewBoxList";
import InterviewBoxPast from "@/components/InterviewBoxPast";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Dialog } from "@radix-ui/react-dialog";

function page() {

  const [loaded, setLoaded] = useState(true);
  const [data, setData] = useState();

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

  // useEffect(() => {
  //   getData();
  // }, []);

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
              <ModalContent>
                <p>hello</p>
              </ModalContent>
            </ModalBody>
          </Modal>

          <hr className="w-full h-[1px] bg-gray-200 my-3" />

          {/* your list */}
          <div className="w-full flex justify-between items-center mt-2 px-3">
            <h1 className="w-auto text-start text-white font-bold text-3xl">Your Lists</h1>
          </div>

          <div className={`w-full px-5 py-5 mt-2 rounded-md lg:rounded-lg backdrop-blur-3xl bg-white/10 duration-200 transition-all flex justify-start items-center gap-4 ease-in-out h-60`}>
            <div className={`flex w-full h-full overflow-x-auto gap-4 justify-start items-start`}>
              {array.map((role, index) => {
                return <div key={index}>
                  <Drawer>
                    <DrawerTrigger>
                      <InterviewBoxList className={`cursor-pointer`}/>
                    </DrawerTrigger>
                    <DrawerContent className={`h-[70vh]`}>

                    </DrawerContent>
                  </Drawer></div>
              })}
            </div>
          </div>

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
                      <InterviewBoxPast className={`cursor-pointer`}/>
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
