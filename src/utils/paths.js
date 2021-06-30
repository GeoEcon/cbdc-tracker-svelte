export const statusLinePath = (x1, y1, x2, y2) => {
  const cX1 = x1;
  const cY1 = y1 + Math.abs(y1 - y2) / 2;
  const cX2 = x2
  const cY2 = cY1;
  return `M${x1} ${y1}C${cX1} ${cY1} ${cX2} ${cY2} ${x2} ${y2}`;
};

export const tagConnectorPath = (x1, y1, x2, y2) => {
  const cX1 = x1 + (x2 - x1) / 2;
  const cY1 = y1;
  const cX2 = cX1;
  const cY2 = y2;
  return `M${x1} ${y1}C${cX1} ${cY1} ${cX2} ${cY2} ${x2} ${y2}`;
};

export const tagLabelPath = (x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, cornerRadius) => {
  const cX2 = x2 + (x3 - x2) / 2;
  const cY2 = y2;
  const cX3 = cX2;
  const cY3 = y3;
  const cX6 = x6 + (x2 - x6) / 2;
  const cY6 = y6;
  const cX7 = cX6;
  const cY7 = y2;
  return `
    M${x2} ${y2}
    C${cX2} ${cY2} ${cX3} ${cY3} ${x3} ${y3}
    H${x4 - cornerRadius}
    Q${x4} ${y4} ${x4} ${y4 + Math.abs(cornerRadius)}
    V${y5 - Math.abs(cornerRadius)}
    Q${x5} ${y5} ${x5 - cornerRadius} ${y5}
    H${x6}
    C${cX6} ${cY6} ${cX7} ${cY7} ${x2} ${y2}
  `;
};