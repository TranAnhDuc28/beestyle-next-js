"use client";

import React, {memo, useState} from "react";
import {
    Checkbox,
    Col,
    Divider,
    Flex,
    type GetProp,
    Radio,
    RadioChangeEvent,
    Row,
    Select,
    Typography
} from "antd";
import {ParamFilterProduct} from "@/components/Admin/Product/hooks/useFilterProduct";
import SliderPriceProduct from "@/components/Slider/SliderPriceProduct";
import {GENDER_PRODUCT} from "@/constants/GenderProduct";
import useCategory from "@/components/Admin/Category/hooks/useCategory";
import useBrand from "@/components/Admin/Brand/hooks/useBrand";
import useMaterial from "@/components/Admin/Material/hooks/useMaterial";

const {Option} = Select;
const {Title} = Typography;

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

interface IProps {
    title?: string;
    filterParam: ParamFilterProduct;
    setFilterParam?: (value: ParamFilterProduct) => void;
}

const FilterProductUser: React.FC<IProps> = (props) => {
    const {filterParam, setFilterParam} = props;
    const [tempFilterParam, setTempFilterParam] = useState<ParamFilterProduct>(filterParam);

    const {dataCategory, error: errorDataTreeSelectCategory, isLoading: isLoadingDataTreeSelectCategory}
        = useCategory(true);
    const {dataBrand, error: errorDataOptionBrand, isLoading: isLoadingDataOptionBrand}
        = useBrand(true);
    const {dataMaterial, error: errorDataOptionMaterial, isLoading: isLoadingDataOptionMaterial}
        = useMaterial(true);

    // State cho mỗi nhóm checkbox
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
    const [checkedMaterials, setCheckedMaterials] = useState<string[]>([]);
    const [resetSliderRangePrice, setResetSliderRangePrice] = useState<boolean>(false);

    const [showMoreCategories, setShowMoreCategories] = useState(false);
    const [showMoreBrands, setShowMoreBrands] = useState(false);
    const [showMoreMaterials, setShowMoreMaterials] = useState(false);

    const onChangeGenderProductFilter = (e: RadioChangeEvent) => {
        const {value} = e.target;
        // console.log('GenderProductFilter', value)
        setTempFilterParam((prevValue) => ({...prevValue, gender: value ? value : undefined}));
    };

    const onChangeCategoryFilter: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any[]) => {
        // console.log('CategoryFilter', checkedValues)
        setCheckedCategories(checkedValues);
        if (checkedValues.length > 0 && checkedValues.length < dataCategory.length) {
            setTempFilterParam((prevValue) => {
                return {
                    ...prevValue,
                    category: checkedValues.toString()
                }
            });
        } else {
            setTempFilterParam((prevValue) => ({...prevValue, category: undefined}));
        }
    };

    const onChangeBrandFilter: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any[]) => {
        // console.log('BrandFilter', checkedValues)
        setCheckedBrands(checkedValues);
        if (checkedValues.length > 0 && checkedValues.length < dataBrand.length) {
            setTempFilterParam((prevValue) => {
                return {
                    ...prevValue,
                    brand: checkedValues.toString()
                }
            });
        } else {
            setTempFilterParam((prevValue) => ({...prevValue, brand: undefined}));
        }
    };

    const onChangeMaterialFilter: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: any[]) => {
        // console.log('MaterialFilter', checkedValues)
        setCheckedMaterials(checkedValues);
        if (checkedValues.length > 0 && checkedValues.length < dataMaterial.length) {
            setTempFilterParam((prevValue) => {
                return {
                    ...prevValue,
                    material: checkedValues.toString()
                }
            });
        } else {
            setTempFilterParam((prevValue) => ({...prevValue, material: undefined}));
        }
    };

    const handleRemoveAllCheckList = () => {
        // console.log('tempFilterParam', tempFilterParam)
        setResetSliderRangePrice(true);
        setCheckedCategories([]);
        setCheckedBrands([]);
        setCheckedMaterials([]);
        setTempFilterParam({
            page: 1,
            size: 20,
            category: undefined,
            gender: undefined,
            brand: undefined,
            material: undefined,
            minPrice: undefined,
            maxPrice: undefined,
        })
    }

    return (
        <>
            <Title level={3}>Bộ lọc</Title>
            <Divider/>

            {/* Lọc giới tính*/}
            <Title level={5} style={{marginBottom: 10}}>Giới tính</Title>
            <Radio.Group onChange={onChangeGenderProductFilter} value={tempFilterParam?.gender}>
                <Row gutter={[8, 8]}>
                    <Col key={"ALL"}>
                        <Radio value={undefined}>Tất cả</Radio>
                    </Col>
                    {Object.keys(GENDER_PRODUCT).map((key) => (
                        <Col key={key}>
                            <Radio value={key}>
                                {GENDER_PRODUCT[key as keyof typeof GENDER_PRODUCT]}
                            </Radio>
                        </Col>
                    ))}
                </Row>
            </Radio.Group>
            <Divider/>

            {/* Lọc danh mục */}
            <Title level={5} style={{marginBottom: 10}}>Danh mục</Title>
            <Checkbox.Group value={checkedCategories} onChange={onChangeCategoryFilter}>
                <Row gutter={[16, 16]}>
                    {dataCategory.slice(0, showMoreCategories ? dataCategory.length : 6).map((item: any) => (
                        <Col key={item.id}>
                            <Checkbox value={item.id}>
                                {item.categoryName}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
            <div
                style={{cursor: 'pointer', color: '#1890ff', marginTop: 10}}
                onClick={() => setShowMoreCategories(!showMoreCategories)}
            >
                {showMoreCategories ? 'Thu gọn' : 'Xem thêm'}
            </div>
            <Divider/>

            {/* Khoảng giá*/}
            <Title level={5} style={{marginBottom: 10}}>Khoảng giá</Title>
            <Flex style={{marginBottom: 10}}>
                <SliderPriceProduct
                    setTempFilterParam={setTempFilterParam}
                    reset={resetSliderRangePrice}
                    setReset={setResetSliderRangePrice}
                    style={{width: "85%"}}
                />
            </Flex>
            <Divider/>

            {/* Lọc thương hiệu */}
            <Title level={5} style={{marginBottom: 10}}>Thương hiệu</Title>
            <Checkbox.Group value={checkedBrands} onChange={onChangeBrandFilter}>
                <Row gutter={[16, 16]}>
                    {dataBrand?.slice(0, showMoreBrands ? dataBrand.length : 6).map((item: any) => (
                        <Col key={item.id}>
                            <Checkbox value={item.id}>
                                {item.brandName}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
            <div
                style={{cursor: 'pointer', color: '#1890ff', marginTop: 10}}
                onClick={() => setShowMoreBrands(!showMoreBrands)}
            >
                {showMoreBrands ? 'Thu gọn' : 'Xem thêm'}
            </div>
            <Divider/>

            {/* Lọc chất liệu */}
            <Title level={5} style={{marginBottom: 10}}>Chất liệu</Title>
            <Checkbox.Group value={checkedMaterials} onChange={onChangeMaterialFilter}>
                <Row gutter={[16, 16]}>
                    {dataMaterial.slice(0, showMoreMaterials ? dataMaterial.length : 6).map((item: any) => (
                        <Col key={item.id}>
                            <Checkbox value={item.id}>
                                {item.materialName}
                            </Checkbox>
                        </Col>
                    ))}
                </Row>
            </Checkbox.Group>
            <div
                style={{cursor: 'pointer', color: '#1890ff', marginTop: 10}}
                onClick={() => setShowMoreMaterials(!showMoreMaterials)}
            >
                {showMoreMaterials ? 'Thu gọn' : 'Xem thêm'}
            </div>
        </>
    );
};

export default memo(FilterProductUser);
