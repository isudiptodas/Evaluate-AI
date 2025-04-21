import { FaRegBuilding } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface INT_PROPS {
    className?: string,
    name?: string,
    role?: string,
    company?: string,
    experience?: string,
    type?: string,
    feedback?: string,
    questions?: string,
}

function InterviewBox({ className, name, role, experience, type, feedback, company, questions }: INT_PROPS) {

    const router = useRouter();

    const sendData = async () => {
        const info = {
            name, role, type, feedback, company, experience
        }

        const encoded = encodeURIComponent(JSON.stringify(info));
        router.push(`/user/mock-interview/feedback/feedback-history?data=${encoded}`);
    }
    
    const retake = () => {
        const info = {
            name, role, company, experience, type, questions
        }

        const encoded = encodeURIComponent(JSON.stringify(info));
        router.push(`/user/mock-interview?data=${encoded}`);
    }

    return (
        <>
            <div className={` w-60 h-auto bg-white rounded-md lg:rounded-lg flex flex-col ${className}`}>
                <div className={` w-full px-2 py-2 h-auto flex flex-col gap-2`}>
                    <h1 className='text-3xl font-bold text-center capitalize'>{role}</h1>
                    <span className={`w-full flex items-center gap-2 justify-center`}><FaRegBuilding  className='text-sm font-bold' />{company}</span>
                </div>

                <div className={`w-full px-2 py-2 h-auto flex flex-col justify-start items-start gap-2`}>
                    <p className={`w-full bg-purple-700 text-white rounded-full cursor-pointer hover:opacity-80 duration-200 ease-in-out text-center active:scale-95 py-2`} onClick={sendData}>View Feedback</p>
                    <p className={`w-full bg-white border-2 border-purple-600 text-black rounded-full cursor-pointer hover:opacity-80 duration-200 ease-in-out text-center active:scale-95 py-2`} onClick={retake}>Retake</p>
                </div>
            </div>
        </>
    )
}

export default InterviewBox
