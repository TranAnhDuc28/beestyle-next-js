import {Checkbox, Col, Collapse, Row, Space, Typography} from "antd";
import {STATUS} from "@/constants/Status"; // Đảm bảo rằng STATUS có chứa thông tin trạng thái cho voucher
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {memo} from "react";

const {Title} = Typography;

const VoucherFilter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const onChange = (checkedValues: any[]) => {
        const params = new URLSearchParams(searchParams);
        if (checkedValues.length > 0) {
            params.set("status", JSON.stringify(checkedValues)); // Giả sử bạn muốn lưu trữ nhiều giá trị trạng thái
            params.set("page", "1");
        } else {
            params.delete("status");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Space direction="vertical" style={{minWidth: 256}}>
            <Collapse
                size="small"
                className="w-full bg-white"
                style={{
                    borderRadius: 8,
                    boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                    maxWidth: 256
                }}
                ghost
                expandIconPosition="end"
            >
                <Collapse.Panel header={<Title level={5} style={{margin: '0px 10px'}}>Trạng thái</Title>} key="status">
                    <Checkbox.Group onChange={onChange}>
                        <Row>
                            {Object.keys(STATUS).map((key) => (
                                <Col key={key} span={24} style={{marginBottom: 10}}>
                                    <Checkbox value={key}>{STATUS[key as keyof typeof STATUS]}</Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Collapse.Panel>
            </Collapse>
        </Space>
    );
};

export default memo(VoucherFilter);
