'use client';

import {Tabs, theme, TabsProps, Flex, Row, Col, Typography, Layout} from 'antd';
import {useState} from 'react';
import LoginFormOwner from "@/components/User/Account/LoginFormOwner";
import RegisterForm from "@/components/User/Account/RegisterForm";

const {Text} = Typography;
const {Content} = Layout;

const AuthenticationOwnerComponent = () => {
    const [tabAuthKey, setTabAuthKey] = useState<string>('login');

    const handleRegisterSuccess = () => {
        // Chuyển tab sang "Đăng nhập" khi đăng ký thành công
        setTabAuthKey('login');
    };

    const items: TabsProps['items'] = [
        {
            key: 'login',
            label: (
                <Text strong
                      style={{
                          color: tabAuthKey === 'login' ? '#F7941D' : '#000000',
                          fontSize: 20,
                          padding: 10
                      }}>
                    Đăng nhập
                </Text>
            ),
            children: <LoginFormOwner/>,
        },
        {
            key: 'register',
            label: (
                <Text strong
                      style={{
                          color: tabAuthKey === 'register' ? '#F7941D' : '#000000',
                          fontSize: 20,
                          padding: 10
                      }}>
                    Đăng ký
                </Text>

            ),
            children: <RegisterForm handleRegisterSuccess={handleRegisterSuccess}/>,
        },
    ];

    return (
        <>
            <Content>
                <Flex justify="center" align="center" style={{width: "100%", minHeight: 700}}>
                    <Tabs
                        centered
                        activeKey={tabAuthKey}
                        onChange={(activeKey) => setTabAuthKey(activeKey)}
                        className="custom-tabs"
                        items={items}
                        style={{width: "25%", minWidth: 400}}
                    />
                </Flex>
            </Content>
        </>
    );
};

export default AuthenticationOwnerComponent;
