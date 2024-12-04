import {Avatar, Card, Flex, List, Space, Typography} from "antd";
import React, {memo, useState} from "react";
import ModalListProductVariant from "@/components/Admin/Sale/ModalListProductVariant";
import {IProduct} from "@/types/IProduct";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";

const {Text, Title} = Typography;

interface IProps {
    dataSource?: any[];
}

const ProductListView: React.FC<IProps> = (props) => {
    const {dataSource} = props;
    const [isOpenModalListProductVariant, setOpenModalListProductVariant] = useState(false);
    const [productSelected, setProductSelected] = useState<IProduct | undefined>(undefined);

    return (
        <>
            <List
                style={{width: "100%"}}
                dataSource={dataSource}
                renderItem={(item, index) => (
                    <List.Item style={{borderBottom: 'none', padding: "5px 0px"}}>
                        <Card style={{flex: "1", cursor: "pointer"}} styles={{body: {padding: 8}}}
                              onClick={() => {
                                  setProductSelected(item);
                                  setOpenModalListProductVariant(true);
                              }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar shape="square" src="/BuiQuangLan.png"
                                            size={{xs: 64, sm: 64, md: 64, lg: 64, xl: 72, xxl: 72}}
                                    />
                                }
                                title={
                                    <Flex align="center" justify="space-between" wrap>
                                        <Text strong>
                                            {`${item.productName}`}
                                        </Text>
                                        <Title level={5} style={{textAlign: "right", display: "block", margin: 0}}>
                                            {item.minSalePrice ? `${item.minSalePrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',') : 0}
                                        </Title>
                                    </Flex>
                                }
                                description={
                                    <>
                                        <span>Mã: {item.productCode}</span>
                                        <br/>
                                        <span>Tổng số: {item.totalProductInStock ?? 0}</span>
                                    </>
                                }
                            />
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
export default memo(ProductListView);
