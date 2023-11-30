import { TermsProps } from '../../constants/terms';
import { Text, Spacer } from '../../components/common';

const PolicyContainer = ({ title, content }: TermsProps) => {
  return (
    <>
      <Text $fontType="Caption03" color="white" lineHeight="22px">
        {title}
      </Text>
      <Text $fontType="Caption02" color="white" lineHeight="22px">
        {content}
      </Text>
      <Spacer height="24px" />
    </>
  );
};
export default PolicyContainer;
