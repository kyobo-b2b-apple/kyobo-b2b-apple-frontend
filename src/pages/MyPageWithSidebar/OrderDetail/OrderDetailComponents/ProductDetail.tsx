import styled from 'styled-components';
import CardContent from '../../../../components/my/inCard/CardContent';
import LeftContentImage from '../../../../components/my/inCard/LeftContentImage';
import RightContent from '../../../../components/my/inCard/RightContent';
import ProductNameText from '../../../../components/my/inCard/ProductNameText';
import PriceAndCount from '../../../../components/my/inCard/PriceAndCount';
import { Text } from '../../../../components/common';
import useMediaFont from '../../../../hooks/useMediaFont';
import { OrderProductProps } from '../../../../interfaces/orderItemProps';

interface ProductDetailProps {
  item: OrderProductProps;
}

const ProductDetail = ({ item }: ProductDetailProps) => {
  const optionFont = useMediaFont({ desktop: 'Body05', tablet: 'Body05', mobile: 'Caption02' });

  const setOptionText = () => {
    let optionText = '';
    if (item.acpOption) {
      optionText += item.acpOption + ' / ';
    }
    if (item.accOption1) {
      optionText += item.accOption1 + ' / ';
    }
    if (item.accOption2) {
      optionText += item.accOption2;
    }
    return optionText;
  };

  return (
    <CardContent columnGap={22}>
      <LeftContentImage src={item.thumbnails[0]} />
      <RightContent>
        <ProductNameText productName={item?.description} />
        <PriceAndCount price={item?.price} count={1} />
        <OptionText $fontType={optionFont}>옵션 : {setOptionText()}</OptionText>
      </RightContent>
    </CardContent>
  );
};
export default ProductDetail;

const OptionText = styled(Text)`
  color: #aeaeb2;
`;
