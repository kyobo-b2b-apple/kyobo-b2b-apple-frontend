import styled from 'styled-components';
import { Text } from '../../../../components/common';
import { DeliveryStatusProps } from '../../../../interfaces/shipmentProps';
import formatDatetime from '../../../../utils/formatDatetime';

const dummyData: DeliveryStatusProps[] = [
  { id: 0, createdAt: '2023-09-06T05:27:43.402Z', currentLocation: '공덕평화점', currentState: '배송시작' },
  { id: 1, createdAt: '2023-09-07T22:15:43.402Z', currentLocation: '공덕평화점', currentState: '배송중' },
  { id: 2, createdAt: '2023-09-08T15:08:08.402Z', currentLocation: '공덕평화점', currentState: '배송완료' },
];

interface StateListProps {
  data: DeliveryStatusProps[];
}

const DeliveryStateList = ({ data }: StateListProps) => {
  const itemsToRender = data.length === 0 ? dummyData : data;
  return (
    <div>
      <ul>
        <ListHeader>
          <Text $fontType="Body04" color="white">
            처리일시
          </Text>
          <Text $fontType="Body04" color="white">
            현재위치
          </Text>
          <Text $fontType="Body04" color="white">
            배송상태
          </Text>
        </ListHeader>
        {itemsToRender.map((item) => (
          <GridItem key={item.id}>
            <Text $fontType="Body04" color="grey20">
              {formatDatetime(item.createdAt)}
            </Text>
            <Text $fontType="Body04" color="grey20">
              {item.currentLocation}
            </Text>
            <Text $fontType="Body04" color="grey20">
              {item.currentState}
            </Text>
          </GridItem>
        ))}
      </ul>
    </div>
  );
};

export default DeliveryStateList;

const GridItem = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-items: center;

  & > p {
    padding: 0.5rem;
    text-align: center;
  }
`;

const ListHeader = styled(GridItem)`
  background-color: #242424;
`;
