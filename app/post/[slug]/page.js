"use client"

import NavBar from "@/app/components/navBar"
import PostCard from "@/app/components/postCard"
import PostDetail from "@/app/components/postDetail"
import axios from "axios"
import dateFormat from "dateformat"
import { useParams } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { getCookie } from "cookies-next"
import { Suspense, useEffect, useState } from "react"

const Post = () => {


  const { slug } = useParams()
  // const slug = "julukan-julukan-dosen-tekkom"

  const [posts, setPost] = useState([])
  const [userLogin, setUserLogin] = useState([])
  const [token, setToken] = useState("")

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

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async () => {
    await axios.get(`https://api-polsrijobs.vercel.app/api/posts/${slug}`)
      .then(res => {
        const post = res.data;
        setPost(post.data)
      })
  }


  return (
    <>
      {
        posts.map(post => (
          <div key={post._id}>
            <NavBar username={userLogin.username} token={token} title={`${post.title} - `} />
            <PostDetail
              title={post.title}
              createdAt={dateFormat(post.updatedAt, "mmm dS, yyyy, h:MM TT")}
              body={post.body}
              author={post.author.username}
            />
          </div>
        ))
      }
    </>
  );
}

export default Post