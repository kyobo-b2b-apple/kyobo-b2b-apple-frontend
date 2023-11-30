import { styled } from 'styled-components';
import FileUpload from '../FileUploadBtn';
import Text from '../../common/Text';

interface FileUploadProps {
  isSubmitted: boolean;
  onChange?: (files: File[]) => void;
}
const InquiryFileUploadForm: React.FC<FileUploadProps> = ({ isSubmitted, onChange }) => {
  return (
    <InputWrapper>
      <UploadInfoWrap>
        <FormTitleText $fontType="Body04" color="white">
          첨부파일 (필수) *
        </FormTitleText>
        <Text $fontType="Body05" color="grey40">
          *사업자 등록증 사본 필수
        </Text>
      </UploadInfoWrap>
      <FileUpload isSubmitted={isSubmitted} onChange={onChange} />
    </InputWrapper>
  );
};

const FormTitleText = styled(Text)`
  line-height: normal;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const UploadInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default InquiryFileUploadForm;
