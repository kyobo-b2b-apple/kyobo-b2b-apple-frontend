import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentsLayout from '../../layout/contentsWidthLayout';
import OrderProductCardList from '../PaymentPage/paymentComponents/OrderProductCardList';
import EditOrderModal from '../../components/modal/EditOrderModal';
import CommonButton, { ButtonType } from '../../components/common/Button';
import Spacer from '../../components/common/Spacer';
import Text from '../../components/common/Text';

import { getCartItems, deleteCartItems } from '../../api/cartApi';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../../store/cartSlice';

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

interface DataRow {
    id: number;
    product: Product;
    quantity: number;
    acpEmail?: string;
    acpName?: string;
    acpOptionQuantity?: number,
    accOption1Quantity?: number,
    accOption2Quantity?: number,
    accOption3Quantity?: number,
    accOption4Quantity?: number,
    totalPrice?: number;// 추가된 필드 
    deliveryFee: number;
}

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<DataRow[]>([]);

    console.log(products);

    useEffect(() => {
        const fetchData = async () => {
            const cartItems = await getCartItems();
            console.log('cartItems', cartItems);
            setProducts(cartItems);
        };
        fetchData();
    }, []);

    const handleDeleteItem = async (id: number) => {
        try {
            await deleteCartItems([id]);
            setProducts(prevProducts =>
                prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error('Failed to delete item', error);
        }
    };

    const handleOpenModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handlePurchaseClick = () => {
        dispatch(setCartItems(products));
        navigate('/pay');
    };

    return (
        <>

            <ContentsLayout>
                <Spacer height={30} />
                <Text $fontType='H0' color='white'>장바구니</Text>
                <Spacer height={5} />
                <OrderProductCardList data={products} isCart={true} onEditClicked={handleOpenModal} onDeleteClicked={handleDeleteItem} />
                <Spacer height={30} />
                <ButtonContainer>
                    <CommonButton type={ButtonType.Secondary} width='100%'>쇼핑 홈 가기</CommonButton>
                    <Spacer width={15} />
                    <CommonButton type={ButtonType.Primary} width='100%' onClick={handlePurchaseClick}>구매하기</CommonButton>
                </ButtonContainer>
                <EditOrderModal
                    modalOpen={isModalOpen}
                    modalClose={handleCloseModal}
                    selectedProduct={selectedProduct}
                    updateSelectedProduct={setSelectedProduct}

                />
                <Spacer height={85} />
            </ContentsLayout>

        </>
    );

};

export default CartPage;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const LineVertical = styled.div`
    width: 1px;
    height: 100%;
    background-color: ${(props) => props.theme.color.white};
`;

const OderNumContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.color.grey70};
    border-radius: 8px;

    padding: 7px 15px;
`;

const OrderNumText = styled.div`
    display: flex;
    flex-direction: row;
`;