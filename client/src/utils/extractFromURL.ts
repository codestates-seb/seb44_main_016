export default function extractValueFromUrl(url: string, nickname: string) {
  if (!url || !nickname) {
    return null;
  }

  const startIndex = url.indexOf(nickname);
  if (startIndex === -1) {
    return null;
  }
  const extractedValue = url.substring(startIndex + nickname.length);
  return extractedValue;
}
