import React, { useState, useRef, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import Modal, { ModalType } from './Modal';
import CancleModalForm from './CancleModalForm';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '../../pages/ErrorPage';

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
          fallback={
            <ErrorPage
              errorTitle="연결 오류"
              errorMessage="오류가 발생했습니다. 다시 시도해 주십시오."
              isPrevious={false}
            />
          }
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
