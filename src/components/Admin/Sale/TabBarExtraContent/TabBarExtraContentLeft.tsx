"use client"
import React, {memo, useCallback, useEffect, useMemo, useState} from "react";
import {AutoComplete, AutoCompleteProps, Avatar, Empty, Flex, Modal, Skeleton, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useDebounce} from "use-debounce";
import useSearchProduct from "@/components/Admin/Product/hooks/useSearchProduct";
import {IProduct} from "@/types/IProduct";
import ModalListProductVariant from "@/components/Admin/Sale/ModalListProductVariant";

const {Text, Title} = Typography;

const transformOptions = (data: IProduct[]) => {
    return data.map((product: IProduct) => ({
        value: product.id.toString(),
        label: (
            <Flex align="center">
                <Avatar src="/BuiQuangLan.png" shape="square"  style={{borderRadius: 5, width: 70, height: 70}}/>
                <Flex align="start" justify="space-between" style={{padding: '10px 0px', width: "100%"}}>
                    <div className="ml-5">
                        <Text strong>{product.productName}</Text> <br/>
                        <Text type="secondary">Mã: {product.productCode}</Text> <br/>
                        <Text type="secondary">Tổng số: {product.totalProductInStock ?? 0}</Text> <br/>
                    </div>
                    <Title level={5}>{product.minSalePrice}</Title>
                </Flex>
            </Flex>
        ),
        product: product
    }));
}


const TabBarExtraContentLeft: React.FC = () => {
    const [isOpenModalListProductVariant, setOpenModalListProductVariant] = useState(false);
    const [productSelected, setProductSelected] = useState<IProduct | undefined>(undefined);
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debounceSearchValue] = useDebounce(searchTerm, 500);

    const {dataOptionSearchProduct, isLoading} = useSearchProduct(debounceSearchValue);

    const handleSearch = useCallback((value: string) => {
        setSearchTerm(value);
        if (value?.trim().length === 0) setOptions([]);
    }, []);

    const handleSelect = useCallback((value: string) => {
        const selectedProduct = dataOptionSearchProduct?.find((product: any) => product.id.toString() === value);
        if (selectedProduct) {
            setProductSelected(selectedProduct);
            setOpenModalListProductVariant(true)
        }
        setSearchTerm("");
        setOptions([]);
    }, [dataOptionSearchProduct]);

    const transformedOptions = useMemo(() => transformOptions(dataOptionSearchProduct), [dataOptionSearchProduct]);

    useEffect(() => {
        // kiểm tra 2 mảng có giống nhau không
        if (transformedOptions?.length !== options?.length) {
            setOptions(transformedOptions);
            return;
        }

        const optionsChanged = transformedOptions.some((newOption, index) => {
            return newOption.value !== options?.[index]?.value;
        });
        if (optionsChanged) setOptions(transformedOptions);

    }, [debounceSearchValue, dataOptionSearchProduct]);

    return (
        <>

            <Title level={4} style={{display: "inline", margin: "0px 20px"}}>Bán hàng</Title>
            <AutoComplete
                allowClear
                onClear={() => setOptions([])}
                placeholder="Tm kiếm sản phẩm"
                suffixIcon={<SearchOutlined/>}
                options={options}
                onSearch={handleSearch}
                onSelect={handleSelect}
                value={searchTerm}
                style={{width: 500, marginRight: 20}}
                notFoundContent={
                    isLoading ? <Skeleton/> : (searchTerm && options?.length === 0) ?
                        <Empty description="Không có kết quả tìm kiếm"/> : null
                }
            />
            <ModalListProductVariant
                product={productSelected}
                isOpenModalListProductVariant={isOpenModalListProductVariant}
                setOpenModalListProductVariant={setOpenModalListProductVariant}
            />
        </>
    )
}
export default memo(TabBarExtraContentLeft);