/** 주어진 Date 객체를 한국어 날짜 형식(n년 n월 n일 nn시:nn분)으로 변환  */
export function convertToKoreanDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0'); // 한 자릿수라면 앞에 0 추가
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 한 자릿수라면 앞에 0 추가

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  return formattedDate;
}

/** 주어진 Date 객체를 한국어 날짜 형식(n월 n일)으로 변환  */
export function convertToKoreanMonthDay(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDay = `${month}월 ${day}일`;
  return formattedDay;
}
