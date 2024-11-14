import {Avatar, Card, Flex, List, Space, Typography} from "antd";
import React, {memo} from "react";

const {Text, Title} = Typography;

interface IProps {
    dataSource?: any[];
    setOpenModalListProductVariant: (value: boolean) => void;
}

const ProductListView: React.FC<IProps> = (props) => {
    const {dataSource, setOpenModalListProductVariant} = props;

    return (
        <List
            style={{width: "100%"}}
            dataSource={dataSource}
            renderItem={(item, index) => (
                <List.Item style={{borderBottom: 'none', padding: "5px 0px"}}>
                    <Card style={{flex: "1", cursor: "pointer"}} styles={{body: {padding: 10}}}
                          onClick={() => setOpenModalListProductVariant(true)}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar shape="square" src="/BuiQuangLan.png"
                                        size={{xs: 24, sm: 32, md: 40, lg: 48, xl: 56, xxl: 64}}
                                />
                            }
                            title={
                                <Flex align="center" justify="space-between">
                                    {`${item.productCode} / ${item.productName}`}
                                    <Title level={5}>
                                        {`${item.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </Title>
                                </Flex>
                            }
                            description={`Tổng số: ${item.quantity}`}
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
}
export default memo(ProductListView);
