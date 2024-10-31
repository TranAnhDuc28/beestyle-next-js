import React, {CSSProperties, memo, useState} from "react";
import {ClockCircleOutlined, PhoneOutlined} from "@ant-design/icons";
import DeliverySaleTab from "@/components/Admin/Sale/TabSale/DeliverySaleTab";
import NormalSaleTab from "@/components/Admin/Sale/TabSale/NormalSaleTab";
import {Tabs} from "antd";


interface IProps {

}

const ContentTabPanelSale: React.FC<IProps> = (props) => {
    const {} = props;

    const itemsTabSale = [
        {
            key: "ban-thuong",
            label: (
                <span style={{margin: '0px 20px'}}>
                <ClockCircleOutlined style={{marginInlineEnd: 10}}/>
                Bán thường
            </span>
            ),
            children: (<NormalSaleTab/>)

        },
        {
            key: "ban-giao-hang",
            label: (
                <span style={{margin: '0px 20px'}}>
                <PhoneOutlined style={{marginInlineEnd: 10}}/>
                Bán giao hàng
            </span>
            ),
            children: (
                <DeliverySaleTab/>
            ),
        }
    ];

    return (
        <>
            <Tabs
                tabPosition="bottom"
                tabBarGutter={0}
                items={itemsTabSale}
            />

        </>
    );
}
export default memo(ContentTabPanelSale);