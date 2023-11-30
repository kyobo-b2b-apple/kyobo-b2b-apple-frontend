export interface ShipmentProps {
  id: number;
  shippingCompanyName: string;
  shippingCompanyPhoneNumber: string;
  memo: string;
  recipientName: string;
  recipientPhoneNumber: string;
  address: string;
  addressDetail: string;
  invoiceNumber: string;
  invoiceInputDate: string;
  deliveryStatusList: DeliveryStatusProps[];
}

export interface DeliveryStatusProps {
  id: number;
  currentState: string;
  currentLocation: string;
  createdAt: string;
}
