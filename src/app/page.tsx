import {Metadata} from "next";
import {Suspense} from "react";
import Loader from "@/components/Loader/Loader";
import {Result} from "antd";
import {SmileOutlined} from "@ant-design/icons";

export const metadata: Metadata = {
    title: "Home",
    description: "home",
};

export default function Home() {
    return (
        <Result
            icon={<SmileOutlined/>}
            title="Đang xây dựng, vui lòng quay lại sau!"
        />
    );
}
