export const optionDetails = [
  {
    shortName: "Phrase Initials",
    label: "Enter a sentence or phrase, and we'll use the first letter of each word to create part of your password.",
    algo: "getPhraseInitials",
    type: "text", // This option requires a text input for the phrase
  },
  // {
  //   shortName: "Significant Day",
  //   label: "Enter a date (e.g., 'October 13th') and we'll use the day and month to create part of your password.",
  //   algo: "getSignificantDay",
  //   type: "text", // This option would require a text input for the date
  // },
  {
    shortName: "Daily Products Used",
    label: "Enter three different names of products you use daily, separated by semicolons, and we'll use the first letters of each to create part of your password.",
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
  // {
  //   shortName: "Character Name",
  //   label: "Enter the name of a character from a story you closely relate to, and we'll combine it with a random number to create part of your password.",
  //   algo: "getCharacterName",
  //   type: "text",
  // },
  // {
  //   shortName: "Reversed Date",
  //   label: "Enter a date, and we'll reverse it to create part of your password.",
  //   algo: "getReversedDate",
  //   type: "text",
  // },
  // {
  //   shortName: "Street Names",
  //   label: "Enter three street names you've passed by recently, and we'll use the first letters of each to create part of your password.",
  //   algo: "getStreetNames",
  //   type: "text", 
  // },
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
