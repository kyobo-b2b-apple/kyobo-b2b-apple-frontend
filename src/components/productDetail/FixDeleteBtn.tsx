import styled from 'styled-components';

interface FixDeleteProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

const FixDeleteBtn: React.FC<FixDeleteProps> = ({ onEdit, onDelete }) => {
  return (
    <FixWrap>
      <FixBtn onClick={onEdit}>수정</FixBtn>
      <FixBtn onClick={onDelete}>삭제</FixBtn>
    </FixWrap>
  );
};

const FixWrap = styled.div`
  display: flex;
`;
const FixBtn = styled.button`
  line-height: 2;
  white-space: nowrap;
  color: ${(props) => props.theme.color.grey30};
  background-color: #1e1e1e;
  padding: 0;
`;

export default FixDeleteBtn;
