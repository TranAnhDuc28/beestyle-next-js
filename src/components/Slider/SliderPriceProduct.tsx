import React, {CSSProperties, memo, useCallback, useEffect, useState} from "react";
import {ParamFilterProduct} from "@/components/Admin/Product/hooks/useFilterProduct";
import {FORMAT_NUMBER_WITH_COMMAS} from "@/constants/AppConstants";
import {Slider} from "antd";

const defaultRangePrice = {
    minPrice: 0,
    maxPrice: 3000000
}

interface IProps {
    setTempFilterParam: React.Dispatch<React.SetStateAction<ParamFilterProduct>>;
    reset: boolean;
    setReset: React.Dispatch<React.SetStateAction<boolean>>;
    style: CSSProperties;
}

const SliderPriceProduct: React.FC<IProps> = (props) => {
    const {setTempFilterParam, reset, setReset,style} = props;
    const [rangePrice, setRangePrice] = useState(defaultRangePrice);

    const onChangeRangePrice = useCallback((value: number[]) => {
        // console.log('onChange: ', value);
        setRangePrice({minPrice: value[0], maxPrice: value[1]});
    }, []);

    const onChangeCompleteRangePrice = useCallback((value: number[]) => {
        console.log('onChangeComplete: ', value);
        setTempFilterParam((prevValue) => {
            return {
                ...prevValue,
                minPrice: value[0],
                maxPrice: value[1]
            }
        });
    }, []);

    useEffect(() => {
        if (reset) {
            setRangePrice(defaultRangePrice);
            setReset(false);
        }
    }, [reset]);

    return (
        <Slider
            range
            style={style}
            value={[rangePrice.minPrice, rangePrice.maxPrice]}
            marks={{
                [defaultRangePrice.minPrice]: `${defaultRangePrice.minPrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',').concat('đ'),
                [defaultRangePrice.maxPrice]: `${defaultRangePrice.maxPrice}`.replace(FORMAT_NUMBER_WITH_COMMAS, ',').concat('đ')
            }}
            step={1000}
            min={defaultRangePrice.minPrice}
            max={defaultRangePrice.maxPrice}
            tooltip={{
                formatter: (value: number | undefined) => (
                    <span>{value?.toString().replace(FORMAT_NUMBER_WITH_COMMAS, ',')}đ</span>
                )
            }}
            onChange={onChangeRangePrice}
            onChangeComplete={onChangeCompleteRangePrice}
        />
    );
}
export default memo(SliderPriceProduct);