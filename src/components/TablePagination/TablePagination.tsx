import {Flex, Pagination, Space, Table, TableColumnsType, TableProps} from "antd";
import React, {useState} from "react";
import "./TablePagination.css";

interface TablePaginationProps {
    columns: TableColumnsType<any>;
    data: any[];
    total: number;
    onPageChange: (page: number, pageSize: number) => void;
}


// rowSelection object indicates the need for row selection
const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

const TablePagination: React.FC<TablePaginationProps> = (
    {columns, data, total, onPageChange}
) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        onPageChange(page, pageSize); // Gọi hàm onPageChange từ props
    };

    return (
        <>
            <div>
                <Table
                    style={{borderRadius: 0}}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{x: true, y: 'calc(100vh - 270px)'}}
                />
            </div>
            <Flex justify={"flex-end"}>
                <Pagination
                    style={{
                        margin: '20px 10px 10px 10px'
                    }}
                    total={total}
                    showTotal={(total) => `Total ${total} items`}
                    defaultPageSize={pageSize}
                    defaultCurrent={currentPage}
                    onChange={handlePageChange}
                    showSizeChanger
                    pageSizeOptions={[10, 25, 35, 50]}
                />
            </Flex>
        </>
    );
}

export default TablePagination;