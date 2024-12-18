"use client"
import React, {useState} from "react";
import Link from "next/link";
import {
    CheckOutlined, DropboxOutlined,
    HomeOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import {
    Badge,
    Breadcrumb,
    Button,
    Descriptions,
    DescriptionsProps,
    Layout,
    StepProps,
    Steps,
    theme,
    Typography
} from "antd";
import {IOrder} from "@/types/IOrder";
import {useParams} from "next/navigation";
import {FaShippingFast} from "react-icons/fa";
import {LiaBoxSolid} from "react-icons/lia";
import OrderDetailTable from "@/components/Admin/Order/Detail/OrderDetailTable";

const {Content} = Layout;
const {Title, Text} = Typography;

interface IProps {
    order?: IOrder;
}

const itemDescriptions: DescriptionsProps['items'] = [
    {key: '1', label: 'Product', children: 'Cloud Database',},
    {key: '2', label: 'Billing Mode', children: 'Prepaid',},
    {key: '3', label: 'Automatic Renewal', children: 'YES',},
    {key: '4', label: 'Order time', children: '2018-04-24 18:00:00',},
    {key: '5', label: 'Usage Time', children: '2019-04-24 18:00:00', span: 2,},
    {key: '6', label: 'Status', children: <Badge status="processing" text="Running"/>, span: 3,},
    {key: '7', label: 'Negotiated Amount', children: '$80.00',},
    {key: '8', label: 'Discount', children: '$20.00',},
    {key: '9', label: 'Official Receipts', children: '$60.00',},
    {
        key: '10', label: 'Config Info',
        children: (
            <>
                Data disk type: MongoDB
                <br/>
                Database version: 3.4
                <br/>
                Package: dds.mongo.mid
                <br/>
                Storage space: 10 GB
                <br/>
                Replication factor: 3
                <br/>
                Region: East China 1
                <br/>
            </>
        ),
    },
];

const OrderDetailComponent: React.FC<IProps> = (props) => {
    const {token} = theme.useToken();
    const {"order-tracking-number": orderTrackingNumber} = useParams();

    const [current, setCurrent] = useState(0);


    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const itemSteps: StepProps[] = [
        {
            title: "Đặt hàng",
            status: "finish",
            icon: <DropboxOutlined style={{fontSize: 35}}/>,
        },
        {
            title: "Chờ xác nhận",
            status: 'process',
            icon: <LoadingOutlined style={{fontSize: 35}}/>,
        },
        {
            title: "Chờ giao hàng",
            status: 'wait',
            icon: <LiaBoxSolid style={{fontSize: 35}}/>,
        },
        {
            title: "Đang giao hàng",
            status: 'wait',
            icon: <FaShippingFast style={{fontSize: 35}}/>,
        },
        {
            title: 'Hoàn thành',
            status: 'wait',
            icon: <CheckOutlined style={{fontSize: 35}}/>,
        },
    ];

    return (
        <>
            <Breadcrumb
                items={[
                    {title: <Link href={"/admin"}><HomeOutlined/></Link>,},
                    {title: <Link href={"/admin/order"}>Hóa đơn</Link>,},
                    {title: 'Chi tiết'},
                ]}
            />

            <Title level={4} style={{margin: '20px 10px 10px 10px'}}>
                Mã đơn hàng
                <Text type="secondary" style={{marginInlineStart: 10, fontSize: 20}}>
                    {orderTrackingNumber}
                </Text>
            </Title>
            <Content
                style={{
                    backgroundColor: token.colorBgContainer,
                    borderRadius: token.borderRadiusLG,
                    padding: 30
                }}
            >
                <Steps
                    current={current}
                    items={itemSteps}
                />

                <div style={{marginTop: 24}}>
                    {current < itemSteps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === itemSteps.length - 1 && (
                        <Button type="primary">
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Content>

            <Title level={4} style={{margin: '20px 10px 10px 10px'}}>
                Thông tin đơn hàng
            </Title>
            <Content style={{backgroundColor: token.colorBgContainer, borderRadius: token.borderRadiusLG}}>
                <Descriptions bordered size="middle" items={itemDescriptions}/>
            </Content>

            <Title level={4} style={{margin: '20px 10px 10px 10px'}}>
                Danh sách sản phẩm đã đặt mua
            </Title>
            <Content style={{backgroundColor: token.colorBgContainer, borderRadius: token.borderRadiusLG}}>
                <OrderDetailTable/>
            </Content>
        </>
    );
}
export default OrderDetailComponent;