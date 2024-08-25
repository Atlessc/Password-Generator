// src/algos/getDailyProductsUsed.js

import { randomizeCapitalization } from '../common/helpers';

const getDailyProductsUsed = (productsString) => {
  if (!productsString || typeof productsString !== 'string') return '';

  // Split the string into an array of product names using ";" as the separator
  const products = productsString.split(';').map(product => product.trim());

  // Validate that we have at least 1 but no more than 3 products
  if (products.length < 1 || products.length > 3) return '';

  // Function to get either the first letter or the initials of a multi-word product name
  const getInitialsOrFirstLetter = (product) => {
      const words = product.split(' ').filter(Boolean); // Split by space and remove any empty elements

      if (words.length === 1) {
          return words[0][0].toUpperCase(); // If it's a single word, return the first letter
      } else {
          // If it's a multi-word, randomly choose between the first letter of the whole name or the initials
          const useInitials = Math.random() > 0.5;
          return useInitials 
              ? words.map(word => word[0].toUpperCase()).join('') 
              : words[0][0].toUpperCase();
      }
  };

  // Extract the initials or first letter of each product
  const initials = products.map(product => getInitialsOrFirstLetter(product));

  // Combine the initials into a single string and randomize capitalization
  const result = initials.join('');
  return randomizeCapitalization(result);
};

export default getDailyProductsUsed;

