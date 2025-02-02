"use client"

import { deleteCookie } from "cookies-next";
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie } from "cookies-next";


const Logout = () => {

    const token = getCookie("token")

    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        axios.post("https://api-polsrijobs.vercel.app/api/auth/logout");
    } catch (error) {
        console.log(error.message)
    }
    deleteCookie("token")
    redirect("/")

}

export default Logout