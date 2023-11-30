export const formatPhoneNumber = (number) => {
  const formattedNumber = number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  return formattedNumber;
};
