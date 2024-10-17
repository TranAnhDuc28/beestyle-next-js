import {Flex, GetProps, Input, Space, Typography} from "antd";
import Search from "antd/es/input/Search";
import ColorButton from "@/components/Button/ColorButton";
import {PlusOutlined} from "@ant-design/icons";
import {memo} from "react";

type SearchProps = GetProps<typeof Input.Search>;
const {Title} = Typography;

const onSearch: SearchProps['onSearch'] =
    (value, _e, info) => {
    console.log(info?.source, value);
}

interface IProps {
    setIsCreateModalOpen: (value: boolean) => void;
}

const HeaderMaterial = (props: IProps) => {
    console.log("HeaderMaterial render");
    const {setIsCreateModalOpen} = props;

    return (
        <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
            <Title level={3} style={{margin: '0px 0px 20px 10px', minWidth: 256, flexGrow: 1}}>Chất liệu</Title>
            <div className="w-full">
                <Flex justify={'space-between'} align={'center'}>
                    <div className="flex-grow max-w-96">
                        <Search
                            placeholder="Nhập tên chất liệu"
                            allowClear
                            onSearch={onSearch}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div>
                        <Space>
                            <ColorButton
                                bgColor="#00b96b"
                                type="primary"
                                icon={<PlusOutlined/>}
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                Thêm chất liệu
                            </ColorButton>
                            {/*<Dropdown menu={{items}} trigger={['click']}>*/}
                            {/*    <ColorButton*/}
                            {/*        bgColor="#00b96b"*/}
                            {/*        type="primary"*/}
                            {/*        icon={<MenuOutlined/>}*/}
                            {/*    >*/}
                            {/*        <CaretDownOutlined/>*/}
                            {/*    </ColorButton>*/}
                            {/*</Dropdown>*/}
                        </Space>
                    </div>
                </Flex>
            </div>
        </Flex>
    );
}

export default memo(HeaderMaterial);