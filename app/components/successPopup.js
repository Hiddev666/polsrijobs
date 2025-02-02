import Image from "next/image"
import Link from "next/link"

const SuccessPopup = (props) => {
    return (
        <div className="w-full h-screen fixed z-20 left-0 flex bg-black/50 justify-center items-center top-0">
            <div className="bg-white border rounded-md flex flex-col items-center justify-center w-3/5 p-5 sm:w-fit gap-5 pt-10">
                <Image
                    src={"/success.svg"}
                    width={70}
                    height={70}
                    alt="success"
                />
                <div className="flex flex-col gap-5 items-center justify-center text-center">
                    <h2 className="font-semibold text-lg">{props.message}</h2>
                    <Link href={"/"}>
                        <button className="bg-neutral-800 text-white font-medium px-3 py-2 w-full rounded-md">Oke</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SuccessPopup