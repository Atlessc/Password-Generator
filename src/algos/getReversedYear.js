const getReversedYear = (year) => {
  const reversedYear = year.split("").reverse().join("");
  return reversedYear;
}

export default getReversedYear;