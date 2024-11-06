import React, {memo, useState} from "react";
import {AutoComplete, AutoCompleteProps, Button, Divider, Drawer, Flex, Space, Typography} from "antd";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const {Title, Text} = Typography;


const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
});

interface IProps {
    title?: string;
    open: boolean;
    onClose: () => void;
}

const CheckoutComponent: React.FC<IProps> = (props) => {
    const {open, onClose} = props;
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

    const getPanelValue = (searchText: string) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    return (
        <Drawer
            title={
                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                    <div style={{display: "flex", width: "60%"}}>
                        <AutoComplete allowClear suffixIcon={<SearchOutlined/>} style={{width: "100%"}}
                                      options={options}
                                      onSearch={(text) => setOptions(getPanelValue(text))}
                                      placeholder="Tìm khách hàng"
                        />
                        <Button icon={<PlusOutlined/>} type="text" shape="circle"/>
                    </div>
                    <div>
                        <Button onClick={onClose} type="text" icon={<CloseIcon/>}/>
                    </div>
                </Flex>
            }
            placement="right"
            size="large"
            onClose={onClose}
            open={open}
            closable={false}
        >
            <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                <Title level={3}>Trần Anh Đức 0123456789</Title>
                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                    <Text style={{fontSize: 16}}>Tổng tiền hàng</Text>
                    <Text style={{fontSize: 16}} strong>1,000,000</Text>
                </Flex>
                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                    <Text style={{fontSize: 16}}>Giảm giá</Text>
                    <Text style={{fontSize: 16}} strong>1,000,000</Text>
                </Flex>
            </Flex>
            <Divider/>
            <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                    <Text style={{fontSize: 16}} strong>Khách cần trả</Text>
                    <Text style={{fontSize: 16}} strong>1,000,000</Text>
                </Flex>
                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                    <Text style={{fontSize: 16}} strong>Khách thanh toán</Text>
                    <Text style={{fontSize: 16}} strong>1,000,000</Text>
                </Flex>
            </Flex>
            <Divider/>
        </Drawer>
    );
}
export default memo(CheckoutComponent);