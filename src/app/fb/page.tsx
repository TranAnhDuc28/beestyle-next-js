"use client"

import {useRouter} from "next/navigation";

function Facebook() {
    const router = useRouter();

    const handleBtn = () => {
        router.push("/");
    }

    return (
        <>
            <h1>Facebook</h1>
            <div>
                <button onClick={() => handleBtn()}>Back home</button>
            </div>
        </>
    );
}

export default Facebook;