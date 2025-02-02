"use client"

import NavBar from "../../components/navBar";
import UserPosts from "../../layouts/userPosts";
import { jwtDecode } from "jwt-decode"
import { getCookie } from "cookies-next"
import { Component, useEffect, useState } from "react"
import Head from "next/head";
import HomePosts from "@/app/layouts/homePosts";

const MyBlogs = () => {

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

  const MyPosts = () => {
    if (token != undefined) {
      return (
        <UserPosts username={userLogin.username} />
      )
    }
  }

  return (
    <div>
      <NavBar username={userLogin.username} token={token} title="Update - " />
      {/* <MyPosts /> */}
      <HomePosts username={userLogin.username} />
    </div>
  );

}

export default MyBlogs