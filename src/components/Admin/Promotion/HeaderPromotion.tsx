import {DatePicker, Flex, GetProps, Input, Space, Typography} from "antd";
import Search from "antd/es/input/Search";
import ColorButton from "@/components/Button/ColorButton";
import {PlusOutlined} from "@ant-design/icons";
import {memo, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";



type SearchProps = GetProps<typeof Input.Search>;
const {Title} = Typography;
const {RangePicker} = DatePicker;

interface IProps {
    setIsCreateModalOpen: (value: boolean) => void;
}

const HeaderPromotion = (props: IProps) => {
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    const {setIsCreateModalOpen} = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);
    const onSearch: SearchProps['onSearch'] =
        (value, _e, info) => {
            if (info?.source === "input" && value) {
                params.set("name", value);
                params.set("page", "1");
                replace(`${pathname}?${params.toString()}`);
            } else {
                params.delete("name")
                replace(`${pathname}?${params.toString()}`);
            }
        }
    // const handleDateChange = async (dates: any, dateStrings: [string, string]) => {
    //     params.set("startDate", dateStrings[0]);
    //     params.set("endDate", dateStrings[1]);
    //     replace(`${pathname}?${params.toString()}`);
    //     await fetchVouchersByDate();
    // };

    // const fetchVouchersByDate = async () => {
    //     const startDate = params.get("startDate");
    //     const endDate = params.get("endDate");
    //     const page = params.get("page") || "0";
    //
    //     const data = await findVouchersByDate(startDate, endDate, page);
    //     if (data && data.data) {
    //         const vouchersData = data.data.content || data.data.items || [];
    //         setVouchers(vouchersData);
    //     } else {
    //         setVouchers([]);
    //     }
    // };
    return (
        <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
            <Title level={3} style={{margin: '0px 0px 20px 10px', minWidth: 256, flexGrow: 1}}>Đợt Khuyến mại</Title>
            <div className="w-full">
                <Flex justify={'space-between'} align={'center'}>
                    <div className="flex-grow max-w-xs">
                        <Search
                            placeholder="Theo tên voucher"
                            allowClear
                            onSearch={onSearch}
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className="flex-grow max-w-xs">
                        <RangePicker
                            // onChange={handleDateChange}
                            placeholder={['Từ ngày', 'Đến ngày']}
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
                                Thêm đợt khuyến mại
                            </ColorButton>
                        </Space>
                    </div>
                </Flex>
            </div>
        </Flex>
    );
}

export default memo(HeaderPromotion);