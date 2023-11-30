import { useMediaQuery } from 'react-responsive';

interface MediaProps {
  desktop: number | string;
  tablet: number | string;
  mobile: number | string;
}

const useMediaPX = ({ desktop, tablet, mobile }: MediaProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 480px) and (max-width: 767px)' });

  if (isDesktop) {
    return desktop;
  } else if (isTablet) {
    return tablet;
  } else {
    return mobile;
  }
};
export default useMediaPX;
