import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { getCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import SuccessPopup from "@/app/components/successPopup"
import { split } from "postcss/lib/list"

const BlogForm = () => {

    const [token, setToken] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [userLogin, setUserLogin] = useState([])
    const [success, setSuccess] = useState(false)

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

    const [preview, setPreview] = useState("invisible")

    const setPreviewStatus = () => {
        if (preview != "invisible") {
            setPreview("invisible")
        } else {
            setPreview("visible")
        }
    }

    const savePost = (e) => {
        e.preventDefault();

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.post("https://api-polsrijobs.vercel.app/api/posts", {
                title,
                body,
                author: userLogin.id
            });
            setSuccess(true)
        } catch (error) {
            alert(error);
        }
    }

    const ShowPopup = () => {
        if (success) {
            return (
                <>
                    <SuccessPopup message="Your Blog Successfully Posted" />
                </>
            )
        }
    }

    const test = () => {
        const titlearea = document.getElementById("titlearea")
        const bodyarea = document.getElementById("bodyarea")
        bodyarea.style.height = "1px"
        bodyarea.style.height = (25 + bodyarea.scrollHeight) + "px"
        titlearea.style.resize = "none"
        titlearea.style.height = "1px"
        titlearea.style.height = (1 + titlearea.scrollHeight) + "px"
    }

    return (
        <>
            <ShowPopup />
            <div className="px-10 sm:px-20 py-8">
                <form className="w-full" onSubmit={savePost}>
                    <div className="w-full gap-2 justify-between flex flex-col">
                        <div className="w-full flex flex-col justify-between">
                            <div className="flex flex-col w-full sm:w-3/5 gap-2">
                                <textarea
                                    className="p-2 focus:outline-none font-bold text-4xl text-wrap overflow-hidden h-min"
                                    onKeyUp={test}
                                    id="titlearea"
                                    rows="1"
                                    name="title"
                                    placeholder="Tambahkan Judul"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-2 mt-3">
                            <textarea
                                className="p-2 focus:outline-none text-wrap overflow-hidden h-min"
                                onKeyUp={test}
                                id="bodyarea"
                                rows="1"
                                name="body"
                                placeholder="Tulis detail loker di sini &#128209;"
                                onChange={(e) => {
                                    let bodyEvent = e.target.value

                                    let splitEnter = bodyEvent.split("\n")
                                    let joinEnter = splitEnter.join("</br>")
                                    let splitOpen = joinEnter.split("[")
                                    let finalText = joinEnter
                                    if (splitOpen.length > 1) {
                                        let splitOpenLink = finalText.split("[")

                                        let splitOpenJoin = splitOpen.join("<a class='editorlink' href='")
                                        let splitOpenJoinLink = splitOpenLink.join("|")

                                        let splitClose = splitOpenJoin.split("]")
                                        let splitCloseLink = splitOpenJoinLink.split("]")

                                        if (splitCloseLink.length > 1) {
                                            let lastLink = splitCloseLink[splitCloseLink.length - 2]
                                            let currentLink = lastLink.split("|")
                                        }

                                        finalText = splitClose.join(`'/>`)
                                    }

                                    setBody(finalText)
                                }}
                            ></textarea>
                        </div>
                        <div className="w-full flex flex-col-reverse sm:flex-row gap-3 mt-3">
                            <Link href={"/user/blog"} className="w-full sm:w-1/6 bg-white">
                                <button className="px-2 py-2 w-full text-neutral-800 rounded-md bg-neutral-300 font-medium">Cancel</button>
                            </Link>
                            <button type="submit" className="bg-blue-950 px-2 py-2 w-full sm:w-1/6 text-white font-medium rounded-md">Upload Now &#128640;</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default BlogForm