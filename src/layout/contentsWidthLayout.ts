import styled, { css } from 'styled-components';

interface LayoutProps {
  $backgroundColor?: keyof typeof import('../styles/theme').default.color | string;
  children: any;
  $type?: string;
}

const ContentsLayout = styled.div.attrs<LayoutProps>((props) => props)`
  ${({ theme, $backgroundColor, $type }) => css`
    background-color: ${$backgroundColor && theme.color[$backgroundColor]
      ? theme.color[$backgroundColor]
      : $backgroundColor};
    max-width: ${$type === 'full' ? '100%' : '868px'};

    /* @media screen and (min-width: 768px) {
      margin: ${$type !== 'full' && '0 auto'};
    }
    @media screen and (max-width: 868px) {
      margin: ${$type === 'responsive' && '0px 0px'};
    }

    @media screen and (max-width: 767px) {
      margin: ${$type === 'responsive' && '0px 20px'};
    } */
    @media screen and (min-width: 768px) {
      max-width: ${$type !== 'full' ? '868px' : '100%'};
      margin: ${$type !== 'full' && '0 auto'};
    }

    @media screen and (min-width: 481px) and (max-width: 767px) {
      margin: ${$type === 'responsive' && '20px'};
    }

    @media screen and (max-width: 480px) {
      margin: ${$type === 'responsive' && '20px'};
    }
    /* display: grid;
    place-items: center; */
  `}
` as React.FC<LayoutProps>;

export default ContentsLayout;
