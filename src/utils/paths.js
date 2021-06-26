export const statusLinePath = (x1, y1, x2, y2) => {
  const control1 = []
  return `M${x1} ${y1}C${x1} ${y1} ${x1} ${y1} ${x2} ${y2}`;
};