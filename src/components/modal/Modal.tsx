import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Text } from '../common';
import { PopupWrapperStyle, PopupContentStyle } from '../../styles/popupStyle';
import ExitBtn from '../../assets/Icons/ExitBtn.svg';
const ModalWrapper = styled.div<{ type: ModalType }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(28, 28, 30, 0.76);
  z-index: 999;
  ${(props) => props.type === ModalType.POPUP && PopupWrapperStyle}
`;

const ModalContent = styled.div<{ type: ModalType }>`
  background-color: ${(props) => props.theme.color.black};
  ${(props) => props.type === ModalType.POPUP && PopupContentStyle}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export enum ModalType {
  POPUP = 'popup',
  TAB = 'tab',
}

interface ModalProps {
  type: ModalType;
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ type, isModalOpen, onClose, children, title }) => {
  if (!isModalOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalWrapper type={type} onClick={onClose}>
      <ModalContent type={type} onClick={(e) => e.stopPropagation()}>
        {type === ModalType.POPUP && (
          <ModalTitle>
            <Text $fontType="H0" color="white">
              {title}
            </Text>
            <CloseButton onClick={onClose}>
              <img src={ExitBtn} />
            </CloseButton>
          </ModalTitle>
        )}
        {children}
      </ModalContent>
    </ModalWrapper>,
    document.getElementById('modal-root') as Element,
  );
};

export default Modal;
