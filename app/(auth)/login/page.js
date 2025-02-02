"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { setCookie } from "cookies-next";
import { redirect } from 'next/navigation';
import NavBar from '@/app/components/navBar';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState([])
    const [payload, setPayload] = useState([])
    const [monkey, setMonkey] = useState("Log In&#128585;")

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://api-polsrijobs.vercel.app/api/auth/login", {
                username,
                password
            }).then(res => {
                const token = res.data;
                setToken(token.data)
                setCookie("token", token.data.jwtToken);
            })
        } catch (error) {
            console.log(error);
        }
        redirect("/")
    }

    const passInputFocus = (e) => {
        setMonkey("Login&#128584;")
    }
    const passInputBlur = (e) => {
        setMonkey("Log In&#128585;")
    }

    {/* <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
    <br />
    <input type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    <br />
    <button type='submit' className='bg-neutral-800 px-3 py-1'>Submit</button> */}
    return (
        <>
            <NavBar title="Log In - "/>
            <div className="w-full top-0 flex flex-col sm:flex-row justify-center items-center py-20">
                <div className="w-full sm:w-1/2 flex flex-col items-center justify-between gap-5 bg-white">
                    <div className='w-3/5 flex flex-col items-start gap-5'>
                        <div>
                            <h1 className='text-4xl font-bold text-neutral-800' dangerouslySetInnerHTML={{ __html: monkey }}></h1>
                            <p className='text-neutral-700 text-sm'>Welcome back and enter your credentials!</p>
                        </div>
                        <form onSubmit={login} className='flex flex-col gap-3 w-full'>
                            <input className='border w-full px-3 py-2 rounded-md' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input className='border w-full px-3 py-2 rounded-md' type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} onFocus={passInputFocus} onBlur={passInputBlur}/>
                            <button className='mt-3 bg-blue-950 text-white font-semibold w-full px-3 py-3 rounded-lg' type='submit'>Login &#129485;</button>
                        </form>
                        <div className='w-full flex justify-center items-center'>
                            <p className='text-center'>Don't have any account? <a href='/register' className='font-bold text-blue-950'>Register</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login