import React, {memo, useContext, useEffect, useRef, useState} from 'react';
import {GetRef, InputRef, TableProps, Tooltip} from 'antd';
import {Button, Form, Input, Popconfirm, Table} from 'antd';
import {DeleteTwoTone} from "@ant-design/icons";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = (
    {
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
                rules={[{required: true, message: `${title} is required.`}]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{paddingInlineEnd: 24}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    key: React.Key;
    productVariantName: string;
    sku?: string;
    originalPrice?: number,
    salePrice?: number,
    quantityInStock?: number,
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

const TableEditRows: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([
        {key: '1', productVariantName: 'Edward King 0', sku: 'London, Park Lane no. 0', originalPrice: 1000, salePrice: 1200, quantityInStock: 10},
        {key: '2', productVariantName: 'Edward King 1', sku: 'London, Park Lane no. 1', originalPrice: 1000, salePrice: 1200, quantityInStock: 10},
    ]);

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {title: 'Tên', dataIndex: 'productVariantName'},
        {title: 'Mã hàng', dataIndex: 'sku', editable: true},
        {title: 'Giá vốn', dataIndex: 'originalPrice', editable: true},
        {title: 'Giá bán', dataIndex: 'salePrice', editable: true},
        {title: 'Tồn kho', dataIndex: 'quantityInStock', editable: true},
        {
            title: '', dataIndex: 'operation', align: 'end',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Tooltip placement="top" title="Xóa sản phẩm">
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
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            productVariantName: `Edward King ${count}`,
            sku: `London, Park Lane no. ${count}`,
            originalPrice: 1000,
            salePrice: 1200,
            quantityInStock: 10,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{marginBottom: 16}}>
                Add a row
            </Button>
            <Table<DataType>
                size="small"
                bordered={false}
                pagination={false}
                components={components}
                rowClassName={() => 'editable-row'}
                dataSource={dataSource}
                columns={columns as ColumnTypes}
                scroll={{x: true}}
            />
        </div>
    );
};
export default memo(TableEditRows);