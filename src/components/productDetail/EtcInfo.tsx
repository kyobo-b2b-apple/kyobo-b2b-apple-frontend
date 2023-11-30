import { styled } from 'styled-components';
import { Text } from '../common';

interface InfoTxt {
  id: number;
  text: string;
  content: string;
}
const infoTxts: InfoTxt[] = [
  {
    id: 1,
    text: '배송안내',
    content: `
- 무료 배송 : 3만원 이상 구매 시 무료 배송
- 배송 기간 : 2~4일 (주말/공휴일 제외)
- 평일 낮 12시 이전 주문건에 한해 당일 출고 됩니다.
- 제주도 및 도서산간 지역은 추가 운임비가 발생합니다. (추가 운임비 입금 확인 후 발송 가능합니다.)
  `,
  },
  {
    id: 2,
    text: '교환 및 반품안내',
    content: `
- 구입일로부터 14일 이내 정상 사용 상태에서 발생한 기능 및 성능 하자의 경우 아래 조건에 따라 제품 교환 또는 반품이 가능합니다.
- Apple 제품문제 발생 시에는 Apple 서비스 센터에서 선 진단이 필요합니다 (애플 기술지원 센터 : 080-333-4000)
- 미개봉 제품의 교환 및 환불은 구입일로부터 14일 이내 가능합니다.
- 개봉된 제품은 교환 및 환불이 불가능합니다. (겉박스만 개봉 시에도 불가)
- 결제 수단 변경은 7일 이내 가능합니다.

· 교환 및 반품이 가능한 경우
구현성의 명확한 장애 및 초기 불량일 때 구매일로부터 14일 이내 교환 또는 반품 가능.
ex. 전원이 안 들어오는 경우, 터치가 안 되는 경우, 키보드가 안 눌러지는 경우, 충전이 안 되는 경우 등)

· 교환 및 반품이 불가능한 경우
스크래치, 찍힘, 파손, 균열, 침수, 먼지, 케이스 벌어짐 등 외관상의 문제.
  `,
  },
];

const EtcInfo = () => {
  return (
    <EtcInfoContainer>
      {infoTxts.map((txt) => (
        <InfoWrap key={txt.id}>
          <Text $fontType="H0" color="white">
            {txt.text}
          </Text>
          <Text $fontType="Body02" color="white">
            {txt.content}
          </Text>
        </InfoWrap>
      ))}
    </EtcInfoContainer>
  );
};

const EtcInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  white-space: pre-wrap;
`;

export default EtcInfo;
