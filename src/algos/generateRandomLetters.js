const generateRandomLetters = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  
  
  return letters[Math.floor(Math.random() * letters.length)];

};

export default generateRandomLetters;