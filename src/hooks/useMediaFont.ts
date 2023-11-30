import { useMediaQuery } from 'react-responsive';

interface FontProps {
  desktop: keyof typeof import('../styles/theme').default.text;
  tablet: keyof typeof import('../styles/theme').default.text;
  mobile: keyof typeof import('../styles/theme').default.text;
}

const useMediaFont = ({ desktop, tablet, mobile }: FontProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 480px) and (max-width: 767px)' });

  return isDesktop ? desktop : isTablet ? tablet : mobile;
};
export default useMediaFont;
