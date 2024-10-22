import React, { useState } from "react";
import { Button, Modal } from "antd";
import DetailCustomer from "./DetailCustomer";
import UpdateCustomer from "./UpdateCustomer";

interface CustomerModalProps {
  visible: boolean;
  onClose: () => void;
  customer: ICustomer | null;
  modalType: "detail" | "update";
  onMutate:any
}

const ModalCustomer = ({
  visible,
  onClose,
  customer,
  modalType,
  onMutate
}: CustomerModalProps) => {
  return (
    <>
      <Modal
        title={modalType == "detail" ? "Detail Customer" : "Update Customer"}
        style={{
          top:20
        }}
        visible={visible}
        onCancel={onClose}
        footer={modalType === "update" ? null : ""}
      >
        <div>
          {customer && modalType === "detail" && (
            <DetailCustomer param={customer} />
          )}
          {customer && modalType === "update" && (
            <UpdateCustomer param={customer} onClose={onClose} onMutate={onMutate} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalCustomer;
