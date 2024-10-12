export default function limitText(text: string, limit?: number): string {
  const textLengthLimit = limit ? limit : 10;
  if (text.length > textLengthLimit) {
    return text.slice(0, limit) + "...";
  }
  return text;
}
