import React from 'react';
import {Card, Descriptions, Table, Statistic, Row, Col, Button} from 'antd';

const InvoiceDetail = (val) => {

    const ordInfo = {
        code: val.orderTrackingNumber,
        name: val.customerName,
        branch: 'Chi nhánh trung tâm',
        creator: 'Lê Thị Bảo Trân',
        salesChannel: val.orderChannel,
        paymentDate: val.paymentDate.replace('T', ' '),
        status: val.status
    };

    const invoiceData = [
        {
            key: '1',
            code: 'NAM004',
            name: 'Áo vest nam màu xanh trắng',
            quantity: 4,
            price: 1299000,
            discount: 0,
            total: 5196000,
        },
        {
            key: '2',
            code: 'NAM005',
            name: 'Áo sơ mi nam màu đỏ caro',
            quantity: 9,
            price: 959200,
            discount: 0,
            total: 8632800,
        },
    ];

    const columns = [
        {title: 'Mã hàng', dataIndex: 'code', key: 'code'},
        {title: 'Tên hàng', dataIndex: 'name', key: 'name'},
        {title: 'Số lượng', dataIndex: 'quantity', key: 'quantity'},
        {title: 'Đơn giá', dataIndex: 'price', key: 'price', render: (value) => value.toLocaleString()},
        {title: 'Giảm giá', dataIndex: 'discount', key: 'discount', render: (value) => value.toLocaleString()},
        {title: 'Giá bán', dataIndex: 'price', key: 'price', render: (value) => value.toLocaleString()},
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
                        <Table.Summary.Cell
                            colSpan={6}
                            align="right"
                            index={1}
                        >
                            Tổng tiền hàng:
                        </Table.Summary.Cell>
                        <Table.Summary.Cell
                            index={2}
                        >
                            {(invoiceData.reduce((sum, item) =>
                                sum + item.total, 0)).toLocaleString()}
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
                <Button type="primary" style={{marginRight: 8}}>Cập nhật</Button>
                <Button style={{marginRight: 8}}>Lưu</Button>
                <Button danger style={{marginRight: 8}}>Huỷ bỏ</Button>
            </Row>
        </Card>
    );
};

export default InvoiceDetail;
