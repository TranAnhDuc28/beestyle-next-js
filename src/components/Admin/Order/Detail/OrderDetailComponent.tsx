"use client"
import React from "react";
import Link from "next/link";
import {
    HomeOutlined,
} from "@ant-design/icons";
import {
    Badge,
    Breadcrumb,
    Descriptions,
    DescriptionsProps,
    Layout,
    theme,
    Typography
} from "antd";
import {IOrder} from "@/types/IOrder";
import {useParams} from "next/navigation";
import OrderDetailTable from "@/components/Admin/Order/Detail/OrderDetailTable";
import TimeLineOrderTrackingComponent from "@/components/Admin/Order/Detail/TimeLineOrderTrackingComponent";
import useOrder from "@/components/Admin/Order/hooks/useOrder";

const {Content} = Layout;
const {Title, Text} = Typography;

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

interface IProps {
    order?: IOrder;
}

const OrderDetailComponent: React.FC<IProps> = (props) => {
    const {token} = theme.useToken();
    const {id} = useParams();
    const {handleGetOrderService} = useOrder();
    const {data: orderDetail, error, isLoading, mutate} =
        handleGetOrderService(id && Number(id) ? Number(id) : null);

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
                    HD123456789
                </Text>
            </Title>
            <Content
                style={{
                    backgroundColor: token.colorBgContainer,
                    borderRadius: token.borderRadiusLG,
                    padding: 30
                }}
            >
                <TimeLineOrderTrackingComponent orderDetail={orderDetail}/>
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