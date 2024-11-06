import Login from "@/components/User/Account/Login";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "login",
};

export default function LoginPage() {
    return (
        <Login/>
    )
}