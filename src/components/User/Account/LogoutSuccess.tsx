'use client';

import React, { useEffect } from 'react';

const LogoutSuccess: React.FC = () => {
    const [countdown, setCountdown] = React.useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
            if (countdown === 0) return;
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            window.location.assign('/');
        }
    }, [countdown]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full sm:w-3/4 md:w-1/2">
                <svg
                    className="fill-current h-6 w-6 text-green-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span className="block">
                    Bạn đã đăng xuất khỏi tài khoản và sẽ trở về trang chủ của chúng tôi sau{' '}
                    <strong>{countdown} giây</strong>.
                </span>
            </div>
        </div>
    );
};

export default LogoutSuccess;
