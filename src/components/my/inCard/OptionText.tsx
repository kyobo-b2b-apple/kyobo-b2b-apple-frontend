import { Text } from '../../common';
import useMediaFont from '../../../hooks/useMediaFont';
import truncateText from '../../../utils/truncateText';

interface OptionTextProps {
  text: string;
}

const OptionText = ({ text }: OptionTextProps) => {
  const optionFont = useMediaFont({ desktop: 'Caption01', tablet: 'Caption01', mobile: 'Caption02' });
  const truncatedText = truncateText({
    text: text,
    maxLength: 45,
  });

  return (
    <Text $fontType={optionFont} color="grey30">
      {truncatedText}
    </Text>
  );
};
export default OptionText;
