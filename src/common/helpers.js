/**
 * Shuffles an array in place.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} The shuffled array.
 */
export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
* Gets the initials of a multi-word string.
* @param {string} text - The input text.
* @returns {string} The initials.
*/
export const getInitials = (text) => {
  return text
      .split(' ')
      .filter(Boolean)  // Filters out any empty strings from multiple spaces
      .map(word => word[0].toUpperCase())
      .join('');
};

/**
* Cleans and processes a date string into a specific format (e.g., MMDD).
* @param {string} date - The input date string.
* @returns {string} The formatted date string.
*/
export const processDate = (date) => {
  const dateObj = new Date(date);
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${month}${day}`;
};

/**
* Processes a phrase into its initials.
* @param {string} phrase - The input phrase.
* @returns {string} The initials of the phrase.
*/
export const processPhraseInitials = (phrase) => {
  return getInitials(phrase);
};

/**
* Processes a list of daily products separated by semicolons.
* Extracts the first letter of each product, and optionally shuffles the letters.
* @param {string} productsString - The semicolon-separated string of products.
* @param {boolean} shuffle - Whether to shuffle the letters.
* @returns {string} The processed product initials.
*/
export const processDailyProducts = (productsString, shuffle = false) => {
  const products = productsString.split(';').map(product => product.trim());
  const initials = products.map(product => getInitials(product));

  return shuffle ? shuffleArray(initials).join('') : initials.join('');
};

/**
* Reverses a date string (e.g., MMDD -> DDMM).
* @param {string} date - The input date string.
* @returns {string} The reversed date string.
*/
export const reverseDate = (date) => {
  const processedDate = processDate(date);
  return processedDate.split('').reverse().join('');
};


/**
 * Randomizes the capitalization of each character in a string.
 * @param {string} str - The input string.
 * @returns {string} The string with randomized capitalization.
 */
export const randomizeCapitalization = (str) => {
  return str.split('').map(char => {
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  }).join('');
};


/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalize = (str) => {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
