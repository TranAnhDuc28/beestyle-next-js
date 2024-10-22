import {Checkbox, Col, Collapse, GetProp, Radio, RadioChangeEvent, Row, Space, Typography} from "antd";
import {STATUS} from "@/constants/Status";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {memo, useEffect, useState} from "react";

const {Title} = Typography;

const optionsLevelCategory = [
    {label: 'Cấp 1', value: 1},
    {label: 'Cấp 2', value: 2},
    {label: 'Cấp 3', value: 3},
]

interface IProps {
    error?: Error;
}

const CategoryFilter = (props: IProps) => {
    const [isErrorNetWork, setErrorNetWork] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const {error} = props;

    useEffect(() => {
        if (error) setErrorNetWork(true);
        else setErrorNetWork(false);
    }, [error]);

    const onChangeStatus = (e: RadioChangeEvent) => {
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

    const onChangeLevel: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any[]) => {
        const params = new URLSearchParams(searchParams.toString());
        if (checkedValues.length > 0 && checkedValues.length < optionsLevelCategory.length) {
            console.log(checkedValues.toString());
            params.set("level", checkedValues.toString());
            params.set("page", "1");
        } else {
            params.delete("level");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <Space direction="vertical" style={{minWidth: 256}}>
            <Collapse
                size="small" className="w-full bg-white" ghost expandIconPosition="end"
                style={{borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', maxWidth: 256}}
                items={[
                    {
                        key: 'level',
                        label: <Title level={5} style={{margin: '0px 10px'}}>Cấp danh mục</Title>,
                        children: (
                            <Checkbox.Group onChange={onChangeLevel} disabled={isErrorNetWork}>
                                <Row>
                                    {optionsLevelCategory.map((item) => (
                                        <Col key={item.value} span={24} style={{marginBottom: 10}}>
                                            <Checkbox value={item.value} style={{marginLeft: 10}}>
                                                {item.label}
                                            </Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </Checkbox.Group>
                        ),
                    },
                ]}
            />

            <Collapse
                size="small" className="w-full bg-white" ghost expandIconPosition="end"
                style={{borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', maxWidth: 256}}
                items={[
                    {
                        key: 'status',
                        label: <Title level={5} style={{margin: '0px 10px'}}>Trạng thái</Title>,
                        children: (
                            <Radio.Group onChange={onChangeStatus} disabled={isErrorNetWork}>
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
export default memo(CategoryFilter);
