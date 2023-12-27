import ErrorMessageComponents from '../../components/common/ErrorMessage';
import CommonButton, { ButtonType } from '../../components/common/Button';
import { Text } from '../../components/common';
import styled from 'styled-components';
import TextBox from '../../components/common/TextBox';
import { useNavigate } from 'react-router-dom';

interface ErrorProp {
  errorTitle: string;
  errorMessage: string;
  isRefrech?: boolean;
  isPrevious?: boolean;
  isHome?: boolean;
}

const ErrorPage: React.FC<ErrorProp> = ({
  errorTitle,
  errorMessage,
  isRefrech = true,
  isHome = true,
  isPrevious = true,
}) => {
  const navigate = useNavigate();

  const refreshBtn = () => {
    window.location.reload();
  };

  const previousBtn = () => {
    navigate(-1);
  };

  const homeBtn = () => {
    navigate('/');
  };

  return (
    <ErrorContainer>
      <ContentContainer>
        <Text $fontType="H2" color="red30">
          {errorTitle}
        </Text>
      </ContentContainer>
      <ContentContainer>
        <TextBox bgColor="grey90">
          <ErrorMessageComponents>{errorMessage}</ErrorMessageComponents>
        </TextBox>
      </ContentContainer>
      <ContentContainer>
        {isRefrech && (
          <CommonButton onClick={refreshBtn} type={ButtonType.Secondary}>
            새로고침
          </CommonButton>
        )}
        {isPrevious && (
          <CommonButton onClick={previousBtn} type={ButtonType.Secondary}>
            뒤로가기
          </CommonButton>
        )}
        {isHome && (
          <CommonButton onClick={homeBtn} type={ButtonType.Secondary}>
            홈으로 가기
          </CommonButton>
        )}
      </ContentContainer>
    </ErrorContainer>
  );
};

export default ErrorPage;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;
