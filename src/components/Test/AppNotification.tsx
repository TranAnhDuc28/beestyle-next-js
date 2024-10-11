"use client"
import React, { useMemo } from 'react';
import { Button, Divider, notification, Space } from 'antd';
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Context = React.createContext({ name: 'Default' });


const AppNotification: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement, type: NotificationType) => {
        api[type]({
            message: `Notification ${placement}`,
            description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
            placement,
        });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Space>
                <Button type="primary" onClick={() => openNotification('topLeft', 'success')}>
                    topLeft - success
                </Button>
                <Button type="primary" onClick={() => openNotification('topLeft', 'info')}>
                    topLeft - info
                </Button>
                <Button type="primary" onClick={() => openNotification('topLeft', 'warning')}>
                    topLeft - warning
                </Button>
                <Button type="primary" onClick={() => openNotification('topLeft', 'error')}>
                    topLeft - error
                </Button>
            </Space>
            <Divider />
            <Space>
                <Button type="primary" onClick={() => openNotification('topRight', 'success')}>
                    topRight - success
                </Button>
                <Button type="primary" onClick={() => openNotification('topRight', 'info')}>
                    topRight - info
                </Button>
                <Button type="primary" onClick={() => openNotification('topRight', 'warning')}>
                    topRight - warning
                </Button>
                <Button type="primary" onClick={() => openNotification('topRight', 'error')}>
                    topRight - error
                </Button>
            </Space>
            <Divider />
            <Space>
                <Button type="primary" onClick={() => openNotification('bottomLeft', 'success')}>
                    bottomLeft - success
                </Button>
                <Button type="primary" onClick={() => openNotification('bottomLeft', 'info')}>
                    bottomLeft - info
                </Button>
                <Button type="primary" onClick={() => openNotification('bottomLeft', 'warning')}>
                    bottomLeft - warning
                </Button>
                <Button type="primary" onClick={() => openNotification('bottomLeft', 'error')}>
                    bottomLeft - error
                </Button>
            </Space>
            <Divider />
            <Space>
                <Button type="primary" onClick={() => openNotification('bottomRight', 'success')}>
                    bottomRight - success
                </Button>
                <Button type="primary" onClick={() => openNotification('bottomRight', 'info')}>
                    bottomRight - info
                </Button>
                <Button type="primary" onClick={() => openNotification('bottomRight', 'warning')}>
                    bottomRight - warning
                </Button>
                <Button type="primary" onClick={() => openNotification('bottomRight', 'error')}>
                    bottomRight - error
                </Button>
            </Space>
        </Context.Provider>
    );
};

export default AppNotification;