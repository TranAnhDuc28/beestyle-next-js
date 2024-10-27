import React, {memo, useState} from 'react';
import {Col, FormInstance, InputNumber, Row, TableProps, Tooltip} from 'antd';
import {Form, Input, Table} from 'antd';
import {CheckCircleTwoTone, CloseCircleFilled, DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
import {IProductVariantCreate} from "@/types/IProductVariant";

const fakeData = Array.from({length: 7}).map<IProductVariantCreate>((_, i) => ({
    key: i.toString(),
    sku: `BT${i}-SP1-C${1}-S${i}`,
    productId: 1,
    productVariantName: `San pham 1 [color${i} - size${i}]`,
    colorId: i,
    sizeId: i,
    originalPrice: 1000,
    salePrice: 1200,
    quantityInStock: 10
}));

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: IProductVariantCreate;
    index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
                                                                                editing,
                                                                                dataIndex,
                                                                                title,
                                                                                inputType,
                                                                                record,
                                                                                index,
                                                                                children,
                                                                                ...restProps
                                                                            }) => {
    const inputNode = inputType === 'number' ?
        (
            <InputNumber style={{width: '100%'}} min={0}/>
        ) : (
            <Input placeholder="Mã hàng tự động"/>
        );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{margin: 0}}
                           rules={[{required: true, message: `Please Input ${title}!`}]}
                           initialValue={inputType === 'number' ? 0 : ''}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

interface IProps {
    form: FormInstance;
    setProductVariants: (data: IProductVariantCreate[]) => void;
}

const CreateProductVariantTable: React.FC<IProps> = (props) => {
    const {setProductVariants} = props;
    const [form] = Form.useForm();
    // const {form} = props;
    const [dataSource, setDataSource] = useState<IProductVariantCreate[]>(fakeData);
    const [editingKey, setEditingKey] = useState('');
    const [count, setCount] = useState(3);

    const isEditing = (record: IProductVariantCreate) => record.key === editingKey;

    const edit = (record: Partial<IProductVariantCreate> & { key: React.Key }) => {
        form.setFieldsValue({
            productVariantName: '',
            sku: '',
            originalPrice: '',
            salePrice: '',
            quantityInStock: '',
            ...record
        });
        setEditingKey(record.key);
    };

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const cancel = () => setEditingKey('');

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as IProductVariantCreate;
            const newData = [...dataSource];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setDataSource(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setDataSource(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const onFinish = (value: IProductVariantCreate[]) => {
        console.log('productVariants', JSON.stringify(value, null, 2));
        setProductVariants(value);
        form.submit();
    }

    const columns = [
        {title: 'Tên', dataIndex: 'productVariantName'},
        {title: 'Mã hàng (sku)', dataIndex: 'sku', width: '20%', editable: true},
        {title: 'Giá vốn', dataIndex: 'originalPrice', width: '15%', editable: true},
        {title: 'Giá bán', dataIndex: 'salePrice', width: '15%', editable: true},
        {title: 'Tồn kho', dataIndex: 'quantityInStock', width: '15%', editable: true},
        {
            title: '', dataIndex: 'operation', width: '10%',
            render: (_: any, record: IProductVariantCreate) => {
                const editable = isEditing(record);
                return editable ? (
                    <Row gutter={[8, 8]} justify="center" align="middle">
                        <Col>
                            <Tooltip placement="top" title="Lưu">
                                <CheckCircleTwoTone
                                    twoToneColor="#52C41A"
                                    onClick={() => save(record.key)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        border: "1px solid #52C41A",
                                        borderRadius: "5px",
                                    }}
                                />
                            </Tooltip>
                        </Col>
                        <Col>
                            <Tooltip placement="top" title="Đóng">
                                <CloseCircleFilled
                                    onClick={cancel}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        border: "1px solid",
                                        borderRadius: "5px",
                                    }}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                ) : (
                    <Row gutter={[8, 8]} justify="center" align="middle">
                        <Col>
                            <Tooltip placement="top" title={editingKey === '' ? "Sửa" : ""}>
                                <EditTwoTone
                                    twoToneColor={editingKey === '' ? "#f57800" : "#d9d9d9"}
                                    style={{
                                        cursor: editingKey === '' ? "pointer" : "not-allowed",
                                        padding: "5px",
                                        border: editingKey === '' ? "1px solid #f57800" : "1px solid #d9d9d9",
                                        borderRadius: "5px",
                                        opacity: editingKey === '' ? 1 : 0.5
                                    }}
                                    onClick={() => {
                                        if (editingKey === '') edit(record);
                                    }}
                                />
                            </Tooltip>
                        </Col>
                        <Col>
                            <Tooltip placement="top" title="Xóa">
                                <DeleteTwoTone
                                    twoToneColor="red"
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                        border: "1px solid red",
                                        borderRadius: "5px"
                                    }}
                                    onClick={() => handleDelete(record.key)}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                );
            },
        },
    ];

    const mergedColumns: TableProps<IProductVariantCreate>['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IProductVariantCreate) => ({
                record,
                inputType: ['originalPrice', 'salePrice', 'quantityInStock'].includes(col.dataIndex) ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <div>
            <Form form={form} onFinish={onFinish} component={false}>
                <Table<IProductVariantCreate>
                    components={{
                        body: {cell: EditableCell},
                    }}
                    bordered={false}
                    pagination={false}
                    dataSource={dataSource}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    scroll={{x: true}}
                />
            </Form>
        </div>
);
};
export default memo(CreateProductVariantTable);