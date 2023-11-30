import React, { useState, useEffect } from 'react';
import Modal, { ModalType } from './Modal';
import Text from '../common/Text';
import Image from '../image/Image';
import CommonButton, { ButtonType } from '../common/Button';
import Counter from '../common/Counter';
import CardWithCounter from '../CardWithCounter';

import { PayModalProps } from './PayModal';
import { parseOption } from '../../utils/extractOptions';

import macimg from '../../assets/img/img_paythumb_desktop.png';
import { styled } from 'styled-components';
import { Spacer } from '../common';
import { formatNumber } from '../../utils/formatNumber';
import { updateCartItem } from '../../api/cartApi';

interface Product {
  id: number;
  thumbnails: string[];
  smallCategory: string;
  description: string;
  price: number;
  acpOption?: string;
  accOption1?: string;
  accOption2?: string;
  accOption3?: string;
  accOption4?: string;
}


export interface EditOrderModalProps {
  modalOpen: boolean;
  modalClose: () => void;
  selectedProduct: Product | null;
  updateSelectedProduct: (product: Product | null) => void;
}


const EditOrderModal: React.FC<EditOrderModalProps> = ({ modalOpen, modalClose, selectedProduct, updateSelectedProduct }) => {

  const [editOrderModalCount, setEditOrderModalCount] = useState(0);

  const handleCounterChange = (newCount: number) => {
    setEditOrderModalCount(newCount);
  };

  const [localProduct, setLocalProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      console.log(selectedProduct);
      setLocalProduct(selectedProduct);
      setEditOrderModalCount(1 || 0);
    }
  }, [selectedProduct]);

  const handleOptionRemove = (optionToRemove) => {

    setLocalProduct((prev) => {
      if (prev === null) {
        return null;
      }

      const updatedProduct = {
        ...prev,
        accOption1: prev.accOption1 === optionToRemove ? undefined : prev.accOption1,
        accOption2: prev.accOption2 === optionToRemove ? undefined : prev.accOption2,
        accOption3: prev.accOption3 === optionToRemove ? undefined : prev.accOption3,
        accOption4: prev.accOption4 === optionToRemove ? undefined : prev.accOption4,
      };


      return updatedProduct;
    });
  };

  const handleConfirmClick = async () => {
    if (localProduct) {
      await updateCartItem({
        ...localProduct,
        quantity: editOrderModalCount,
        acpEmail: 'email@example.com',
        acpName: 'example name',
        acpOptionQuantity: localProduct.acpOption ? editOrderModalCount : 0,
        accOption1Quantity: localProduct.accOption1 ? editOrderModalCount : 0,
        accOptions2Qunatity: localProduct.accOption2 ? editOrderModalCount : 0,
        accOptions3Qunatity: localProduct.accOption3 ? editOrderModalCount : 0,
        accOptions4Qunatity: localProduct.accOption4 ? editOrderModalCount : 0,

      });
    }


    updateSelectedProduct(localProduct);
  };

  if (!selectedProduct) {
    return null;
  }



  return (
    <Modal type={ModalType.POPUP} isModalOpen={modalOpen} onClose={modalClose} title='주문 수정'>
      <ModalContent>

        <Spacer height={41} />
        <Text $fontType='H2' color='white'>상품정보</Text>
        <Spacer height={9} />
        <ProductInfoContainer>
          <Image src={selectedProduct.thumbnails[0]} alt='prdImg' width='103px' height='103px' />
          <Spacer width={11} />
          <ProductInfoTextContainer>
            <Text $fontType='Body05' color='grey20'>{selectedProduct.smallCategory}</Text>
            <Text $fontType='Body03' color='white'>{selectedProduct.description}</Text>
            <Spacer height={14} />
            <PriceWithCounterContainer>
              <Text $fontType='H2' color='white'>{formatNumber(selectedProduct.price)} 원</Text>
              <Counter iconWidth={100} onCountChange={handleCounterChange} />
            </PriceWithCounterContainer>
          </ProductInfoTextContainer>
        </ProductInfoContainer>

        <Spacer height={24} />
        <Text $fontType='H2' color='white'>옵션 선택</Text>
        {
          localProduct && [
            localProduct.acpOption,
            localProduct.accOption1,
            localProduct.accOption2,
            localProduct.accOption3,
            localProduct.accOption4
          ].filter(Boolean).map((optionString, idx) => {
            const option = parseOption(optionString);
            return <CardWithCounter
              key={idx}
              option={option}
              ridAvailable={true}
              onRemove={() => handleOptionRemove(optionString)}
            />;
          })
        }

        <div />

        <Spacer height={51} />

        <CommonButton
          type={ButtonType.Primary}
          width='100%'
          onClick={handleConfirmClick}
        >
          확인
        </CommonButton>
      </ModalContent>
    </Modal>
  );


};

export default EditOrderModal;

const ModalContent = styled.div`
  max-height: 80vh; 
  overflow-y: auto; 
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProductInfoTextContainer = styled.div`
  margin: auto;
`;

const PriceWithCounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OptionCardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.color.grey70};
  height: 113px;
  border-radius: 9px;
  padding: 27px 14px;
  position: relative;
`;

const OptionCardItemCounterWithPrice = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RidOptionBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.color.grey20};
  font-size: 20px;
  position: absolute;
  right: 14px;
  top: 14px;
`;
