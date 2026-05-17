export const optionDetails = [
  {
    shortName: "Phrase Initials",
    label: "Enter a sentence or phrase, and we'll use the first letter of each word to create part of your password.",
    algo: "getPhraseInitials",
    type: "text", 
  },
  {
    shortName: "Daily Products Used",
    label: "Enter a name of a product you use daily.",
    algo: "getDailyProductsUsed",
    type: "text", 
  },
  {
    shortName: "Street Name Anagram",
    label: "Enter a street names, and we'll use its anagram to create part of your password.",
    algo: "getStreetNameAnagram",
    type: "text",
  },
  {
    shortName: "Common Word Anagram",
    label: "Enter a word, and we'll create an anagram to use as part of your password.",
    algo: "getCommonWordAnagram",
    type: "text", 
  },
  {
    shortName: "Character Name",
    label: "Enter the name of a character from a story you closely relate to, and we'll combine it with a random number to create part of your password.",
    algo: "getCharacterName",
    type: "text",
  },
  {
    shortName: "Reversed year",
    label: "Enter a year thats important to you or that you remember for some reason, nothing within the last 20 years, and then We'll reverse it.",
    algo: "getReversedYear",
    type: "number",
  },
  {
    shortName: "Random Number",
    label: "Generate a random number",
    algo: "generateRandomNumbers",
    type: "number",
  },
  {
    shortName: "Special Character",
    label: "Generate a special character or enter your own.",
    algo: "generateRandomSpecialCharacters",
    type: "text", 
  },
];
