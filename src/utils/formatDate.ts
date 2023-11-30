const formatDate = (dateArray: number[]): string => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];
  const date = new Date(year, month - 1, day);
  const dayOfWeek = weekdays[date.getDay()];

  return `${year}.${month}.${day} (${dayOfWeek})`;
};
export default formatDate;
