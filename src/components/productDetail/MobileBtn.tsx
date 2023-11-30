import { useEffect } from 'react';
import ProductBuyBtn from './productInfo/ProductBuyBtn';

interface MoblieProps {
  isMobileDevice?: boolean;
  isMobile?: boolean;
  productData?: any;
}

const MobileDeviceBtn: React.FC<MoblieProps> = ({ isMobileDevice, isMobile, productData }) => {

  return (
    <div>
      <ProductBuyBtn productData={productData} isMobileDevice={isMobileDevice} isMobile={isMobile} />
    </div>
  );
};

export default MobileDeviceBtn;
