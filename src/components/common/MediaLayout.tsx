import { OS, useIsOS } from '../../hooks/useIsOS';

interface MediaProps {
  DesktopComponent: React.ReactNode;
  TabletComponent: React.ReactNode;
  MobileComponent: React.ReactNode;
}

const MediaLayout: React.FC<MediaProps> = ({ DesktopComponent, TabletComponent, MobileComponent }) => {
  const isDesktop = useIsOS(OS.DESKTOP);
  const isTablet = useIsOS(OS.TABLET);
  const isMobile = useIsOS(OS.MOBILE);

  return (
    <>
      {isDesktop && <>{DesktopComponent}</>}
      {isTablet && <>{TabletComponent}</>}
      {isMobile && <>{MobileComponent}</>}
    </>
  );
};
export default MediaLayout;
