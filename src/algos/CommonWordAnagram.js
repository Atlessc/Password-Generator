import { shuffleArray } from '../common/helpers';

const getCommonWordAnagram = (word) => {
  if (!word || typeof word !== 'string') return '';

  const wordArray = word.split(''); // Convert the word into an array of characters
  const shuffledArray = shuffleArray(wordArray); // Shuffle the characters
  return shuffledArray.join(''); // Convert the array back to a string
};

export default getCommonWordAnagram;
