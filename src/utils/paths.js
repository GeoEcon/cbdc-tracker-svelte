export const statusLinePath = (x1, y1, x2, y2) => {
  const cX1 = x1;
  const cY1 = y1 + Math.abs(y1 - y2) / 2;
  const cX2 = x2
  const cY2 = cY1;
  return `M${x1} ${y1}C${cX1} ${cY1} ${cX2} ${cY2} ${x2} ${y2}`;
};