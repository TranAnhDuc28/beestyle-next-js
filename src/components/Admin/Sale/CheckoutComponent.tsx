import React, {memo, useState} from "react";
import {
    AutoComplete,
    AutoCompleteProps,
    Button,
    Checkbox,
    CheckboxProps, Col,
    Divider,
    Drawer,
    Flex, InputNumber, Modal, Radio, Row, Select,
    Space, Switch, Tag,
    Typography
} from "antd";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {LiaShippingFastSolid} from "react-icons/lia";
import {BiSolidCoupon} from "react-icons/bi";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import {PAYMENT_METHOD} from "@/constants/PaymentMethod";
import {FORMAT_NUMBER_WITH_COMMAS, PARSER_NUMBER_WITH_COMMAS_TO_NUMBER} from "@/constants/AppConstants";

const {Title, Text} = Typography;


interface IProps {
    title?: string;
    open: boolean;
    onClose: () => void;
}

const tagsData = ['1,000,000', '2,000,000', '3,000,000', '4,000,000', '5,000,000', '6,000,000'];

const CheckoutComponent: React.FC<IProps> = (props) => {
    const {open, onClose} = props;
    const [tagVoucher, setTagVoucher] = useState<string[]>();
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = React.useState<string>("");

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTag = checked ? tag : tagsData.find((t) => t === tag);
        console.log('You are interested in: ', nextSelectedTag);
        setSelectedTag(nextSelectedTag ?? "");
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };

    const onChangeSwitch = (checked: boolean) => {
        console.log(`switch to ${checked}`);
    };

    return (
        <>
            <Drawer
                title={
                    <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                        <div style={{display: "flex", width: "60%"}}>
                            <Checkbox onChange={onChange}>
                                <Flex justify="space-between" align="center" wrap>
                                    <Text style={{fontSize: 14, marginInlineEnd: 4}}>Bán giao hàng</Text>
                                    <LiaShippingFastSolid style={{fontSize: 16}}/>
                                </Flex>
                            </Checkbox>
                        </div>
                    </Flex>
                }
                placement="right"
                width={700}
                onClose={onClose}
                open={open}
                closable={false}
                extra={
                    <div>
                        <Button onClick={onClose} type="text" icon={<CloseIcon/>}/>
                    </div>
                }
            >
                <div style={{marginBottom: 20}}>
                    <Title level={3}>Trần Anh Đức 0123456789</Title>
                </div>
                <Flex justify="space-between" align="center" style={{width: "100%"}} wrap gap={10}>
                    <Button onClick={showModal} type="primary" size="large">
                        Chọn Mã giảm giá
                    </Button>
                    <Tag
                        closeIcon
                        style={{display: "flex", alignItems: "center", padding: 5, fontSize: 16}}
                        color="processing"
                        onClose={console.log}
                    >
                        <BiSolidCoupon style={{display: "inline", marginInlineEnd: 5}}/>
                        <Text style={{fontSize: 16}}> VOUCHER001</Text>
                    </Tag>
                </Flex>
                <Divider style={{margin: "20px 0px"}}/>
                <Flex align="center" style={{width: "100%"}} wrap gap={10}>
                    <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                        <Text style={{fontSize: 16}}>Tổng tiền hàng</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>1,000,000</Text>
                    </Flex>
                    <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                        <Text style={{fontSize: 16}}>Giảm giá</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>1,000,000</Text>
                    </Flex>
                    <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                        <Text style={{fontSize: 16}}>Khách cần trả</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>1,000,000</Text>
                    </Flex>
                    <Flex justify="space-between" align="center" style={{width: "100%"}} wrap>
                        <Text style={{fontSize: 16}}>Khách thanh toán</Text>
                        <InputNumber<number>
                            className="custom-input"
                            formatter={(value) => `${value}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',')}
                            parser={(value) => value?.replace(PARSER_NUMBER_WITH_COMMAS_TO_NUMBER, '') as unknown as number}
                            style={{textAlignLast: "end", fontWeight: "bold", fontSize: 16, width: 150}}
                            controls={false}
                        />
                    </Flex>
                </Flex>
                <Divider style={{margin: "20px 0px"}}/>
                <Space direction="vertical" style={{width: "100%"}} wrap>
                    <div style={{marginBottom: 10}}>
                        <Radio.Group>
                            <Row gutter={[16, 16]}>
                                {Object.keys(PAYMENT_METHOD).map((key) => (
                                    <Col key={key}>
                                        <Radio value={key}>
                                            {PAYMENT_METHOD[key as keyof typeof PAYMENT_METHOD]}
                                        </Radio>
                                    </Col>
                                ))}
                            </Row>
                        </Radio.Group>
                    </div>
                    <div className="container-tag-price">
                        {tagsData.map<React.ReactNode>((tag, index) => (
                            <Tag.CheckableTag
                                key={index}
                                checked={selectedTag === tag}
                                onChange={(checked) => handleChange(tag, checked)}
                                className="tag-price-item"
                            >
                                {tag}
                            </Tag.CheckableTag>
                        ))}
                    </div>
                    <Flex justify="space-between" align="center" style={{width: "100%", marginTop: 10}} wrap>
                        <Text style={{fontSize: 16}}>Tiền thừa trả khách</Text>
                        <Text style={{fontSize: 16, marginInlineEnd: 10}} strong>1,000,000</Text>
                    </Flex>
                    <Flex justify="flex-start" align="center" style={{width: "100%"}} wrap gap={10}>
                        <Flex justify="flex-start" align="center" style={{width: "100%"}} wrap>
                            <Switch onChange={onChangeSwitch} style={{ marginInlineEnd: 10}}/>
                            <Text style={{fontSize: 16}}>Thanh toán khi nhận hàng</Text>
                        </Flex>
                        <Row>
                            <Col xs={8} sm={4} md={8} lg={8} xl={8}>
                                <Select
                                    size="large"
                                    showSearch
                                    placeholder="Tỉnh / Thành Phố"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        { value: '1', label: 'Jack' },
                                        { value: '2', label: 'Lucy' },
                                        { value: '3', label: 'Tom' },
                                    ]}
                                />
                            </Col>
                            <Col xs={8} sm={16} md={8} lg={8} xl={8}>
                                <Select
                                    size="large"
                                    showSearch
                                    placeholder="Quận / Huyện"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        { value: '1', label: 'Jack' },
                                        { value: '2', label: 'Lucy' },
                                        { value: '3', label: 'Tom' },
                                    ]}
                                />
                            </Col>
                            <Col xs={8} sm={4} md={8} lg={8} xl={8}>
                                <Select
                                    size="large"
                                    showSearch
                                    placeholder="Phường / Xã"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        { value: '1', label: 'Jack' },
                                        { value: '2', label: 'Lucy' },
                                        { value: '3', label: 'Tom' },
                                    ]}
                                />
                            </Col>
                        </Row>
                    </Flex>


                </Space>


            </Drawer>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
}
export default memo(CheckoutComponent);