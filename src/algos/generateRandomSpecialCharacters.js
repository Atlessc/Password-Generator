const generateRandomSpecialCharacters = ({char = null}) => {
  if (char) {
    return char;
  } else {
    const specialCharacters = '!@#$%^&*_+-=,./?';
    const randomIndex = Math.floor(Math.random() * specialCharacters.length);
    return specialCharacters[randomIndex];
  }
};

export default generateRandomSpecialCharacters;