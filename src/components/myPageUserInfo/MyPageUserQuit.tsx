import TextBox from '../common/TextBox';
import CommonButton, { ButtonType } from '../common/Button';
import SelectDropDown from '../common/SelectDropDown';
import TextArea from '../common/TextArea';
import { InputStyle } from '../common/Input';
import { Spacer, Text } from '../common';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import styled from 'styled-components';
import { useState, useRef } from 'react';

const QuitForm = () => {
  const info = [
    '﹒회원 탈퇴 후 재가입은 7일 이후에 가능합니다.',
    '﹒탈퇴 시 보유하고 계신 적립금 및 할인 쿠폰은 자동으로 소멸되며 재가입시에도 회원정보가 복원되지 않습니다.',
    '﹒각종 게시판의 게시글 등의 데이터는 삭제되지 않습니다. 반드시 탈퇴 전 직접 삭제하셔야 합니다.',
    // eslint-disable-next-line quotes
    `﹒회원 탈퇴 시 회원님의 정보는 '소비자 보호에 관한 법률'에 의거하여 아래 기간 동안 보관됩니다.`,
    '- 계약 또는 청약 철회 등에 관한 기록:5년',
    '- 대금 결제 및 재화 등의 공급에 관한 기록:5년',
    '- 소비자의 불만 또는 분쟁 처리에 관한 기록:3년',
  ];

  const quitReason = [
    '단순변심',
    '고객서비스(상담,포장 등) 불만',
    '배송불만',
    '교환/환불/반품 불만',
    '방문빈도가 낮음',
    '상품가격 불만',
    '개인 정보 유출 우려',
    '쇼핑몰의 신뢰도 불만',
  ];

  const [quit, setQuit] = useState<string>('');
  const handleQuitTitle = (title: string) => {
    setQuit(title);
  };
  const quitRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <TextBox width="100%" height="fit" bgColor="grey80">
        <Text $fontType="Body04" color="grey20">
          [KIKO MALL 회원탈퇴 안내사항]
        </Text>
        <Spacer height={'12px'} />
        {info.map((e) => (
          <Text $fontType="Body05" color="grey20" key={e} lineHeight="21.3px">
            {e}
          </Text>
        ))}
      </TextBox>
      <Spacer height={'10px'} />
      <CheckBoxContainter>
        <CheckBoxBtn />
        <Text $fontType="Body05" color="white">
          안내 사항을 모두 확인했으며, 이에 동의합니다.
        </Text>
      </CheckBoxContainter>
      <Spacer height={'21px'} />
      <QuitInputContainer>
        <div>
          <Text $fontType="H3" color="white">
            이름
          </Text>
          <Spacer height={'10px'} />
          <InputStyle placeholder="김애플" />
        </div>
        <div>
          <Text $fontType="H3" color="white">
            아이디
          </Text>
          <Spacer height={'10px'} />
          <InputStyle placeholder="applebusiness123" />
        </div>
        <div>
          <Text $fontType="H3" color="white">
            탈퇴 사유(필수)
          </Text>
          <Spacer height={'10px'} />
          <SelectDropDown menuItems={quitReason} setTitle={handleQuitTitle} selectTitle="탈퇴 사유 선택" />
        </div>
        <div>
          <Text $fontType="H3" color="white">
            탈퇴 사유(필수)
          </Text>
          <Spacer height={'10px'} />
          <TextArea
            name="quit"
            width="100%"
            height="162px"
            padding="13px"
            placeholder="상세 사유를 입력해주세요(300자)"
            maxLength={300}
            background-color="grey90"
            ref={quitRef}
          />
        </div>
        <CommonButton type={ButtonType.Primary} onClick={() => {}}>
          확인
        </CommonButton>
      </QuitInputContainer>
    </>
  );
};

export default QuitForm;

const CheckBoxContainter = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const QuitInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
  margin-bottom: 98px;
`;
