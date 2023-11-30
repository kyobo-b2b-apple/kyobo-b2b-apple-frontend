import styled from 'styled-components';
import Image from '../../image/Image';

interface ContentImageProps {
  src: string;
}

const LeftContentImage = ({ src }: ContentImageProps) => {
  return (
    <LeftWrapper>
      <Image src={src} alt="product-image" />
    </LeftWrapper>
  );
};
export default LeftContentImage;

const LeftWrapper = styled.div`
  background: ${(props) => props.theme.color.white};
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media screen and (min-width: 480px)  {
    max-width: 130px;
    max-height: 130px;
    border-radius: 8px;
  }
  @media screen and (max-width: 479px) {
    max-width: 75px;
    max-height: 75px;
    border-radius: 7px;
  }
`;
