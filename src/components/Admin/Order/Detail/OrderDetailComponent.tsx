"use client"
import React from "react";
import Link from "next/link";
import {
    HomeOutlined,
} from "@ant-design/icons";
import {
    Badge,
    Breadcrumb,
    Col,
    Descriptions,
    DescriptionsProps, Divider, Flex,
    Layout, Row,
    theme,
    Typography
} from "antd";
import {useParams} from "next/navigation";
import OrderDetailTable from "@/components/Admin/Order/Detail/OrderDetailTable";
import TimeLineOrderTrackingComponent from "@/components/Admin/Order/Detail/TimeLineOrderTrackingComponent";
import useOrder from "@/components/Admin/Order/hooks/useOrder";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";

const {Content} = Layout;
const {Title, Text} = Typography;

interface IProps {

}

const OrderDetailComponent: React.FC<IProps> = (props) => {
    const {token} = theme.useToken();
    const {id} = useParams();
    const {handleGetOrderService} = useOrder();
    const {orderDetail, error, isLoading, mutate} =
        handleGetOrderService(id && Number(id) ? Number(id) : null);

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
            <Content
                style={{
                    backgroundColor: token.colorBgContainer,
                    borderRadius: token.borderRadiusLG,
                    padding: 20
                }}>
                <Row gutter={[24, 0]} wrap>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                        <OrderDetailTable/>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                        <div
                            style={{width: "100%"}}
                        >
                            <Divider orientation="center" style={{marginTop: 5}}>Thông tin thanh toán</Divider>

                            <Flex justify="end" style={{padding: 10}}>
                                <Flex align="center" style={{width: "100%"}} wrap gap={10}>
                                    <Flex justify="space-between" align="center"
                                          style={{width: "100%", paddingBottom: 4}} wrap>
                                        <Text style={{fontSize: 16}}>
                                            <span style={{marginInlineEnd: 30}}>Tổng số lượng</span>
                                        </Text>

                                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                            {`${10}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                        </Text>
                                    </Flex>

                                    <Flex justify="space-between" align="center"
                                          style={{width: "100%", paddingBottom: 4}} wrap>
                                        <Text style={{fontSize: 16}}>
                                            <span style={{marginInlineEnd: 30}}>Tổng tiền hàng</span>
                                        </Text>

                                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                            {`${500000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                        </Text>
                                    </Flex>

                                    <Flex justify="space-between" align="center"
                                          style={{width: "100%", paddingBottom: 4}} wrap>
                                        <Text style={{fontSize: 16}}>
                                            <span style={{marginInlineEnd: 30}}>Giảm giá</span>
                                        </Text>

                                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                            {`${50000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                        </Text>
                                    </Flex>

                                    <Flex justify="space-between" align="center"
                                          style={{width: "100%", paddingBottom: 4}} wrap>
                                        <Text style={{fontSize: 16}}>
                                            <span style={{marginInlineEnd: 30}}>Phí vận chuyển</span>
                                        </Text>

                                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                            {`${30000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                        </Text>
                                    </Flex>

                                    <Flex justify="space-between" align="center"
                                          style={{width: "100%", paddingBottom: 4}} wrap>
                                        <Text style={{fontSize: 16}}>
                                            <span style={{marginInlineEnd: 30}}>Tổng thanh toán</span>
                                        </Text>

                                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                            {`${480000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                        </Text>
                                    </Flex>

                                    <Flex justify="space-between" align="center"
                                          style={{width: "100%", paddingBottom: 4}} wrap>
                                        <Text style={{fontSize: 16}}>
                                            <span style={{marginInlineEnd: 30}}>Khách cần trả</span>
                                        </Text>

                                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>
                                            {`${480000}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </div>
                    </Col>
                </Row>
            </Content>
        </>
    );
}
export default OrderDetailComponent;