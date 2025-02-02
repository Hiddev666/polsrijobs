import Image from "next/image"
import Link from "next/link"

const PostDetail = (props) => {
    return (
        <div className="px-10 py-11 flex justify-center">
            <div className=" w-full sm:w-3/5">
                <h1 className="text-4xl leading-8 md:text-5xl font-bold mt-3">{props.title}</h1>
                <div className="flex flex-col mt-2 gap-1 mt-5">
                    <div className="w-max py-1 rounded-md text-white text-sm flex justify-between items-center gap-2">
                        <div className="p-2 rounded-full border">
                            <p>&#128102;</p>
                        </div>
                        <div>
                            <p className="text-neutral-800 font-semibold text">@{props.author}</p>
                            <p className="text-neutral-800 text-xs">{props.createdAt}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-t border-b p-3 mt-5">
                </div>
                <div className="mt-8 text-base md:text-lg leading-5" dangerouslySetInnerHTML={{ __html: props.body }}></div>
            </div>
        </div>
    )
}

export default PostDetail