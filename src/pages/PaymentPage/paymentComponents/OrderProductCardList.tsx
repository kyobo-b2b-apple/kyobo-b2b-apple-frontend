import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CardContainer } from '../../../layout/CardLayout';
import Text from '../../../components/common/Text';
import Image from '../../../components/image/Image';
import Line from '../../../components/common/Line';
import Spacer from '../../../components/common/Spacer';
import { formatNumber } from '../../../utils/formatNumber';
import CommonButton, { ButtonType } from '../../../components/common/Button';
import { GrClose } from 'react-icons/gr';
import { Product, DataRow } from '../../../interface/product';
import { setCartItems } from '../../../store/cartSlice';


interface OrderProductCardListProps {
    data: DataRow[];
    isCart?: boolean;

    onEditClicked?: (product: Product) => void;
    onDeleteClicked?: (id: number) => void;

}

interface TabelHeaderItemsProps {
    width?: string;
}

const OrderProductCardList: React.FC<OrderProductCardListProps> = ({ data, isCart, onEditClicked, onDeleteClicked }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditClick = (product: Product) => {
        if (onEditClicked) {
            onEditClicked(product);
        }
    };


    return (
        <CardListContainer>
            <GridContainer>
                <GridHeader>
                    <GridItem width="60%" style={{ textAlign: 'left', paddingLeft: '60px' }}>
                        <Text $fontType='Body04' color='white'>상품정보</Text>
                    </GridItem>

                    <GridItem width="10%">
                        <Text $fontType='Body04' color='white'>수량</Text>
                    </GridItem>
                    <GridItem width="20%">
                        <Text $fontType='Body04' color='white'>상품금액</Text>
                    </GridItem>
                </GridHeader>

                {data?.map((row) => (
                    <GridRow key={row.id} >
                        {isCart && (
                            <DeleteButton onClick={() => onDeleteClicked && onDeleteClicked(row.id)}>
                                <GrClose color="#fff" size="20px" />
                            </DeleteButton>
                        )}

                        <GridItem width="60%">
                            <ProductInfoContainer>
                                <ThumImage>
                                    <Image src={row.product.thumbnails[0]} alt='productIMage' width='147px' />
                                </ThumImage>

                                <ProductInfoTextContainer>
                                    <Text $fontType='Caption02' color='grey20'>{row.product.smallCategory}</Text>
                                    <Text $fontType='Body03' color='white'>{row.product.description}</Text>
                                    <Spacer height='8px' />
                                    <Text $fontType='Body04' color='white'>주문옵션</Text>
                                    <Text $fontType='Body04' color='grey50'>    {[
                                        ...(row.product.acpOption ? [row.product.acpOption] : []),
                                        ...(row.product.accOption1 ? [row.product.accOption1] : []),
                                        ...(row.product.accOption2 ? [row.product.accOption2] : []),
                                        ...(row.product.accOption3 ? [row.product.accOption3] : []),
                                        ...(row.product.accOption4 ? [row.product.accOption4] : [])
                                    ].join('/')}</Text>
                                </ProductInfoTextContainer>
                            </ProductInfoContainer>
                        </GridItem>

                        <GridItem width="10%" className='order-amout'>
                            <div className='order-label'>
                                <Text $fontType='H3' color='white'>수량</Text>
                            </div>

                            <div className='order-amount-value'>
                                <Text $fontType='Body04' color='white'>{row.quantity}개</Text>
                                <Spacer height={8} />
                                {isCart && (
                                    <CommonButton
                                        type={ButtonType.Ghost}
                                        onClick={() => {
                                            if (onEditClicked) {
                                                onEditClicked(row.product);
                                            }
                                        }}
                                    >
                                        주문수정
                                    </CommonButton>
                                )
                                }
                            </div>
                        </GridItem>
                        <GridItem width="20%" className='order-price'>
                            <div className='order-amount-row'>
                                <div className='order-label'>
                                    <Text $fontType='H3' color='white'>금액</Text>
                                </div>
                                <Text $fontType='H1' color='white'>{formatNumber(row.product.price)}원</Text>
                            </div>
                            <div className='order-btn-container'>
                                {isCart && (
                                    <CustomCommonButton
                                        type={ButtonType.Primary}
                                        onClick={() => {
                                            dispatch(setCartItems([row]));
                                            navigate('/pay');
                                        }}
                                    >
                                        바로구매
                                    </CustomCommonButton>
                                )
                                }
                            </div>

                        </GridItem>
                    </GridRow >
                ))}

            </GridContainer>
        </CardListContainer >
    );
};

export default OrderProductCardList;


const CardListContainer = styled.div`
    width: 100%;
    border-radius: 8px;
    background-color: ${(props) => props.theme.color.grey80};
`;


const ProductInfoContainer = styled.td`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;

const ProductInfoTextContainer = styled.div`
        flex-direction: column;
    justify-content: center;
    margin-left: 9px;  
    text-align: left;
`;



const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    background-color: none;
    align-items: center;
  }
`;

const GridHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid #555555;

  @media (max-width: 767px) {
    display: none;
  }
  
`;

const GridRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .order-label{
    display: none;
  }

  .order-btn-container {
                width: 100%;
                margin-top: 8px;
                display: flex;
                justify-content: center;     
            }



  
  @media (max-width: 767px) {
    padding: 13px;
    flex-direction: column;
    background-color: ${props => props.theme.color.grey60};
    width: 90%;
    margin: 15px 0px;
    border-radius: 8px;

    .delivery-container{
    display: none;
  }

    .order-label{
        display: flex;
    }
    
    .order-amout{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .order-amount-row{
            visibility: visible;
        }
        .order-amount-value{
            display: flex;
            align-items: center;
        }
    }

    .order-price {
            flex-direction: column;
            width: 100%;
            margin-top: 20px;

            .order-amount-row {
                width: 100%;
                text-align: center; 
                display: flex;
                justify-content: space-between;
            }

            .order-price-value {
                width: 100%; 
                text-align: center; 
                padding-bottom: 10px; 
            }

            .order-btn-container {
                width: 100%;
                margin-top: 8px;

            }
        }

  }
`;


export const GridItem = styled.div<{ width?: string }>`
  flex-basis: ${({ width }) => width || 'auto'};
  text-align: center;
  
  
`;

const CustomCommonButton = styled(CommonButton)`
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const RidFromList = styled.div`
display: none;
@media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
`;

const RidBtn = styled.button`
display: none;
@media (max-width: 767px) {
    background-color: transparent;
}
`;

const ThumImage = styled.div`
    border-radius: 8px;
    
    

    img {
        border-radius: 8px;
        width: 147px;;
        height: auto;
        
    }
`;
const DeleteButton = styled.button`
    position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
`;