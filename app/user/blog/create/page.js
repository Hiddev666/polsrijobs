"use client"

import NavBar from "@/app/components/navBar"
import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import BlogForm from "../components/form"
import { redirect } from "next/navigation"

const MyBlogs = () => {

    const [content, setContent] = useState(null);
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const [token, setToken] = useState("")
    const [userLogin, setUserLogin] = useState([])


    useEffect(() => {
        getCook();
    }, [])

    const getCook = async () => {
        const jwt = await getCookie("token")
        if (jwt != undefined) {
            const jwtDecoded = jwtDecode(jwt)
            setUserLogin(jwtDecoded)
        }
        setToken(jwt)
    }

    return (
        <>
            <NavBar username={userLogin.username} token={token} title="Create - "/>
            <BlogForm />
        </>
    )
}

export default MyBlogs