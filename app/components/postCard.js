import Link from "next/link"
import Image from "next/image"
import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import { redirect } from "next/navigation"
import SuccessPopup from "./successPopup"

const PostCard = (props) => {

    const [success, setSuccess] = useState(false)
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

    const Author = () => {
        if (props.author != undefined) {
            return (
                <div className="w-max py-1 rounded-md text-white text-xs flex justify-between gap-2">
                    <Image
                        src={"/user-icon-black.svg"}
                        width={15}
                        height={15}
                        alt="user"
                    />
                    <p className="text-neutral-800">{props.author}</p>
                </div>
            )
        }
    }

    const deletePost = (e) => {
        e.preventDefault();

        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            let url = `https://api-polsrijobs.vercel.app/api/posts/${props.slug}`
            axios.delete(url);
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

    return (
        <>
            <ShowPopup />
            <a href={props.url}>
                <div className="p-2 pb-5 border-b flex justify-between items-center">
                    <div>
                        <div className="w-max py-1 rounded-md text-white text-sm flex justify-between items-center gap-2">
                            <p>&#128193;</p>
                            <div>
                                <p className="text-neutral-800 text">by {props.author}</p>
                            </div>
                        </div>
                        <h5 className="mt-2 text-2xl font-bold tracking-tight text-neutral-800 leading-7">{props.title}</h5>
                        <div className="flex gap-3 items-center mt-2">
                            <div className="w-max py-1 rounded-md text-white text-xs flex justify-between gap-2">
                                <p>&#128197;</p>
                                <p className="text-neutral-800">{props.createdAt}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link href={`/user/blog/update/${props.slug}`}>
                            <button className="p-1 px-2 border rounded-md text-sm">&#9999;&#65039;</button>
                        </Link>
                        <button onClick={deletePost} className="p-1 px-2 border rounded-md text-sm">&#128465;&#65039;</button>
                    </div>
                </div>
            </a>
        </>
    )
}

export default PostCard