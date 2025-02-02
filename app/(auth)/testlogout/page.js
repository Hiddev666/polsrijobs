import axios from "axios";
import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

const TestLogout = () => {

    const token = getCookie("token")

    const logout = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            await axios.post("https://api-polsrijobs.vercel.app/api/auth/logout");
        } catch (error) {
        }
        redirect("/")
    }

    logout();

}

export default TestLogout

