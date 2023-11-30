import { Text } from '../common';

interface InfoTextProps {
  children: string;
}

const InfoText: React.FC<InfoTextProps> = ({ children }) => (
  <Text $fontType="Body04" color="white">
    {children}
  </Text>
);

export default InfoText;
