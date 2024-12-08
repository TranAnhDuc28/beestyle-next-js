"use client";
import ProductCard from "./ProductCard";
import FilterProductUser from "@/components/User/ShopGrid/FilterProductUser";
import {Col, Flex, Pagination, PaginationProps, Row, Spin, Typography} from "antd";
import HeaderShopGrid from "@/components/User/ShopGrid/HeaderShopGrid";
import useFilterProduct, {ParamFilterProduct} from "@/components/Admin/Product/hooks/useFilterProduct";
import React, {useEffect, useState} from "react";
import SubLoader from "@/components/Loader/SubLoader";
import {useDebounce} from "use-debounce";

const {Text} = Typography;

export const defaultFilterParam: ParamFilterProduct = {
    page: 1,
    size: 20,
    category: undefined,
    gender: undefined,
    brand: undefined,
    material: undefined,
    minPrice: undefined,
    maxPrice: undefined,
};

const UserProductComponent: React.FC = () => {
    const [filterParam, setFilterParam] = useState<ParamFilterProduct>({...defaultFilterParam});
    const [debounceFilterParam] = useDebounce(filterParam, 500);
    const {dataFilterProduct, isLoading} = useFilterProduct(debounceFilterParam);

    const onChange: PaginationProps['onChange'] = (page, pageSize) => {
        setFilterParam((prevValue) => ({...prevValue, page: page, size: pageSize}));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [filterParam.page]);

    return (
        <Flex justify="center" className="section">
            <div className="w-4/5">
                <Row gutter={[24, 24]}>
                    <Col span={5}>
                        <FilterProductUser filterParam={filterParam}/>
                    </Col>
                    <Col span={19}>
                        <Row gutter={[8, 8]}>
                            <Col span={24}>
                                <HeaderShopGrid/>
                            </Col>
                            <Col span={24}>
                                <Row gutter={[16, 16]}>
                                    {
                                        isLoading ? (
                                            <SubLoader size="small" spinning={isLoading}/>
                                        ) : (
                                            dataFilterProduct?.items?.length > 0 ? (
                                                dataFilterProduct?.items.map((product: any) => (
                                                        <Col span={6} key={product.id}  >
                                                            <ProductCard product={product}/>
                                                        </Col>
                                                    )
                                                )
                                            ) : (
                                                <Text>Chưa có sản phẩm nào trong danh mục này.</Text>
                                            )
                                        )
                                    }
                                </Row>
                                    <Flex justify="center" className="mt-5 mb-5">
                                        <Pagination
                                            current={filterParam.page ?? 1}
                                            onChange={onChange}
                                            showSizeChanger={false}
                                            defaultPageSize={filterParam.size ?? 20}
                                            total={dataFilterProduct?.totalElements}
                                        />
                                    </Flex>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Flex>
    );
};

export default UserProductComponent;
