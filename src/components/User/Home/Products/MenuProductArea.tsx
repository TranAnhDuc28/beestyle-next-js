'use client';

import React from "react";
import Link from "next/link";
import {usePathname} from 'next/navigation';

export default function MenuProductArea() {

    const pathname = usePathname();

    return (
        <div className="nav-main">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/home' ? 'active' : ''}`}
                          role="tab">Nam</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/woman' ? 'active' : ''}`}
                          role="tab">Nữ</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/kids' ? 'active' : ''}`}
                          role="tab">Trẻ em</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/essential' ? 'active' : ''}`}
                          role="tab">Phổ biến</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/prices' ? 'active' : ''}`}
                          role="tab">Ưu đãi</Link>
                </li>
            </ul>
        </div>
    )
}