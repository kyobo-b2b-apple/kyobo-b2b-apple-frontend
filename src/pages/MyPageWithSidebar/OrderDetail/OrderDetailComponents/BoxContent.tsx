import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Text } from '../../../../components/common';
import useMediaFont from '../../../../hooks/useMediaFont';

interface BoxContentProps extends PropsWithChildren {
  label: string;
}

const BoxContent = ({ label, children }: BoxContentProps) => {
  const CardTitleFont = useMediaFont({ desktop: 'H1', tablet: 'H2', mobile: 'H3' });

  return (
    <ContentWrapper>
      <Text $fontType={CardTitleFont} color="white">
        {label}
      </Text>
      {children}
    </ContentWrapper>
  );
};
export default BoxContent;

const ContentWrapper = styled.div`
  @media screen and (min-width: 480px)  {
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  @media screen and (max-width: 479px) {
    border-radius: 8px;
    background: ${(props) => props.theme.color.grey80};
    padding: 18px 13px 29px 13px;
  }
`;
