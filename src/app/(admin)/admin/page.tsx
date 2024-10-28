import {Metadata} from "next";
<<<<<<< HEAD:src/app/admin/page.tsx
<<<<<<<< HEAD:src/app/(admin)/admin/page.tsx
import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";
import Loader from "@/components/Loader/UserLoader";
========
import {Suspense} from "react";
import Loader from "@/components/Loader/Loader";
import {Result} from "antd";
import {SmileOutlined} from "@ant-design/icons";
>>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038:src/app/page.tsx

export const metadata: Metadata = {
    title: "Home",
    description: "home",
};

export default function Home() {
    return (
<<<<<<<< HEAD:src/app/(admin)/admin/page.tsx
        <Suspense fallback={<Loader/>}>
             <Dashboard/>
        </Suspense>
========
        <Result
            icon={<SmileOutlined/>}
            title="Đang xây dựng, vui lòng quay lại sau!"
        />
>>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038:src/app/page.tsx
=======
import Dashboard from "@/components/Dashboard/Dashboard";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "dashboard",
};

export default function HomeAdmin() {
    return (
        <Suspense fallback={<Loader/>}>
            <Dashboard/>
        </Suspense>
>>>>>>> be4cc2f8c258eb45a9281f7553538b4c4b206038:src/app/(admin)/admin/page.tsx
    );
}
