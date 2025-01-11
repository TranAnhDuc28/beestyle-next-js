import React, { useEffect } from 'react';
import { Button, Table } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import { getProductSalesByUser, URL_API_CUSTOMER } from '@/services/CustomerService';
import useSWR from 'swr';
import useAppNotifications from '@/hooks/useAppNotifications';

interface IProps {
    idCustomer: any;
  }
const PurchasedProduct = (props:IProps) => {
    const { idCustomer } = props;
    const { showNotification } = useAppNotifications();
    
    const { data, error, mutate } = useSWR(
        `${URL_API_CUSTOMER.productSalesByUserMapping}/${idCustomer}`,
        getProductSalesByUser,
        {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }
      );

      const result = data?.data?.items?.map((item: any, index: number) => ({
        ...item,
        key:  index + 1, // Đảm bảo mỗi mục có key duy nhất
    })) || [];
       useEffect(() => {
         if (error) {
           showNotification("error", {
             message: error?.message,
             description:
               error?.response?.data?.message || "Error fetching addresses",
           });
         }
       }, [error]);
    //    console.log(result);
       
      

    const columns:any = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
            render: (text:any, record:any) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={record.imageProduct ||`https://via.placeholder.com/50x50?text=${text.substring(0, 2)}`}
                        alt={text}
                        style={{ width: 70, height: 70, marginRight: 10 }}
                    />
                    <span>{text}</span>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
            width: 100,
        },
        {
            title: 'Giá bán',
            dataIndex: 'salePrice',
            key: 'salePrice',
            align: 'right',
            width: 150,
            render: (text:any) => `${text.toLocaleString()} đ`,
        },
        // {
        //     title: 'Phí thanh toán',
        //     dataIndex: 'paymentFee',
        //     key: 'paymentFee',
        //     align: 'right',
        //     width: 150,
        //     render: (text:any) => `${text.toLocaleString()} đ`,
        // },
        {
            title: '',
            key: 'action',
            align: 'center',
            width: 100,
            render: (_, record:any) => (
                <Button
                    type="default"
                    // onClick={() => handleView(record)}
                    icon={<EyeOutlined />}
                    className="!border-none !text-white !bg-purple-500 hover:!bg-purple-600"
                >
                </Button>
            ),
        },
    ];

    return (
        <>
            {result && result.length > 0 ? (
                <div>
                    <Title level={4} className="font-semibold mt-5">Sản phẩm đã mua</Title>
                    <Table
                        dataSource={result}
                        columns={columns}
                        pagination={{
                            pageSize: 5,
                        }}
                        bordered
                    />
                </div>
            ) : (
                <div
                    className='mt-5'
                    style={{ border: '8px solid #D9EDF7' }}
                >
                    <span className='block p-2'>Bạn chưa đặt mua sản phẩm.</span>
                </div>
            )}
        </>
    );
};

export default PurchasedProduct;
