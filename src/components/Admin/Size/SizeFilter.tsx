import {Checkbox, Col, Collapse, GetProp, Radio, RadioChangeEvent, Row, Space, Typography} from "antd";
import { STATUS } from "@/constants/Status";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {memo, useEffect, useState} from "react";

const { Title } = Typography;

interface IProps {
    error?: Error;
}

const SizeFilter = (props: IProps) => {
    const [isErrorNetWork, setErrorNetWork] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { error } = props;

    useEffect(() => {
        if (error) setErrorNetWork(true);
        else setErrorNetWork(false);
    }, [error]);

    const onChange = (e: RadioChangeEvent) => {
        const params = new URLSearchParams(searchParams);
        const value = e.target.value;
        if (value) {
            params.set("status", value);
            params.set("page", "1");
        } else {
            params.delete("status");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Space direction="vertical" style={{ minWidth: 256 }}>
            <Collapse size="small" className="w-full bg-white" ghost expandIconPosition="end"
                style={{borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', maxWidth: 256}}
                items={[
                    {
                        key: 'status',
                        label: <Title level={5} style={{ margin: '0px 10px' }}>Trạng thái</Title>,
                        children: (
                            <Radio.Group onChange={onChange} disabled={isErrorNetWork}>
                                <Row>
                                    <Col key={"ALL"} span={24} style={{ marginBottom: 10 }}>
                                        <Radio value={undefined} style={{marginLeft: 10}}>Tất cả</Radio>
                                    </Col>
                                    {Object.keys(STATUS).map((key) => (
                                        <Col key={key} span={24} style={{ marginBottom: 10 }}>
                                            <Radio value={key} style={{marginLeft: 10}}>
                                                {STATUS[key as keyof typeof STATUS]}
                                            </Radio>
                                        </Col>
                                    ))}
                                </Row>
                            </Radio.Group>
                        ),
                    },
                ]}
            />
        </Space>
    );
};
export default memo(SizeFilter);
