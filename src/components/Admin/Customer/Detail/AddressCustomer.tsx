import { IAddress } from '@/types/IAddress';
import { EditTwoTone } from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Table } from 'antd/lib';
import React from 'react'

const {Title} = Typography;

interface IProps{
    addresses: any[] | [];
}
const AddressCustomer = (props:IProps) => {
    const {addresses} = props;
    console.log(addresses);
    
    const columns: ColumnType<IAddress>[] = [
        {
            title: "",
            render: (text: any, record: IAddress, index: number) => (
              <div className="flex gap-3">
                <Tooltip placement="top" title="Cập nhật">
                  <EditTwoTone
                    twoToneColor={"#f57800"}
                    style={{
                      cursor: "pointer",
                      padding: "5px",
                      border: "1px solid #f57800",
                      borderRadius: "5px",
                    }}
                   
                  />
                </Tooltip>
              </div>
            ),
          },
        { title: "Địa chỉ", dataIndex: "addressName", key: "addressName" }
    ]
  return (
    <div>
        <Title level={3}>Địa chỉ</Title>
        <Table dataSource={addresses} columns={columns} pagination={false}/>
    </div>
  )
}

export default AddressCustomer