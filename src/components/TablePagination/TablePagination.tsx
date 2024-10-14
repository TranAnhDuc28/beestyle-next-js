"use client"
import {Table, TableColumnsType, TableProps} from "antd";
import React from "react";
import "./TablePagination.css";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export interface ITablePaginationProps {
    columns?: TableColumnsType<any>,
    data?: any[] | [],
    current?: number,
    pageSize?: number,
    total?: number,
    loading?: boolean
}


// rowSelection object indicates the need for row selection
const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

const TablePagination: React.FC<ITablePaginationProps> = (props) => {
    const tbl: ITablePaginationProps = props;

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter()

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        // Kiểm tra xem đối tượng pagination có tồn tại và có thuộc tính current không
        if (pagination?.current) { // nếu có
            const params = new URLSearchParams(searchParams);  // Tạo một đối tượng URLSearchParams từ các tham số tìm kiếm hiện tại
            params.set("page", pagination.current); // Thay thế URL hiện tại bằng URL mới với các tham số đã cập nhật
            params.set("size", pagination.pageSize);
            // console.log("pagination", pagination);
            replace(`${pathname}?${params.toString()}`); // Thay thế URL hiện tại bằng URL mới với các tham số đã cập nhật
        }
    };


    return (
        <>
            <div>
                <Table
                    loading={tbl.loading}
                    rowKey={"id"}
                    columns={tbl.columns}
                    dataSource={tbl.data}
                    onChange={onChange}
                    rowSelection={rowSelection}
                    pagination={{
                        current: tbl.current || 1,
                        pageSize: tbl.pageSize || 10,
                        total: tbl.total,
                        showSizeChanger: true,
                        pageSizeOptions: [10, 25, 35, 50],
                        responsive: true,
                        style: {marginRight: 10},
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{x: true, y: 'calc(100vh - 270px)'}}
                />
            </div>
        </>
    );
}

export default TablePagination;