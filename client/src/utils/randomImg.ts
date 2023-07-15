export function getRandomImageUrl(imageUrls: string[]): string {
  if (imageUrls.length === 0) {
    return ''; // 이미지 URL 배열이 비어있는 경우 빈 문자열 반환
  }

  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}
