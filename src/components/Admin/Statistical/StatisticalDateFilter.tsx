import React, { useState, useCallback } from 'react';
import { Radio, DatePicker } from 'antd';
import { Moment } from 'moment';
import Title from 'antd/es/typography/Title';
import locale from 'antd/es/date-picker/locale/vi_VN';

const { RangePicker } = DatePicker;

interface DateFilterProps {
    onFilterChange: (
        value: string | { from: string; to: string } | null,
        type: 'day' | 'month' | 'year' | 'range'
    ) => void;
}

const StatisticalDateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
    const [filterType, setFilterType] = useState<'day' | 'month' | 'year' | 'range'>('day');
    const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
    const [selectedRange, setSelectedRange] = useState<[Moment, Moment] | null>(null);

    const handleFilterTypeChange = useCallback(
        (e: React.ChangeEvent<{ value: 'day' | 'month' | 'year' | 'range' }>) => {
            const newFilterType = e.target.value;
            setFilterType(newFilterType);
            setSelectedDate(null);
            setSelectedRange(null);
            onFilterChange(null, newFilterType);
        },
        [onFilterChange]
    );

    const handleDateChange = useCallback(
        (date: Moment | null, dateString: string) => {
            setSelectedDate(date);
            onFilterChange(date ? date.format('YYYY-MM-DD') : null, 'day');
        },
        [onFilterChange]
    );

    const handleMonthChange = useCallback(
        (date: Moment | null, dateString: string) => {
            setSelectedDate(date);
            onFilterChange(date ? date.format('YYYY-MM') : null, 'month');
        },
        [onFilterChange]
    );

    const handleYearChange = useCallback(
        (date: Moment | null, dateString: string) => {
            setSelectedDate(date);
            onFilterChange(date ? date.format('YYYY') : null, 'year');
        },
        [onFilterChange]
    );

    const handleRangeChange = useCallback(
        (dates: [Moment, Moment] | null, dateStrings: [string, string]) => {
            setSelectedRange(dates);
            onFilterChange(
                dates
                    ? { from: dates[0].format('YYYY-MM-DD'), to: dates[1].format('YYYY-MM-DD') }
                    : null,
                'range'
            );
        },
        [onFilterChange]
    );

    return (
        <div className="w-[397px] bg-white rounded-lg p-3 mt-4">
            <Title level={4}>Bộ lọc</Title>
            <div className='mt-3'>
                <Radio.Group onChange={handleFilterTypeChange} value={filterType}>
                    <Radio value="day">Ngày</Radio>
                    <Radio value="month">Tháng</Radio>
                    <Radio value="year">Năm</Radio>
                    <Radio value="range">Khoảng thời gian</Radio>
                </Radio.Group>
            </div>

            <div className='text-center mt-4'>
                {filterType === 'day' && (
                    <DatePicker onChange={handleDateChange} value={selectedDate} placeholder="Chọn ngày" />
                )}

                {filterType === 'month' && (
                    <DatePicker
                        picker="month"
                        onChange={handleMonthChange}
                        value={selectedDate}
                        placeholder="Chọn tháng"
                    />
                )}

                {filterType === 'year' && (
                    <DatePicker
                        picker="year"
                        onChange={handleYearChange}
                        value={selectedDate}
                        placeholder="Chọn năm"
                    />
                )}

                {filterType === 'range' && (
                    <RangePicker
                        onChange={handleRangeChange}
                        value={selectedRange}
                        locale={locale}
                    />
                )}
            </div>
        </div>
    );
};

export default StatisticalDateFilter;
