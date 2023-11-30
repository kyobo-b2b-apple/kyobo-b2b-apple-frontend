import { Text } from '../../common';
import useMediaFont from '../../../hooks/useMediaFont';
import { styled } from 'styled-components';

interface LineClampTextProps {
  text: string;
}

const LineClampText = ({ text }: LineClampTextProps) => {
  const optionFont = useMediaFont({ desktop: 'Caption01', tablet: 'Caption01', mobile: 'Caption02' });

  return (
    <ClampText $fontType={optionFont} color="grey30">
      {text}
    </ClampText>
  );
};
export default LineClampText;

const ClampText = styled(Text)`
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (min-width: 480px)  {
    -webkit-line-clamp: 3;
  }
  @media screen and (max-width: 479px) {
    -webkit-line-clamp: 2;
  }
`;
