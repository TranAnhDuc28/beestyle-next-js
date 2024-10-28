import {Card, Descriptions, Table, Statistic, Row, Col, Button} from 'antd';
import React, {useEffect, useState} from "react";
import {getOrdersById, URL_API_ORDER} from "@/services/OrderService";
import useSWR from "swr";

const InvoiceDetail: React.FC<{ record: any }> = ({record}) => {
    const [invoiceData, setInvoiceData] = useState([]);
    const [extraData, setExtraData] = useState(null);

    const url = `${URL_API_ORDER.create}admin/order-item?id=${record.id}`;
    const {data: detail} = useSWR(url, getOrdersById, {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });

    useEffect(() => {
        if (detail) {
            setExtraData(detail.data.items);
        }
    }, [detail]);

    useEffect(() => {
        if (extraData && extraData.length > 0) {
            const invoices = extraData.map(d => ({
                key: d.id,
                code: d.productVariant.sku,
                name: d.productResponse.productName,
                color: d.productVariant.color.colorName,
                size: d.productVariant.size.sizeName,
                quantity: d.quantity,
                price: d.originalPrice,
                discount: d.discountedPrice,
                total: (d.originalPrice - d.discountedPrice),
            }));
            setInvoiceData(invoices);
        }
    }, [extraData]);

    const ordInfo = {
        code: record.orderTrackingNumber,
        name: record.customerName,
        branch: 'Chi nhánh trung tâm',
        creator: 'Lê Thị Bảo Trân',
        salesChannel: record.orderChannel,
        paymentDate: record.paymentDate.replace('T', ' '),
        status: record.status,
    };

    const columns = [
        {title: 'Mã sản phẩm', dataIndex: 'code', key: 'code'},
        {title: 'Tên sản phẩm', dataIndex: 'name', key: 'name'},
        {title: 'Màu sắc', dataIndex: 'color', key: 'color'},
        {title: 'Kích thước', dataIndex: 'size', key: 'size'},
        {title: 'Số lượng', dataIndex: 'quantity', key: 'quantity'},
        {title: 'Giá bán', dataIndex: 'price', key: 'price', render: (value) => value.toLocaleString()},
        {title: 'Giảm giá', dataIndex: 'discount', key: 'discount', render: (value) => value.toLocaleString()},
        {title: 'Thành tiền', dataIndex: 'total', key: 'total', render: (value) => value.toLocaleString()},
    ];

    return (
        <Card title="Chi tiết hoá đơn" bordered={false} style={{width: '100%'}}>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="Mã hoá đơn">{ordInfo.code}</Descriptions.Item>
                <Descriptions.Item label="Trạng thái">{ordInfo.status}</Descriptions.Item>
                <Descriptions.Item label="Thời gian">{ordInfo.paymentDate}</Descriptions.Item>
                <Descriptions.Item label="Chi nhánh">{ordInfo.branch}</Descriptions.Item>
                <Descriptions.Item label="Khách hàng"><a href="#">{ordInfo.name}</a></Descriptions.Item>
                <Descriptions.Item label="Người bán">{ordInfo.creator}</Descriptions.Item>
                <Descriptions.Item label="Bảng giá">Bảng giá chung</Descriptions.Item>
                <Descriptions.Item label="Kênh bán">{ordInfo.salesChannel}</Descriptions.Item>
            </Descriptions>

            <Table
                columns={columns}
                dataSource={invoiceData}
                pagination={false}
                style={{marginTop: 20}}
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={7} align="right" index={1}>
                            Tổng tiền hàng:
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                            {(invoiceData.reduce((sum, item) => sum + item.total, 0)).toLocaleString()}
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />

            <Row style={{marginTop: 20}}>
                <Col span={12}>
                    <Statistic title="Khách cần trả" value={13828800}/>
                    <Statistic title="Khách đã trả" value={13828800} style={{marginTop: 16}}/>
                </Col>
            </Row>

            <Row style={{marginTop: 20, justifyContent: 'center'}}>
                <Button type="primary" style={{marginRight: 8}}>In hoá đơn</Button>
                <Button style={{marginRight: 8}}>Cập nhật</Button>
                <Button danger style={{marginRight: 8}}>Huỷ bỏ</Button>
            </Row>
        </Card>
    );
};

export default InvoiceDetail;