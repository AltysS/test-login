const compareNames = (arr, inputName, countries) => {
  const lowerInputName = inputName.toLowerCase();
  if (!inputName) {
    return countries;
  }
  return arr.filter(({ name }) => {
    const lowerItemName = name.toLowerCase();
    return lowerItemName.includes(lowerInputName);
  });
};

export default compareNames;
