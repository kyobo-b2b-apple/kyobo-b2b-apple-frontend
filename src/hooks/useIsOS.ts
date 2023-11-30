import { useMediaQuery } from 'react-responsive';

export type OSProps = {
  os: OS;
};

export enum OS {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile',
}

export const useIsOS = (os: OS) => {
  let query = '';

  if (os === OS.DESKTOP) {
    query = '(min-width: 769px)';
  } else if (os === OS.TABLET) {
    query = '(min-width: 480px) and (max-width: 767px)';
  } else if (os === OS.MOBILE) {
    query = '(max-width: 479px)';
  }
  return useMediaQuery({ query });
};

export const useDeviceType = () => {
  const isDesktop = useIsOS(OS.DESKTOP);
  const isTablet = useIsOS(OS.TABLET);
  const isMobile = useIsOS(OS.MOBILE);

  return { isDesktop, isTablet, isMobile };
};
