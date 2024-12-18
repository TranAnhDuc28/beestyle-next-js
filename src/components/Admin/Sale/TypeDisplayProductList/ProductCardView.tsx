import {Card, List, Space, Tooltip, Typography} from "antd";
import React, {memo, useState} from "react";
import Marquee from "react-fast-marquee";
import {IProduct} from "@/types/IProduct";
import ModalListProductVariant from "@/components/Admin/Sale/ModalListProductVariant";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";

const {Text, Title} = Typography;

interface IProps {
    dataSource?: any[];
}

const ProductCardView: React.FC<IProps> = (props) => {
    const {dataSource} = props;
    const [isOpenModalListProductVariant, setOpenModalListProductVariant] = useState(false);
    const [productSelected, setProductSelected] = useState<IProduct | undefined>(undefined);

    return (
        <>
            <List
                grid={{gutter: 8, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4}}
                dataSource={dataSource}
                renderItem={(item: IProduct) => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{flex: "1", cursor: "pointer"}}
                            styles={{body: {padding: 10}}}
                            cover={<img alt="example" src="/BuiQuangLan.png"/>}
                            onClick={() => {
                                setProductSelected(item);
                                setOpenModalListProductVariant(true);
                            }}
                        >
                            <Space direction="vertical">
                                <Tooltip title={item.productName}>
                                    <div>
                                        <Marquee speed={30} pauseOnHover={true}>
                                            <Text strong style={{marginRight: 30}}>
                                                {item.productName}
                                            </Text>
                                        </Marquee>
                                    </div>
                                </Tooltip>
                                <Text type="secondary">
                                    <span>{`Mã: ${item.productCode}`}</span>
                                    <br/>
                                    <span>{`Tổng số: ${item.totalProductInStock ?? 0}`}</span>
                                </Text>
                                <Title level={5} style={{textAlign: "right", display: "block", margin: 0}}>
                                    {item.minSalePrice ? `${item.minSalePrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',') : 0}
                                </Title>
                            </Space>
                        </Card>
                    </List.Item>
                )}
            />

            <ModalListProductVariant
                product={productSelected}
                isOpenModalListProductVariant={isOpenModalListProductVariant}
                setOpenModalListProductVariant={setOpenModalListProductVariant}
            />
        </>
    );
}
export default memo(ProductCardView);

