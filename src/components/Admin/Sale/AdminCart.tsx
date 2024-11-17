import React, {memo, useContext, useEffect, useMemo} from "react";
import {Table, TableProps, Tag, theme, Typography} from "antd";
import {IProductVariantInCart} from "@/types/IProductVariant";
import {Content} from "antd/es/layout/layout";
import {DeleteOutlined} from "@ant-design/icons";
import {HandleCart} from "@/components/Admin/Sale/SaleComponent";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";

const {Text, Paragraph, Title} = Typography;

interface IProps {
}

const AdminCart:React.FC<IProps> = (props) => {
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();
    const handleCart = useContext(HandleCart);

    useEffect(() => console.log(handleCart?.dataCart), [handleCart?.dataCart]);

    const columns: TableProps<IProductVariantInCart>['columns'] = useMemo(() =>  [
        {
            title: '#', key: '#', align: "center", width: 50,
            render: (value, record, index) => <Text strong>{index + 1}</Text>,
        },
        {
            title: 'Sản phẩm', dataIndex: 'product', key: 'product', width: 250,
            render: (value, record, index) => {
                return (
                    <div className="ml-5">
                        <Text>{record.productName}</Text> <br/>
                        <Text type="secondary" style={{display: "flex", alignItems: "center"}}>
                            <span style={{marginInlineEnd: 4}}>
                                {`Màu: ${record.colorName}`}
                            </span>
                            {record.colorCode ? <Tag className="custom-tag" color={record.colorCode}/> : ""} |
                            {` Kích cỡ: ${record.sizeName}`}
                        </Text>
                    </div>
                );
            }
        },
        {title: 'Số lượng', dataIndex: 'quantity', key: 'quantity', align: "right", width: 100},
        {
            title: 'Đơn giá', dataIndex: 'price', key: 'price', align: "right", width: 130,
            render: (_, record) => {
                return `${record.salePrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',');
            }
        },
        {
            title: 'Tổng giá', key: 'totalPrice', align: "right", width: 130,
            render: (_, record) => {
                return (
                    <Text strong>
                        {`${(record.quantity ?? 0) * (record.salePrice ?? 0)}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                    </Text>
                );
            }
        },
        {
            title: 'Action', key:
                'action', align:
                "center", width:
                70,
            render:
                (_, record) => (
                    <DeleteOutlined
                        style={{cursor: "pointer", padding: "5px", borderRadius: "5px"}}
                        onClick={() => handleCart?.handleDeleteProductInCart(record.id)}
                    />
                ),
        },
    ], [handleCart?.dataCart]);

    return (
        <Content
            style={{
                borderRadius: borderRadiusLG,
                boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                padding: 10,
                overflow: "auto",
                height: 715
            }}
        >
            <Table<IProductVariantInCart>
                rowKey="id"
                size="small"
                pagination={false}
                columns={columns}
                dataSource={handleCart?.dataCart}
                scroll={{y: 'calc(100vh - 290px)', scrollToFirstRowOnChange: true}}
            />
        </Content>
    );
}
export default memo(AdminCart);