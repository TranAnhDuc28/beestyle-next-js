'use client';

import React, {useState} from 'react';
import {Slider, Input, Checkbox} from 'antd';

const ShopByPrice = () => {
    const [rangeValue, setRangeValue] = useState([100000, 500000]);
    const [checkedValues, setCheckedValues] = useState([]);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setCheckedValues((prevCheckedValues) =>
            prevCheckedValues.includes(value)
                ? prevCheckedValues.filter((item) => item !== value)
                : [...prevCheckedValues, value]
        );
    };

    const handleSliderChange = (value) => {
        setRangeValue(value);
    };

    const handleInputChange = (e) => {
        const [min, max] = e.target.value
            .replace('$', '')
            .split(' - ')
            .map((v) => parseInt(v, 10));
        if (!isNaN(min) && !isNaN(max)) {
            setRangeValue([min, max]);
        }
    };

    return (
        <div className="single-widget range">
            <h3 className="title">Khoảng giá</h3>
            <div className="price-filter">
                <div className="price-filter-inner">
                    <Slider
                        range
                        min={100000}
                        max={2500000}
                        defaultValue={[100000, 500000]}
                        value={rangeValue}
                        allowCross={false}
                        onChange={handleSliderChange}
                    />
                    <div className="price_slider_amount" style={{marginTop: 16}}>
                        <div className="label-input">
                            <span>Range:</span>
                            <Input
                                value={`${rangeValue[0]} VND - ${rangeValue[1]} VND`}
                                onChange={handleInputChange}
                                placeholder="Add Your Price"
                                variant={"borderless"}
                                style={{width: 250, marginLeft: 8, marginTop: 5}}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ul className="check-box-list" style={{padding: 0, listStyle: 'none'}}>
                {['100.000-500.000', '500.000-1.000.000', '1.000.000-2.500.000'].map((range) => (
                    <li key={range}>
                        <label className="d-flex">
                            <div className="mr-1 mb-2">
                                <Checkbox
                                    value={range}
                                    checked={checkedValues.includes(range)}
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                            <div style={{fontSize: 12}}>
                                {range.replace('-', ' VND - ').concat(' VND')} <span
                                className="count">({range === '100000-500000' ? 3 : range === '500000-1000000' ? 5 : 8})</span>
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShopByPrice;