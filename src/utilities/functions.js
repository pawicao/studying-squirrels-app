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

export const partition = (array, filter) => {
  let pass = [];
  let fail = [];
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e));
  return [pass, fail];
};

export const groupBy = (arr, property) => {
  return arr.reduce((acc, cur) => {
    acc[cur[property]] = [...(acc[cur[property]] || []), cur];
    return acc;
  }, {});
};

export const tripleGroupBy = (arr, property1, property2, property3) => {
  return arr.reduce((acc, cur) => {
    acc[cur[property1][property2][property3]] = [
      ...(acc[cur[property1][property2][property3]] || []),
      cur,
    ];
    return acc;
  }, {});
};

export const quadrupleGroupBy = (
  arr,
  property1,
  property2,
  property3,
  property4,
) => {
  return arr.reduce((acc, cur) => {
    acc[cur[property1][property2][property3][property4]] = [
      ...(acc[cur[property1][property2][property3][property4]] || []),
      cur,
    ];
    return acc;
  }, {});
};

const countDecimals = (value) => {
  if (Math.floor(value) == value) {
    return 0;
  }
  let separator = value.includes(',') ? ',' : '.';
  return value.toString().split(separator)[1].length || 0;
};
export const isPrice = (valueToAdd) => {
  return !(
    valueToAdd.includes('-') ||
    valueToAdd.includes(' ') ||
    valueToAdd === '.' ||
    valueToAdd === ',' ||
    countDecimals(valueToAdd) > 2
  );
};
