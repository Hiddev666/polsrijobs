"use client"

import { Suspense } from "react";
import NavBar from "./components/navBar";
import HomePosts from "./layouts/homePosts";
import UserPosts from "./layouts/userPosts";
import { jwtDecode } from "jwt-decode"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation";
import Image from 'next/image'
import Link from "next/link";
import Register from "./(auth)/register/page";

const Home = () => {
  const [userLogin, setUserLogin] = useState([])
  const [token, setToken] = useState("")

  if (userLogin.id != undefined) {
    redirect("/user/blog")
  }

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

  const MyPosts = () => {
    if (token != undefined) {
      return (
        <UserPosts username={userLogin.username} />
      )
    }
  }

  return (
    <div>
      <NavBar username={userLogin.username} token={token} title="" />
      <div className="w-full absolute h-5/6 flex flex-col md:flex-row justify-center mt-5 items-center px-10 md:gap-0">
        <div className="flex flex-col md:flex-row justify-around items-center gap-16 md:gap-6 w-full">
          <div className="flex flex-col gap-5 mb-0 md:mb-20" id="landing">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl md:text-7xl font-bold text-neutral-800">Butuh Atau,<br />Punya Loker?</h1>
              <p className="text-lg font-medium">Dengan PolsriJobs, Cari dan Bagikan Sekarang&#128293;</p>
            </div>
            <Link href={"/register"}>
              <button className="bg-blue-950 text-white px-7 ease-in-out duration-300 py-3 rounded-full font-medium flex gap-3 hover:gap-10 hover:bg-blue-900">Bagikan Loker Sekarang <span>&#128640;</span></button>
            </Link>
          </div>
          <Image
            src="/fotosemua.svg"
            width={450}
            height={450}
            id="laptop"
            alt="illustration"
          />
          <Image
            src="/kacapembesar.svg"
            width={500}
            height={500}
            id="hand"
            alt="illustration"
            className="absolute bottom-0 right-10"
          />
          {/* <Image
            src="/home-illustration1.svg"
            width={650}
            height={650}
            id="laptop"
            alt="illustration"
          />
          <Image
            src="/home-illustration2.svg"
            width={300}
            height={300}
            alt="illustration"
            id="hand"
            className="absolute bottom-0 right-10"
          /> */}
        </div>
      </div>
      {/* <HomePosts /> */}
    </div>
  );
}

export default Home