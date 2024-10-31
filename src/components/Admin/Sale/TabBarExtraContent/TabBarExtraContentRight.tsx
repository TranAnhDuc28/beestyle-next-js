"use client"
import React, {memo, useState} from "react";
import {AutoComplete, AutoCompleteProps, Button} from "antd";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import CheckoutComponent from "@/components/Admin/Sale/CheckoutComponent";


const TabBarExtraContentRight: React.FC = () => {
    return (
        <>
            <div style={{width: 400, margin: "0px 20px 0px 10px"}}>
                <Button>Right Extra Action</Button>
            </div>
        </>
    )
};
export default memo(TabBarExtraContentRight);