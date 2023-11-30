import styled from 'styled-components';

interface DeleteIconProps {
  onClick: () => void;
}

const WishDeleteIcon = ({ onClick }: DeleteIconProps) => {
  return (
    <IconWrapper onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path
          d="M16.625 4.375L4.375 16.625M16.625 16.625L4.375 4.375"
          stroke="#808080"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </IconWrapper>
  );
};
export default WishDeleteIcon;

const IconWrapper = styled.div`
  margin-left: auto;
  cursor: pointer;
`;
