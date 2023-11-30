import styled from 'styled-components';
import { useState } from 'react';
import JoinSelectType from './JoinSelectType';
import JoinPersonalForm, { PersonalFormData } from './personalForm/JoinPersonalForm';
import JoinBusinessForm from './businessForm/JoinBusinessForm';
import { FormMode } from '../../constants/userForm';

enum MemberType {
  JoinSelectType = 'JoinSelectType',
  Personal = 'Personal',
  Business = 'Business',
}

const JoinMain: React.FC = () => {
  const [memberType, setMemberType] = useState<MemberType>(MemberType.JoinSelectType);
  const [personalFormData, setPersonalFormData] = useState<PersonalFormData>({});
  const [isBusiness, setIsBusiness] = useState(false);

  const handleMoveTypeSelect = (selectedType: string) => {
    if (selectedType === 'personal') {
      setMemberType(MemberType.Personal);
    } else if (selectedType === 'business') {
      setMemberType(MemberType.Personal);
      setIsBusiness(true);
    }
  };
  const handleBusinessSignupData = (data: PersonalFormData) => {
    setPersonalFormData(data);
    setMemberType(MemberType.Business);
  };

  return (
    <JoinMainContainer>
      {memberType === MemberType.JoinSelectType && <JoinSelectType onNextButtonClick={handleMoveTypeSelect} />}
      {memberType === MemberType.Personal && (
        <JoinPersonalForm
          loginId={''}
          password={''}
          name={''}
          email={''}
          phone={''}
          address={''}
          addressDetail={''}
          mandatory1={false}
          mandatory2={false}
          optional1={false}
          optional2={false}
          isBusiness={isBusiness}
          onNextButtonClick={handleBusinessSignupData}
          mode={FormMode.Join}
        />
      )}
      {memberType === MemberType.Business && <JoinBusinessForm personalFormData={personalFormData} />}
    </JoinMainContainer>
  );
};

const JoinMainContainer = styled.div`
  position: relative;
  width: 297px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  display: flex;

  flex-direction: column;
`;

export default JoinMain;
