import {Checkbox, Col, Collapse, GetProp, Row, Space, Typography} from "antd";
import { STATUS } from "@/constants/Status";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {memo, useEffect, useState} from "react";

const { Title } = Typography;

interface IProps {
    error?: Error;
}

const MaterialFilter = (props: IProps) => {
    const [isErrorNetWork, setErrorNetWork] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const { error } = props;

    useEffect(() => {
        if (error) setErrorNetWork(true);
    }, [error]);

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any[]) => {
        const params = new URLSearchParams(searchParams);
        if (checkedValues.length === 1) {
            // console.log(checkedValues);
            params.set("status", checkedValues[0]);
            params.set("page", "1");
        } else {
            params.delete("status");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <Space direction="vertical" style={{ minWidth: 256 }}>
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
                items={[
                    {
                        key: 'status',
                        label: <Title level={5} style={{ margin: '0px 10px' }}>Trạng thái</Title>,
                        children: (
                            <Checkbox.Group onChange={onChange} disabled={isErrorNetWork}>
                                <Row>
                                    {Object.keys(STATUS).map((key) => (
                                        <Col key={key} span={24} style={{ marginBottom: 10 }}>
                                            <Checkbox value={key}>{STATUS[key as keyof typeof STATUS]}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        ),
                    },
                ]}
            />
        </Space>
    );
};

export default memo(MaterialFilter);
