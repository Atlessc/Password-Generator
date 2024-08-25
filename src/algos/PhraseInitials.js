import { randomizeCapitalization } from '../common/helpers';

const getPhraseInitials = (phrase) => {
  if (!phrase || typeof phrase !== 'string') return '';
  return phrase
    .split(' ')
    .map(word => randomizeCapitalization(word[0])) // Capitalizes the first letter of each word
    .join('');
};

export default getPhraseInitials;
