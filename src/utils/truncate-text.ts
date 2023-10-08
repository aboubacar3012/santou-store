export const truncateText = (text: string, count: number = 30) => {
  if (text.length > count) {
    text = text.substring(0, count) + '...';
  }
  return text;
};
