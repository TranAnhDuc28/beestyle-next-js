'use client';

import React from "react";
import Link from "next/link";
import {useSearchParams} from 'next/navigation';
import {handleFetch} from "@/services/user/ProductHomeService";

export default function MenuProductArea() {

    const params = useSearchParams();

    return (
        <div className="nav-main">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <Link
                        href=""
                        onClick={(event) => handleFetch("product?q=0", event)}
                        className={`nav-link ${params.get('q') === '0' ? 'active' : ''}`}
                        role="tab">Nam
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href=""
                        onClick={(event) => handleFetch("product?q=1", event)}
                        className={`nav-link ${params.get('q') === '1' ? 'active' : ''}`}
                        role="tab">Nữ
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href=""
                        onClick={(event) => handleFetch("product?q=2", event)}
                        className={`nav-link ${params.get('q') === '2' ? 'active' : ''}`}
                        role="tab">Trẻ em
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href=""
                        onClick={(event) => handleFetch("product?q=", event)}
                        className={`nav-link ${params.get('q') === '' ? 'active' : ''}`}
                        role="tab">Phổ biến
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href=""
                        onClick={(event) => handleFetch("product?q=", event)}
                        className={`nav-link ${params.get('q') === '' ? 'active' : ''}`}
                        role="tab">Ưu đãi
                    </Link>
                </li>
            </ul>
        </div>
    )
}
