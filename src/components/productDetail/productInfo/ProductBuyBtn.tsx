
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import InfoText from '../TextStyle';
import CommonButton, { ButtonType } from '../../common/Button';
import LikeBtn from '../../../assets/Icons/LikeBtn.svg';
import UnLikeBtn from '../../../assets/Icons/UnLikeBtn.svg';
import DetailOptionSelect from './DetailOptionSelect';
import AppleCareForm from '../applecare/AppleCareForm';

import { addToCart } from '../../../api/cartApi';
import { addBookmark } from '../../../api/bookMarkApi';

import { setCartItems } from '../../../store/cartSlice';

interface LikeButtonProps {
  isLiked?: boolean;
  isMobileDevice?: boolean;
  isMobile?: boolean;
  productData?: any;
  productId?: string;
  cartOption?: any[];
}

const ProductBuyBtn: React.FC<LikeButtonProps> = ({ isMobileDevice, productData, productId, cartOption }) => {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [isMobileBuySlide, isSetMobileBuySlide] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  console.log(productData);

  const productForPay = {
    deliveryFee: productData.result.deliveryFee || 2500,
    id: productData.result.id,
    quantity: 1,
    acpEmail: productData.result.acpEmail || 'appleb2b@apple.com',
    acpName: productData.result.acpName || 'steve jobs',
    acpOptionQuantity: productData.result.accOptionQuantity || 1,
    accOption1Quantity: productData.result.accOption1Quantity || 1,
    accOption2Quantity: productData.result.accOption2Quantity || 1,
    accOption3Quantity: productData.result.accOption3Quantity || 1,
    accOption4Quantity: productData.result.accOption4Quantity || 1,
    totalPrice: productData.result.price,
    product: {
      accOption1: productData.result.accOption1 || 'Magic Trackpad - White (+149,000원)',
      accOption2: productData.result.accOption2 || 'Thunderbolt 4 Pro Cable (1.8 m) (+165,000원)',
      accOption3: productData.result.accOption3 || 'USB-C Digital AV Multiport Adapter (+79,000원)',
      accOption4: productData.result.accOption4 || 'USB-C VGA Multiport Adapter (+85,000원)',
      acpOption: 'AppleCare+ for Mac Pro (M2) (자동등록) (+549,000원)',
      description: productData.result.description || 'Mac Pro (Rack) M2 Ultra : 24C CPU/60C GPU/64G/1TB',
      id: productData.result.id,
      price: productData.result.price || 900000,
      smallCategory: productData.result.smallCategory || 'Mac Pro',
      thumbnails: productData.result.thumbnails
    },
  };

  const productForCart = {
    productId: productData.result.id,
    quantity: 1,
    acpEmail: productData.result.acpEmail || 'appleb2b@apple.com',
    acpName: productData.result.acpName || 'steve jobs',
    acpOptionQuantity: productData.result.accOptionQuantity || 1,
    accOption1Quantity: productData.result.accOption1Quantity || 1,
    accOption2Quantity: productData.result.accOption2Quantity || 1,
    accOption3Quantity: productData.result.accOption3Quantity || 1,
    accOption4Quantity: productData.result.accOption4Quantity || 1,
  };


  const handleBuyClick = () => {
    dispatch(setCartItems([productForPay]));
    navigate('/pay');
    if (isMobileDevice) {
      isSetMobileBuySlide(!isMobileBuySlide);
    }
  };

  const handleAddCart = () => {
    addToCart(productForCart);
    navigate('/cart');
  };

  const ToggleIsLike = async () => {
    if (!isLike) {
      const result = await addBookmark(productId);

      if (result && result.isSuccess) {
        console.log('북마크 추가 성공');
        setIsLike(true);
      } else {
        console.log('북마크 추가 실패');
      }
    } else {
      setIsLike(false);
    }
  };

  return (
    <>
      {isMobileBuySlide && (
        <SlideContainer show={isMobileBuySlide} isMobile={true} onClose={() => isSetMobileBuySlide(false)}>
          <DetailOptionSelect
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions as React.Dispatch<React.SetStateAction<any[]>>}
            productData={productData}
          />
          <AppleCareForm productData={productData} selectedOptions={selectedOptions} />
        </SlideContainer>
      )}
      <Buycontainer isMobileDevice={isMobileDevice}>
        <LikeButton onClick={ToggleIsLike} isLiked={isLike} />
        <CustomBtn onClick={handleAddCart} type={ButtonType.Secondary} width={'100%'}>
          <InfoText>장바구니</InfoText>
        </CustomBtn>
        <CustomBtn type={ButtonType.Primary} width={'100%'} onClick={handleBuyClick}>
          <InfoText>바로구매</InfoText>
        </CustomBtn>
      </Buycontainer>
    </>
  );
};

const Buycontainer = styled.div<LikeButtonProps>`
  ${(props) =>
    props.isMobileDevice &&
    `
    padding:20px 20px;
    background-color: #000;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);`}
  display: grid;
  width: 100%;
  grid-template-columns: auto repeat(2, minmax(0, 1fr));
  gap: 9px;
  justify-content: start;
  justify-items: start;
`;
const LikeButton = styled.button<LikeButtonProps>`
  background-image: ${(props) => (props.isLiked ? `url(${LikeBtn})` : `url(${UnLikeBtn})`)};
  width: 46px;
  height: 46px;
  background-size: cover;
  background-color: ${(props) => props.theme.color.grey70};
`;
const SlideContainer = styled.div<{ isMobile: boolean; show: boolean; onClose: () => void }>`
  position: fixed;
  bottom: ${(props) => (props.show ? '0' : '-100%')};
  left: 50%;
  transform: translateX(-50%);
  padding: ${(props) => (props.isMobile ? '31px 20px' : '31px 85px')};
  width: 100%;
  height: 619px;
  background-color: #000;
  transition-property: bottom;
  transition-duration: 0.5s;
  overflow: scroll;
`;

const CustomBtn = styled(CommonButton)`
  white-space: nowrap;
  min-width: 110px;
`;

export default ProductBuyBtn;

{/* !!TODO 데이터 전달 로직 확인 및 코드 수정  */ }

// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';
// import InfoText from '../TextStyle';
// import CommonButton, { ButtonType } from '../../common/Button';
// import LikeBtn from '../../../assets/Icons/LikeBtn.svg';
// import UnLikeBtn from '../../../assets/Icons/UnLikeBtn.svg';
// import DetailOptionSelect from './DetailOptionSelect';
// import AppleCareForm from '../applecare/AppleCareForm';

// import { addToCart } from '../../../api/cartApi';
// import { addBookmark } from '../../../api/bookMarkApi';

// import { setCartItems } from '../../../store/cartSlice';

// interface LikeButtonProps {
//   isLiked?: boolean;
//   isMobileDevice?: boolean;
//   isMobile?: boolean;
//   productData?: any;
//   productId?: string;
//   cartOption?: any[];
//   counts?: { [key: string]: number };
//   selectedOptions?: Array<{ value: string }>;
//   appleCareName?: string;
//   appleCareEmail?: string;
// }


// const ProductBuyBtn: React.FC<LikeButtonProps> = ({
//   selectedOptions,
//   counts,
//   isMobileDevice,
//   productData,
//   productId,
//   appleCareName,
//   appleCareEmail,
// }) => {
//   const dispatch = useDispatch();
//   const [isLike, setIsLike] = useState(false);
//   const [isMobileBuySlide, isSetMobileBuySlide] = useState(false);


//   const navigate = useNavigate();


//   const productForPay = {
//     deliveryFee: productData.result.deliveryFee || 2500,
//     id: productData.result.id,
//     quantity: 1,
//     acpEmail: productData.result.acpEmail || 'appleb2b@apple.com',
//     acpName: productData.result.acpName || 'steve jobs',
//     acpOptionQuantity: productData.result.accOptionQuantity || 1,
//     accOption1Quantity: productData.result.accOption1Quantity || 1,
//     accOption2Quantity: productData.result.accOption2Quantity || 1,
//     accOption3Quantity: productData.result.accOption3Quantity || 1,
//     accOption4Quantity: productData.result.accOption4Quantity || 1,
//     totalPrice: productData.result.price,
//     product: {
//       accOption1: productData.result.accOption1 || 'Magic Trackpad - White (+149,000원)',
//       accOption2: productData.result.accOption2 || 'Thunderbolt 4 Pro Cable (1.8 m) (+165,000원)',
//       accOption3: productData.result.accOption3 || 'USB-C Digital AV Multiport Adapter (+79,000원)',
//       accOption4: productData.result.accOption4 || 'USB-C VGA Multiport Adapter (+85,000원)',
//       acpOption: 'AppleCare+ for Mac Pro (M2) (자동등록) (+549,000원)',
//       description: productData.result.description || 'Mac Pro (Rack) M2 Ultra : 24C CPU/60C GPU/64G/1TB',
//       id: productData.result.id,
//       price: productData.result.price || 900000,
//       smallCategory: productData.result.smallCategory || 'Mac Pro',
//       thumbnails: productData.result.thumbnails
//     },
//   };

//   const productForCart = {
//     productId: productData.result.id,
//     quantity: 1,
//     acpEmail: appleCareEmail,
//     acpName: appleCareName,
//     acpOptionQuantity: productData.result.acpOptionQuantity,
//     accOption1Quantity: productData.result.accOption1Quantity,
//     accOption2Quantity: productData.result.accOption2Quantity,
//     accOption3Quantity: productData.result.accOption3Quantity,
//     accOption4Quantity: productData.result.accOption4Quantity,

//   };

//   const prdInfo = {
//     productId: productData.result.id,
//     quantity: 1,
//     acpEmail: appleCareEmail,
//     acpName: appleCareName,
//     acpOptionQuantity: productData.result.acpOptionQuantity,
//     accOption1Quantity: productData.result.accOption1Quantity,
//     accOption2Quantity: productData.result.accOption2Quantity,
//   };


//   const handleBuyClick = () => {
//     dispatch(setCartItems([productForPay]));
//     navigate('/pay');
//     if (isMobileDevice) {
//       isSetMobileBuySlide(!isMobileBuySlide);
//     }
//   };

//   const handleAddCart = () => {

//     if (!counts) {
//       return;
//     }
//     const productCount = counts['product'] || 0;

//     if (productCount < 1) {
//       return;
//     }
//     if (!selectedOptions) {
//       return;
//     }

//     const productCounts = { quantity: productCount };

//     const optionCounts = selectedOptions.reduce((acc, option) => {
//       const key = `${option.value}Quantity`;
//       acc[key] = counts[option.value] || 0;
//       return acc;
//     }, {});

//     // payload에 선택한 옵션 정보도 포함
//     const payload = { ...prdInfo, ...productCounts, ...optionCounts, selectedOptions };

//     addToCart(payload);

//     navigate('/cart');
//   };

//   const ToggleIsLike = async () => {
//     if (!isLike) {
//       const result = await addBookmark(productId);

//       if (result && result.isSuccess) {
//         console.log('북마크 추가 성공');
//         setIsLike(true);
//       } else {
//         console.log('북마크 추가 실패');
//       }
//     } else {
//       setIsLike(false);
//     }
//   };

//   return (
//     <>
//       {isMobileBuySlide && (
//         <SlideContainer show={isMobileBuySlide} isMobile={true} onClose={() => isSetMobileBuySlide(false)}>
//           <DetailOptionSelect
//             selectedOptions={selectedOptions}
//             setSelectedOptions={selectedOptions as unknown as React.Dispatch<React.SetStateAction<any[]>>}
//             productData={productData}
//           />
//           <AppleCareForm productData={productData} selectedOptions={selectedOptions} />
//         </SlideContainer>
//       )}
//       <Buycontainer isMobileDevice={isMobileDevice}>
//         <LikeButton onClick={ToggleIsLike} isLiked={isLike} />
//         <CustomBtn onClick={handleAddCart} type={ButtonType.Secondary} width={'100%'}>
//           <InfoText>장바구니</InfoText>
//         </CustomBtn>
//         <CustomBtn type={ButtonType.Primary} width={'100%'} onClick={handleBuyClick}>
//           <InfoText>바로구매</InfoText>
//         </CustomBtn>
//       </Buycontainer>
//     </>
//   );
// };

// const Buycontainer = styled.div<LikeButtonProps>`
//   ${(props) =>
//     props.isMobileDevice &&
//     `
//     padding:20px 20px;
//     background-color: #000;
//     position: fixed;
//     left: 50%;
//     bottom: 0;
//     transform: translateX(-50%);`}
//   display: grid;
//   width: 100%;
//   grid-template-columns: auto repeat(2, minmax(0, 1fr));
//   gap: 9px;
//   justify-content: start;
//   justify-items: start;
// `;
// const LikeButton = styled.button<LikeButtonProps>`
//   background-image: ${(props) => (props.isLiked ? `url(${LikeBtn})` : `url(${UnLikeBtn})`)};
//   width: 46px;
//   height: 46px;
//   background-size: cover;
//   background-color: ${(props) => props.theme.color.grey70};
// `;
// const SlideContainer = styled.div<{ isMobile: boolean; show: boolean; onClose: () => void }>`
//   position: fixed;
//   bottom: ${(props) => (props.show ? '0' : '-100%')};
//   left: 50%;
//   transform: translateX(-50%);
//   padding: ${(props) => (props.isMobile ? '31px 20px' : '31px 85px')};
//   width: 100%;
//   height: 619px;
//   background-color: #000;
//   transition-property: bottom;
//   transition-duration: 0.5s;
//   overflow: scroll;
// `;

// const CustomBtn = styled(CommonButton)`
//   white-space: nowrap;
//   min-width: 110px;
// `;

// export default ProductBuyBtn;
