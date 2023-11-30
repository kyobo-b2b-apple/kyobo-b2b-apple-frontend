import { styled } from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { useEffect, useRef } from 'react';
import { InputStyle } from '../../common/Input';
import CommonButton, { ButtonType } from '../../common/Button';
import Text from '../../common/Text';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { PersonalFormData } from './JoinPersonalForm';

interface AddressFormProps {
  register: UseFormRegister<PersonalFormData>;
  setValue: any;
}

const AddressForm: React.FC<AddressFormProps> = ({ register, setValue }) => {
  const [showAddressInput, setShowAddressInput] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const wrapRef = useRef<HTMLDivElement>(document.createElement('div'));

  const openPostcode = () => {
    setShowAddressInput(true);
    setOpenPopup(true);
  };

  const handleAddAddress = (data: any) => {

    setAddress(data.roadAddress);

    setValue('address', data.roadAddress);

  };

  const handleOutsideClick = (e: Event) => {
    if (!wrapRef.current?.contains(e.target as Node)) {
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    const handleMouseDown: EventListener = (e: Event) => {
      handleOutsideClick(e);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  return (
    <>
      <InputWrap>
        <InputLabel $fontType="Body04" color="white">
          주소
        </InputLabel>
        {showAddressInput && (
          <>
            <InputStyle
              placeholder={'주소'}
              type="address"
              value={address}
              readOnly
              {...register('address', { required: false })}
            />
            <InputStyle
              placeholder={'상세주소'}
              type="addressDetail"
              {...register('addressDetail', { required: false })}
            />
          </>
        )}
      </InputWrap>
      <AddressAddBtn type={ButtonType.Secondary} onClick={openPostcode}>
        <Text $fontType="Body04" color="white">
          + 주소 추가
        </Text>
      </AddressAddBtn>
      {openPopup && (
        <PostcodePopup ref={wrapRef}>
          <DaumPostcode onComplete={handleAddAddress} />
        </PostcodePopup>
      )}
    </>
  );
};

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InputLabel = styled(Text)``;
const AddressAddBtn = styled(CommonButton)``;
const PostcodePopup = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: -70px;
  width: 436px;
  height: 613px;
`;

export default AddressForm;
