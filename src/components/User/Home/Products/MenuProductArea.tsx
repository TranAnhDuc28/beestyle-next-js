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
                          role="tab">Man</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/woman' ? 'active' : ''}`}
                          role="tab">Woman</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/kids' ? 'active' : ''}`}
                          role="tab">Kids</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/accessories' ? 'active' : ''}`}
                          role="tab">Accessories</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/essential' ? 'active' : ''}`}
                          role="tab">Essential</Link>
                </li>
                <li className="nav-item">
                    <Link href="#" className={`nav-link ${pathname === '/prices' ? 'active' : ''}`}
                          role="tab">Prices</Link>
                </li>
            </ul>
        </div>
    )
}