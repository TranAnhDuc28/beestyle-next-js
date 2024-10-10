import Link from "next/link";

export default function Home() {
    return (
        <div>
            <ul>
                <li>
                    <Link href={"/admin"}>Admin</Link>
                </li>
                <li>
                    <Link href={"/fb"}>Facebook</Link>
                </li>
            </ul>
        </div>
    );
}
