import styled from 'styled-components';
import { Text } from '../../../../components/common';

interface ShipMemoProps {
  text: string;
}

const ShipMemo = ({ text }: ShipMemoProps) => {
  return (
    <ShipMemoWrapper>
      <Text $fontType="Body04" color="white">
        배송메모
      </Text>
      <TextWrapper>
        <Text $fontType="Body05" color="white">
          {text}
        </Text>
      </TextWrapper>
    </ShipMemoWrapper>
  );
};
export default ShipMemo;

const ShipMemoWrapper = styled.div`
  display: flex;
  flex-direction: column;

   @media screen and (min-width: 768px) {
    gap: 12px 0px;
  }
  @media screen and (min-width: 480px) and (max-width: 767px) {
    gap: 7px 0px;
  }
  @media screen and (max-width: 479px) {
    gap: 6px 0px;
  }
`;

const TextWrapper = styled.div`
  border-radius: 8px;
  background: ${(props) => props.theme.color.grey70};
  padding: 13px 16px;
  min-height: 59px;
`;
