import React from 'react';
import Modal, { ModalType } from './Modal';

import CancleModalForm from './CancleModalForm';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorMessage from '../common/ErrorMessage';

export interface CouponModalProps {
  modalOpen: boolean;
  modalClose: () => void;
  onCancleSubmit: (cancleReason: string[]) => void;
  orderId: number;
}

const CancleModal: React.FC<CouponModalProps> = ({ modalOpen, modalClose, onCancleSubmit, orderId }) => {
  return (
    <>
      <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title="취소 요청">
        <ErrorBoundary
          fallback={<ErrorMessage>에러가 발생했습니다. 다시 시도해주세요.</ErrorMessage>}
          onError={(error, componentStack) => {
            console.error('에러가 발생했습니다:', error, componentStack);
          }}
        >
          <CancleModalForm modalClose={modalClose} onCancleSubmit={onCancleSubmit} orderId={orderId} />
        </ErrorBoundary>
      </Modal>
    </>
  );
};

export default CancleModal;
