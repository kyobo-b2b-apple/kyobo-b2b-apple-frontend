import { styled } from 'styled-components';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import Text from '../common/Text';
import React from 'react';
import { FormMode } from '../../constants/userForm';
import { useNavigate } from 'react-router-dom';

interface TermsFormProps {
  register: any;
  errors: any;
  isSubmitted: boolean;
  dirtyFields: any;
  setValue: any;
  watch: any;
  isBusiness?: boolean;
  mode?: FormMode;
}
const TERMS = [
  { id: 'all', text: '전체 이용약관에 동의합니다.', detail: true },
  { id: 'mandatory1', text: '이용약관 동의 (필수)' },
  { id: 'mandatory2', text: '개인정보 수집 및 이용동의 (필수)' },
  { id: 'optional1', text: '개인정보 제3자 제공동의 (선택)' },
  { id: 'optional2', text: '개인정보 취급위탁 동의 (선택)' },
];

const TermsForm: React.FC<TermsFormProps> = ({ mode, register, isBusiness, setValue, errors, watch, isSubmitted }) => {
  const checkedState = watch();
  const navigate = useNavigate();

  const handleChecked = (id: string) => {
    if (id === 'all') {
      const isChecked = !checkedState[id];
      TERMS.forEach((term) => {
        setValue(term.id, isChecked);
      });
    } else {
      const inputChecked = !checkedState[id];
      setValue(id, inputChecked);
      if (inputChecked) {
        const isAllChecked = TERMS.slice(1).every((term) => checkedState[term.id]);
        if (isAllChecked) {
          setValue('all', true);
        }
      } else {
        setValue('all', false);
      }
    }
  };
  const filteredTerms =
    mode === FormMode.Update ? TERMS.filter(({ id }) => id === 'optional1' || id === 'optional2') : TERMS;

  const handleDetailClick = (id: string) => {
    if (id === 'mandatory1') {
      return navigate('/terms/index');
    }
    if (id === 'mandatory2') {
      return navigate('/terms/privacy');
    }
    if (id === 'optional1') {
      return navigate('/terms/content');
    }
    if (id === 'optional2') {
      return navigate('/terms/info');
    }
  };

  return (
    <TermsFormContainer>
      <Text $fontType="Body04" color="white">
        이용약관*
      </Text>
      {filteredTerms.map(({ id, text }) => (
        <TermsWrap key={id}>
          <CheckBoxBtn
            checked={checkedState[id] || false}
            {...register(id, { required: id === 'mandatory1' || id === 'mandatory2' })}
            onChange={() => handleChecked(id)}
          />
          <Text $fontType="Body04" color="white">
            {text}
          </Text>

          {id !== 'all' && (
            <Detail onClick={() => handleDetailClick(id)}>
              <DetailText $fontType="Body05" color="grey40">
                상세보기
              </DetailText>
            </Detail>
          )}
        </TermsWrap>
      ))}
      {isSubmitted && !isBusiness && (errors?.mandatory1 || errors?.mandatory2) && (
        <Text $fontType="Caption02" color="red30">
          필수 이용약관을 체크해주세요
        </Text>
      )}
    </TermsFormContainer>
  );
};

const TermsFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;
const TermsWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Detail = styled.button`
  background-color: ${(props) => props.theme.color.bgColor};
  border: 0;
  padding: 0;
  white-space: nowrap;
`;
const DetailText = styled(Text)`
  letter-spacing: -0.14px;
  text-decoration-line: underline;
`;
export default TermsForm;
