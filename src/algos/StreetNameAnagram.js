const getStreetNameAnagram = (streetName) => {
  
  const processedStreetName = streetName
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/([a-z])([a-z]*)/g, '$1$2');

    const anagram = processedStreetName
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return anagram;

};

export default getStreetNameAnagram;