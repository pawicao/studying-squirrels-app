export const commafy = (stringArray) => {
  let result = stringArray[0];
  if (stringArray.length < 2) {
    return result;
  }
  for (let i = 1; i < stringArray.length - 1; ++i) {
    result += ', ';
    result += stringArray[i];
  }
  result += ' and ' + stringArray[stringArray.length - 1];
  return result;
};

export const roundHalf = (num) => Math.round(num * 2) / 2;
export const extractHalves = (num) => {
  let full = Math.floor(num);
  return {
    full: full,
    half: num - full === 0.5,
  };
};

export const insert = (str, index, value) =>
  str.substr(0, index) + value + str.substr(index);
