const formatOrderState = (state: string) => {
  switch (state) {
    case 'PREPARE_PRODUCT':
      return 2;
    case 'DELIVERY_START':
      return 3;
    case 'IN_TRANSIT':
      return 4;
    case 'DELIVERY_COMPLETED':
      return 5;
    default:
      return 1;
  }
};
export default formatOrderState;
