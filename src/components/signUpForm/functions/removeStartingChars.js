const removeStartingChars = (phoneValue, countryCode) => {
  if (phoneValue.startsWith(countryCode)) {
    return phoneValue.substring(countryCode.length);
  }
  return "";
};

export default removeStartingChars;
