import React from "react";
import {MdEmail, MdLocalPhone, MdLogin} from 'react-icons/md';
import {AiOutlineUser} from "react-icons/ai";
import Link from "next/link";
import {Divider, Flex, Typography} from "antd";

const {Text} = Typography;

export default function TopBar() {
    return (
        <>
            <div style={{backgroundColor: '#333', padding: "15px 30px"}}>
                <Flex justify="space-between" align="center" wrap>
                    <Flex gap={8} align="center">
                        <Flex align="center">
                            <MdLocalPhone size={18} style={{color: '#F7941D', marginInlineEnd: 7}}/>
                            <Text className="text-white">+84 123 456 789</Text>
                        </Flex>
                        <Divider style={{borderColor: '#ffffff'}} type="vertical"/>
                        <Flex align="center">
                            <MdEmail size={18} style={{color: '#F7941D', marginInlineEnd: 7}}/>
                            <Text className="text-white">support@beestyle.com</Text>
                        </Flex>
                    </Flex>

                    <Flex gap={8} align="center">
                        <Flex align="center">
                            <AiOutlineUser size={18} style={{color: '#F7941D', marginInlineEnd: 7}}/>
                            <Link href="#" style={{textDecoration: 'none'}}>
                                <Text className="text-white">Tài khoản của tôi</Text>
                            </Link>
                        </Flex>
                        <Divider style={{borderColor: '#ffffff'}} type="vertical"/>
                        <Flex align="center">
                            <MdLogin size={18} style={{color: '#F7941D', marginInlineEnd: 7}}/>
                            <Link href={"/login"} style={{textDecoration: 'none'}}>
                                <Text className="text-white">Đăng nhập</Text>
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </div>
        </>
    )
};
