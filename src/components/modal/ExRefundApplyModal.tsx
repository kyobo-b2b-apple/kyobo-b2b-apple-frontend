import Modal, { ModalType } from './Modal';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ItemsContent } from '../common/CheckDropDown';
import { FormProvider, useForm } from 'react-hook-form';
import ExRefunApplyInput from './ExRefundApplyInput';
import ExRefundApplyBtn from './ExRefundApplyBtn';

interface ExRefundProps {
  setForm: (input: string[]) => void;
  modalOpen: boolean;
  inputString: string[];
  modalClose: () => void;
  menuItems: ItemsContent[];
}

enum ClaimStatus {
  EXCHANGE = '교환',
  REFUND = '환불',
}

interface Item {
  id: number;
}

type FormValues = {
  items: Item[];
  detailReason: string;
  refundType: string;
};

const ExRefundApplyModal: React.FC<ExRefundProps> = ({ menuItems, modalOpen, modalClose, inputString }) => {
  const methods = useForm<FormValues>({
    defaultValues: { items: [], detailReason: '', refundType: ClaimStatus.EXCHANGE },
  });

  return (
    <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="교환/반품 신청">
      <InputContainer>
        <FormProvider {...methods}>
          <ExRefunApplyInput inputString={inputString} menuItems={menuItems} />
          <ExRefundApplyBtn onClick={modalClose} />
        </FormProvider>
      </InputContainer>
    </Modal>
  );
};

export default ExRefundApplyModal;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-bottom: 98px;
`;
