"use client"
import React, {memo, useEffect, useMemo, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Checkbox, Col, Collapse, Input, Radio, RadioChangeEvent, Row, Space, Tree, TreeDataNode, Typography} from "antd";
import type { GetProp } from 'antd';
import {STATUS} from "@/constants/Status";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import "./css/product.css";

const {Title} = Typography;

interface IProps {
    error?: Error;
}

const {Search} = Input;

const x = 7;
const y = 3;
const z = 1;
const defaultData: TreeDataNode[] = [];

const generateData = (_level: number, _preKey?: React.Key, _tns?: TreeDataNode[]) => {
    const preKey = _preKey || '0';
    const tns = _tns || defaultData;

    const children: React.Key[] = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({title: key, key});
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList: { key: React.Key; title: string }[] = [];
const generateList = (data: TreeDataNode[]) => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const {key} = node;
        dataList.push({key, title: key as string});
        if (node.children) {
            generateList(node.children);
        }
    }
};
generateList(defaultData);

const getParentKey = (key: React.Key, tree: TreeDataNode[]): React.Key => {
    let parentKey: React.Key;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some((item) => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey!;
};

const optionsBrand = [
    {key: 1, label: 'Thuong hieu 1', value: 'thuonghieu1' },
    {key: 2, label: 'Thuong hieu 2', value: 'thuonghieu2' },
    {key: 3, label: 'Thuong hieu 3', value: 'thuonghieu3' },
    {key: 4, label: 'Thuong hieu 4', value: 'thuonghieu4' },
    {key: 5, label: 'Thuong hieu 5', value: 'thuonghieu5' },
]

const optionsMaterial = [
    {key: 1, label: 'Chat lieu 1', value: 'chatlieu1' },
    {key: 2, label: 'Chat lieu 2', value: 'chatlieu2' },
    {key: 3, label: 'Chat lieu 3', value: 'chatlieu3' },
    {key: 4, label: 'Chat lieu 4', value: 'chatlieu4' },
    {key: 5, label: 'Chat lieu 5', value: 'chatlieu5' },
]

const ProductFilter = (props: IProps) => {
    const [isErrorNetWork, setErrorNetWork] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const {error} = props;

    useEffect(() => {
        if (error) setErrorNetWork(true);
        else setErrorNetWork(false);
    }, [error]);

    const onChangeGenderProductFilter = (e: RadioChangeEvent) => {
        const params = new URLSearchParams(searchParams);
        const value = e.target.value;
        if (value) {
            params.set("status", value);
            params.set("page", "1");
        } else {
            params.delete("status");
        }
        // replace(`${pathname}?${params.toString()}`);
    };


    const onChangeBrandFilter: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        const params = new URLSearchParams(searchParams);
        if (checkedValues) {
            params.set("brand", checkedValues.toString());
            params.set("page", "1");
        } else {
            params.delete("brand");
        }
        // replace(`${pathname}?${params.toString()}`);
    };

    const onChangeMaterialFilter: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        const params = new URLSearchParams(searchParams);
        if (checkedValues) {
            params.set("brand", checkedValues.toString());
            params.set("page", "1");
        } else {
            params.delete("brand");
        }
        // replace(`${pathname}?${params.toString()}`);
    };

    const onChangeStatusFilter = (e: RadioChangeEvent) => {
        const params = new URLSearchParams(searchParams);
        const value = e.target.value;
        if (value) {
            params.set("gender", value);
            params.set("page", "1");
        } else {
            params.delete("gender");
        }
        // replace(`${pathname}?${params.toString()}`);
    };

    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [autoExpandParent, setAutoExpandParent] = useState(true);

    const onExpand = (newExpandedKeys: React.Key[]) => {
        setExpandedKeys(newExpandedKeys);
        setAutoExpandParent(false);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        const newExpandedKeys = dataList
            .map((item) => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, defaultData);
                }
                return null;
            })
            .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
        setExpandedKeys(newExpandedKeys);
        setSearchValue(value);
        setAutoExpandParent(true);
    };

    const treeData = useMemo(() => {
        const loop = (data: TreeDataNode[]): TreeDataNode[] =>
            data.map((item) => {
                const strTitle = item.title as string;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span key={item.key}>
                            {beforeStr}
                            <span className="site-tree-search-value">{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span key={item.key}>{strTitle}</span>
                    );

                if (item.children) {
                    return {title, key: item.key, children: loop(item.children)};
                }

                return {title, key: item.key,};
            });

        return loop(defaultData);
    }, [searchValue]);


    return (
        <Space direction="vertical" style={{minWidth: 256}}>
            <Collapse
                size="small" className="w-full bg-white" ghost expandIconPosition="end"
                style={{borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', maxWidth: 256,}}
                items={[
                    {
                        key: 'category',
                        label: <Title level={5} style={{margin: '0px 10px'}}>Danh mục</Title>,
                        children: (
                            <div>
                                <Search style={{marginBottom: 10}} placeholder="Search" onChange={onChangeCategory}/>
                                <Tree
                                    onExpand={onExpand}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                    treeData={treeData}
                                    height={400}
                                    style={{maxWidth: '100%'}}
                                />
                            </div>
                        ),
                    },
                ]}
            />

            <Collapse
                size="small" className="w-full bg-white" ghost expandIconPosition="end"
                style={{borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', maxWidth: 256}}
                items={[
                    {
                        key: 'gender-product',
                        label: <Title level={5} style={{margin: '0px 10px'}}>Giới tính</Title>,
                        children: (
                            <Radio.Group onChange={onChangeGenderProductFilter} disabled={isErrorNetWork}>
                                <Row>
                                    <Col key={"ALL"} span={24} style={{marginBottom: 10}}>
                                        <Radio value={undefined} style={{marginLeft: 10}}>Tất cả</Radio>
                                    </Col>
                                    {Object.keys(GENDER_PRODUCT).map((key) => (
                                        <Col key={key} span={24} style={{marginBottom: 10}}>
                                            <Radio value={key} style={{marginLeft: 10}}>
                                                {GENDER_PRODUCT[key as keyof typeof GENDER_PRODUCT]}
                                            </Radio>
                                        </Col>
                                    ))}
                                </Row>
                            </Radio.Group>
                        ),
                    },
                ]}
            />

            <Collapse
                size="small" className="w-full bg-white" ghost expandIconPosition="end"
                style={{borderRadius: 8, boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)', maxWidth: 256}}
                items={[
                    {
                        key: 'gender-product',
                        label: <Title level={5} style={{margin: '0px 10px'}}>Thương hiệu</Title>,
                        children: (
                            <Checkbox.Group onChange={onChangeBrandFilter} disabled={isErrorNetWork}>
                                <Row>
                                    {optionsBrand.map((item) => (
                                        <Col key={item.key} span={24} style={{marginBottom: 10}}>
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
                        key: 'gender-product',
                        label: <Title level={5} style={{margin: '0px 10px'}}>Chất liệu</Title>,
                        children: (
                            <Checkbox.Group onChange={onChangeMaterialFilter} disabled={isErrorNetWork}>
                                <Row>
                                    {optionsMaterial.map((item) => (
                                        <Col key={item.key} span={24} style={{marginBottom: 10}}>
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
                            <Radio.Group onChange={onChangeStatusFilter} disabled={isErrorNetWork}>
                                <Row>
                                    <Col key={"ALL"} span={24} style={{marginBottom: 10}}>
                                        <Radio value={undefined} style={{marginLeft: 10}}>Tất cả</Radio>
                                    </Col>
                                    {Object.keys(STATUS).map((key) => (
                                        <Col key={key} span={24} style={{marginBottom: 10}}>
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
}
export default memo(ProductFilter);