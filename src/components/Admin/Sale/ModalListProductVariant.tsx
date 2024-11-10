import React, {memo} from "react";
import {Modal, Typography} from "antd";

const {Title} = Typography;

interface IProps {
    productName?: string;
    isOpenModalListProductVariant?: boolean;
    setOpenModalListProductVariant: (value: boolean) => void;
}

const ModalListProductVariant: React.FC<IProps> = (props) => {
    const {productName, isOpenModalListProductVariant, setOpenModalListProductVariant} = props;
    return (
        <Modal
            title={productName ?? "Sản phẩm"}
            maskClosable
            style={{top: 100}}
            open={isOpenModalListProductVariant}
            onOk={() => setOpenModalListProductVariant(false)}
            onCancel={() => setOpenModalListProductVariant(false)}
            width={1000}
        >
            <Title>some contents...</Title>
        </Modal>
    )
}
export default memo(ModalListProductVariant);