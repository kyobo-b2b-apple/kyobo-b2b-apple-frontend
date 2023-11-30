import React from 'react';
import Text from '../common/Text';

interface ErrorMessageProps {
  children: any;
}

const ErrorMessageComponents: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <Text $fontType="Caption02" color="red30">
      {children}
    </Text>
  );
};

export default ErrorMessageComponents;
