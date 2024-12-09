import {Flex, GetProps, Input, Space, Typography} from "antd";
import Search from "antd/es/input/Search";
import React, {memo} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type SearchProps = GetProps<typeof Input.Search>;
const {Title} = Typography;

interface IProps {

}

const HeaderOrder: React.FC<IProps> = (props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

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

    return (
        <Flex align={"flex-start"} justify={"flex-start"} gap={"small"}>
            <Title level={3} style={{margin: '0px 0px 20px 10px', minWidth: 256, flexGrow: 1}}>Hoá đơn</Title>
            <div className="w-full">
                <Flex justify={'space-between'} align={'center'}>
                    <div className="flex-grow max-w-96">
                        <Search
                            placeholder="Tìm kiếm theo tên khách hàng, số điện thoại"
                            allowClear
                            onSearch={onSearch}
                            style={{width: '100%'}}
                        />
                    </div>
                </Flex>
            </div>
        </Flex>
    );
}

export default memo(HeaderOrder);