const isValueSelected = (value, array) => {
  return array.some((item) => item.name === value);
};

export default isValueSelected;
