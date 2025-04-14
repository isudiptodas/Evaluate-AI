import { FaTiktok } from "react-icons/fa";
import { BsAmazon } from "react-icons/bs";
import { FaMicrosoft } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { SiIntel } from "react-icons/si";
import { FaApple } from "react-icons/fa";
import { FaSalesforce } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";
import { SiAdobe } from "react-icons/si";
import { BsNvidia } from "react-icons/bs";
import { SiCisco } from "react-icons/si";
import { SiRazorpay } from "react-icons/si";
import { SiPaytm } from "react-icons/si";
import { FaUber } from "react-icons/fa6";
import { ReactNode } from "react";

interface Logos {
    logo: ReactNode;
}

export const companyLogo: Logos[] = [
    {
        logo: <FaTiktok/>
    },
    {
        logo: <BsAmazon/>
    },
    {
        logo: <FaMicrosoft/>
    },
    {
        logo: <FaLinkedin/>
    },
    {
        logo: <FaCcAmex/>
    },
    {
        logo: <FaGoogle/>
    },
    {
        logo: <SiIntel/>
    },
    {
        logo: <FaApple/>
    },
    {
        logo: <FaSalesforce/>
    },
    {
        logo: <GrOracle/>
    },
    {
        logo: <SiAdobe/>
    },
    {
        logo: <BsNvidia/>
    },
    {
        logo: <SiCisco/>
    },
    {
        logo: <SiRazorpay/>
    },
    {
        logo: <SiPaytm/>
    },
    {
        logo: <FaUber/>
    },
];