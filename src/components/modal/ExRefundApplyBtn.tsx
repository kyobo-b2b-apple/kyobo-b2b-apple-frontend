import CommonButton, { ButtonType } from '../common/Button';

interface ExRefundApplyBtnProp {
  onClick: () => void;
}

const ExRefundApplyBtn: React.FC<ExRefundApplyBtnProp> = ({ onClick }) => {
  return (
    <CommonButton width={'100%'} type={ButtonType.Secondary} onClick={onClick}>
      확인
    </CommonButton>
  );
};

export default ExRefundApplyBtn;
