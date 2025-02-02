"use client"

import NavBar from "@/app/components/navBar"
import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import BlogForm from "../../components/form"
import { redirect } from "next/navigation"
import axios from "axios"
import { useParams } from "next/navigation"
import BlogFormUpdate from "../../components/formUpdate"

const MyBlogs = () => {
    const { slug } = useParams()
    const [posts, setPost] = useState([])

    const [content, setContent] = useState(null);
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
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

    let bodyFinal = ""
    posts.map(post => {
        const bodyPost = post.body
        const bodySplit = bodyPost.split("</br>")
        const bodyJoin = bodySplit.join("\n")
        const bodySplitA = bodyJoin.split("<a class='editorlink' href='")
        const bodyJoinA = bodySplitA.join("[")
        const bodySplitEndA = bodyJoinA.split("'/>")
        const bodyJoinEndA = bodySplitEndA.join("]")
        bodyFinal = bodyJoinEndA
    })

    

    return (
        <>
            <NavBar username={userLogin.username} token={token} />
            {
                posts.map(post => (
                    <div key={post._id}>
                        <BlogFormUpdate
                            title={post.title}
                            slug={post.slug}
                            body={bodyFinal}
                        />
                    </div>
                ))
            }
        </>
    )
}

export default MyBlogs