import { styled } from 'styled-components';
import { Text } from '../../common';
import { PropsWithChildren } from 'react';

interface BtnTextProps {
  children?: string;
  isMobileType?: boolean;
}
interface InfoBtn {
  id: number;
  text: string;
}
interface PageCategoryContainerProps {
  isMobileType?: boolean;
}

const BtnText: React.FC<PropsWithChildren<BtnTextProps>> = ({ children, isMobileType }) => (
  <CustomText $fontType={isMobileType ? 'Caption02' : 'Body01'}>{children}</CustomText>
);

const InfoBtns: InfoBtn[] = [
  { id: 1, text: '제품 상세정보' },
  { id: 2, text: '배송안내' },
  { id: 3, text: '교환 및 반품안내' },
  { id: 4, text: '상품후기' },
  { id: 5, text: '상품문의' },
];
const PageCategory: React.FC<PageCategoryContainerProps> = ({ isMobileType }) => {
  return (
    <PageCategoryContainer isMobileType={isMobileType}>
      {InfoBtns.map((btn) => (
        <Category key={btn.id}>
          <BtnText>{btn.text}</BtnText>
        </Category>
      ))}
    </PageCategoryContainer>
  );
};
const PageCategoryContainer = styled.div<PageCategoryContainerProps>`
  display: flex;
  width: ${(props) => (props.isMobileType ? '100%' : '543px')};
  margin-left: ${(props) => (props.isMobileType ? '0px' : '64px')};
  justify-content: space-between;
`;

const Category = styled.button`
  background-color: #1e1e1e;
`;
const CustomText = styled(Text)`
  color: #bbb;
`;

export default PageCategory;
