/** 12345를 집어넣으면 "+12,345" 반환, -98765를 집어넣으면 "-98,765" 반환 */
export function numToStrWithSign(number: number): string {
  const formattedNumber = Math.abs(number).toLocaleString();
  const sign = number >= 0 ? '+' : '-';
  return `${sign}${formattedNumber}`;
}
