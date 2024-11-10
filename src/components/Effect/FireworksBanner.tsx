'use client';

import React, {useEffect, useRef, useState} from 'react';
import {Fireworks} from 'fireworks-js';
import '@/css/user/styles/fireworks.css';
import Image from "next/image";
import {Modal} from "antd";

const FireworksBanner = () => {
    const fireworksRef = useRef(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (fireworksRef.current && visible) {
            const fireworks = new Fireworks(fireworksRef.current, {
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 50,
                trace: 3,
                traceSpeed: 10,
                explosion: 5,
                intensity: 30,
                flickering: 50,
                lineStyle: 'round',
                hue: {min: 0, max: 360},
                delay: {min: 15, max: 30},
            });
            fireworks.start();

            setTimeout(() => fireworks.stop(), 5000);
            return () => fireworks.stop();
        }
    }, [visible]);


    const handleClose = () => setVisible(false);

    return (
        <>
            {visible && <div ref={fireworksRef} className={"modalContent"}></div>}
            <Modal
                open={visible}
                footer={null}
                onCancel={handleClose}
                centered
                width={500}
                height={500}
                closable={false}
                className={"custom-modal"}
            >
                <Image
                    src={"/ad_banner.jpg"}
                    alt={"IMG"}
                    width={500}
                    height={500}
                    style={{borderRadius: 10}}
                />
            </Modal>
        </>
    );
};

export default FireworksBanner;
