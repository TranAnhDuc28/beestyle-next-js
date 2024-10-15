import React, { useState } from "react";
import { Button, Modal } from "antd";
import DetailCustomer from "./DetailCustomer";
import UpdateCustomer from "./UpdateCustomer";

interface CustomerModalProps {
  visible: boolean;
  onClose: () => void;
  customer: ICustomer | null;
  modalType: "detail" | "update";
}

const ModalCustomer = ({
  visible,
  onClose,
  customer,
  modalType,
}: CustomerModalProps) => {
  return (
    <>
      <Modal
        title={modalType == "detail" ? "Detail customer" : "Update customer"}
        visible={visible}
        onCancel={onClose}
        footer={modalType === "update" ? null : ""}
      >
        <div>
          {customer && modalType === "detail" && (
            <DetailCustomer param={customer} />
          )}
          {customer && modalType === "update" && (
            <UpdateCustomer param={customer} onClose={onClose} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalCustomer;
