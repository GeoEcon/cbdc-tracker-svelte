// export const baseUrl = 'https://www.atlanticcouncil.org/blogs/econographics/the-rise-of-central-bank-digital-currencies';
export const baseUrl = 'http://localhost:5000';

export const filtersToHex = (arr) => {
  const hex = arr
    .map((d) => binaryToHex(d.map((d) => +d.selected).join('')))
    .join('&');
  return hex;
};

export const filtersToBin = (arr) => {
  const bin = arr.map((d) => (d ? 1 : 0)).join('');
  return bin;
};

export const binaryToHex = (binary) =>
  parseInt(binary, 2).toString(16).toLowerCase();

export const hexToBinary = (hex) => parseInt(hex, 16).toString(2);

export const binaryToBool = (binary) =>
  binary.split('').map((d) => (d === '0' ? false : true));

export const urlFromFilters = (
  status,
  useCase,
  architecture,
  infrastructure,
  access,
  id
) => {
  const params = {
    f: filtersToHex([
      status,
      useCase,
      architecture,
      infrastructure,
      access,
      modal
    ]),
    id
  };

  return `${baseUrl}/#${params.f}&${params.id}`;
};

export const parseUrl = (hash) => {
  const s = hash.substring(1);
  const [
    status,
    useCase,
    architecture,
    infrastructure,
    access,
    id
  ] = s.split('&');

  return {
    status: binaryToBool(hexToBinary(status)),
    useCase: binaryToBool(hexToBinary(useCase)),
    architecture: binaryToBool(hexToBinary(architecture)),
    infrastructure: binaryToBool(hexToBinary(infrastructure)),
    access: binaryToBool(hexToBinary(access)),
    id
  };
};
