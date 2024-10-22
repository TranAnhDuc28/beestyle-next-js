'use client';
import {App, Flex, Layout, TableColumnsType, Tag, Tooltip} from "antd";
import useSWR from "swr";
import {IBrand} from "@/types/IBrand";
import TablePagination from "@/components/Table/TablePagination";
import {getBrands} from "@/services/BrandService";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {URL_API_ORDER} from "@/services/OrderService";
import useAppNotifications from "@/hooks/useAppNotifications";
import HeaderOrder from "@/components/Admin/Order/HeaderOrder";
import OrderFilter from "@/components/Admin/Order/OrderFilter";

const {Content} = Layout;

const OrderComponent: React.FC = () => {
    const {showNotification} = useAppNotifications();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isCategoryDisplayOrderModalOpen, setIsCategoryDisplayOrderModalOpen] =
        useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<any>(null);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const {data, error, isLoading, mutate} =
        useSWR(
            `${URL_API_ORDER.get}${params.size !== 0 ? `?${params.toString()}` : ''}`,
            getBrands,
            {
                revalidateOnFocus: false,
            }
        );

    const columns: TableColumnsType<IBrand> = [
        {title: 'Khách hàng', dataIndex: 'customerName', key: 'customerName'},
        {title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber'},
        {title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount'},
        {title: 'Hình thức', dataIndex: 'paymentMethod', key: 'paymentMethod'},
        {title: 'Ngày tạo', dataIndex: 'createAt', key: 'createAt'},
        {
            title: 'Hành động', align: 'center', render: (record) => {
                return (
                    <>
                        {/*<Tooltip placement="top" title="Chỉnh sửa">*/}
                        {/*    <EditTwoTone*/}
                        {/*        twoToneColor={"#FAAD14"}*/}
                        {/*        style={{*/}
                        {/*            cursor: "pointer", padding: "5px", border: "1px solid #FAAD14", borderRadius: "5px",*/}
                        {/*            marginRight: 10*/}
                        {/*        }}*/}
                        {/*        onClick={() => {*/}
                        {/*            setIsUpdateModalOpen(true);*/}
                        {/*            setDataUpdate(record);*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Tooltip>*/}
                        {/*<Tooltip placement="top" title="Xóa">*/}
                        {/*    <DeleteTwoTone*/}
                        {/*        twoToneColor={"#FF4D4F"}*/}
                        {/*        style={{*/}
                        {/*            cursor: "pointer", padding: "5px", border: "1px solid #FF4D4F", borderRadius: "5px"*/}
                        {/*        }}*/}
                        {/*    />*/}
                        {/*</Tooltip>*/}
                    </>
                )
            }
        },
    ];

    useEffect(() => {
        if (error) {
            showNotification("error", {
                message: error?.message || "Error fetching brands", description: error?.response?.data?.message,
            });
        }
    }, [error]);

    let result: any;
    if (!isLoading && data) result = data?.data;

    return (
        <>
            <HeaderOrder
                setIsCreateModalOpen={setIsCreateModalOpen}
                setIsCategoryDisplayOrderModalOpen={setIsCategoryDisplayOrderModalOpen}
            />
            <Flex align={'flex-start'} justify={'flex-start'} gap={'middle'}>
                <OrderFilter error={error}/>
                <Content
                    className="min-w-0 bg-white"
                    style={{
                        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.15)',
                        flex: 1,
                        minWidth: 700,
                        borderRadius: '8px 8px 0px 0px'
                    }}
                >
                    <TablePagination
                        loading={isLoading}
                        columns={columns}
                        data={result?.items ? result.items : []}
                        current={result?.pageNo}
                        pageSize={result?.pageSize}
                        total={result?.totalElements}
                    >
                    </TablePagination>
                </Content>
            </Flex>
        </>
    )
}

export default OrderComponent;