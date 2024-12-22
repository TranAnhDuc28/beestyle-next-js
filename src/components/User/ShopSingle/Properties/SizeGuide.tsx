import { Modal, Tabs, Table } from "antd";

const SizeGuide = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const { TabPane } = Tabs;

    const columns = [
        {
            title: "Kích thước",
            dataIndex: "size",
            key: "size",
            align: "center",
            className: "font-bold",
        },
        {
            title: "S",
            dataIndex: "s",
            key: "s",
            align: "center",
        },
        {
            title: "M",
            dataIndex: "m",
            key: "m",
            align: "center",
        },
        {
            title: "L",
            dataIndex: "l",
            key: "l",
            align: "center",
        },
        {
            title: "XL",
            dataIndex: "xl",
            key: "xl",
            align: "center",
        },
        {
            title: "2XL",
            dataIndex: "xxl",
            key: "xxl",
            align: "center",
        },
        {
            title: "3XL",
            dataIndex: "xxxl",
            key: "xxxl",
            align: "center",
        },
        {
            title: "4XL",
            dataIndex: "xxxxl",
            key: "xxxxl",
            align: "center",
        },
        {
            title: "5XL",
            dataIndex: "xxxxxl",
            key: "xxxxxl",
            align: "center",
        },
    ];

    const dataSource = [
        {
            key: "1",
            size: "Chiều cao (cm)",
            s: "160-165",
            m: "160-165",
            l: "166-172",
            xl: "172-177",
            xxl: "177-184",
            xxxl: "184-192",
            xxxxl: "184-192",
            xxxxxl: "184-192",
        },
        {
            key: "2",
            size: "Cân nặng (kg)",
            s: "50-54",
            m: "55-61",
            l: "62-68",
            xl: "69-75",
            xxl: "76-84",
            xxxl: "85-90",
            xxxxl: "90-94",
            xxxxxl: "94-98",
        },
        {
            key: "3",
            size: "Rộng vai (cm)",
            s: "41",
            m: "42",
            l: "43.5",
            xl: "45",
            xxl: "46.5",
            xxxl: "48",
            xxxxl: "49",
            xxxxxl: "50",
        },
        {
            key: "4",
            size: "Vòng ngực (cm)",
            s: "82-86",
            m: "86-90",
            l: "90-94",
            xl: "94-98",
            xxl: "98-102",
            xxxl: "102-106",
            xxxxl: "106-110",
            xxxxxl: "110-114",
        },
    ];

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            centered
            className="size-modal"
            width={900}
        >
            <h2 className="text-lg font-bold mb-4">Bảng kích thước</h2>
            <Tabs defaultActiveKey="1" className="mt-4 text-center">
                <TabPane tab="Nam" key="1">
                    <h3 className="font-semibold mb-4">Áo Nam</h3>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered
                        className="ant-table-custom"
                    />
                </TabPane>
                <TabPane tab="Nữ" key="2">
                    <h3 className="font-semibold mb-4">Áo Nữ</h3>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered
                        className="ant-table-custom"
                    />
                </TabPane>
                <TabPane tab="Trẻ em" key="3">
                    <h3 className="font-semibold mb-4">Áo Trẻ em</h3>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered
                        className="ant-table-custom"
                    />
                </TabPane>
            </Tabs>
        </Modal>
    );
};

export default SizeGuide;
