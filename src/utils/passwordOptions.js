const basePasswordOptions = [
  {
    shortName: 'Special Characters',
    label: 'Pick one or more symbols. If none are selected, 1-3 random symbols are used.',
    explanation: 'Use this to guarantee symbol coverage. You can select any number of symbols, or leave it blank for random symbols.',
    algo: 'specialCharacterSelector',
    type: 'symbol-multi',
    symbols: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '?'],
  },
  {
    shortName: 'Phrase Initials',
    label: 'Enter a phrase and use the first letter from each word.',
    explanation: 'Example: "Cats love climbing tall trees" becomes "ClctT".',
    algo: 'phraseInitials',
    type: 'text',
    placeholder: 'Cats love climbing tall trees',
  },
  {
    shortName: 'Your Name',
    label: 'Enter your first and last name.',
    explanation: 'Adds only your initials. Example: "Taylor Smith" -> "ts".',
    algo: 'yourNameInitials',
    type: 'text',
    placeholder: 'Taylor Smith',
  },
  {
    shortName: 'Street You Lived On Before',
    label: 'Enter a previous street name.',
    explanation: 'We extract a short stable segment from a street you remember well.',
    algo: 'streetLivedBefore',
    type: 'text',
    placeholder: 'Maple Street',
  },
  {
    shortName: 'Reversed Year of a Special Event',
    label: 'Enter a year tied to an important event.',
    explanation: 'Example: "2018" becomes "8102".',
    algo: 'reversedSpecialEventYear',
    type: 'number',
    placeholder: '2018',
  },
  {
    shortName: "Child's Birth Year",
    label: "Enter your child's birth year.",
    explanation: 'Enter a 4-digit year. You can toggle reverse mode.',
    algo: 'childBirthYear',
    type: 'year-toggle',
    placeholder: '1996',
    reverseLabel: 'Reverse year',
  },
  {
    shortName: 'Close Person Initials',
    label: 'Enter the name of a close person.',
    explanation: 'We use first letters of each word in the name.',
    algo: 'closePersonInitials',
    type: 'text',
    placeholder: 'Alex Marie Johnson',
  },
  {
    shortName: "Child's Name",
    label: "Enter your child's first and last name.",
    explanation: 'Adds only initials. Example: "Ava Johnson" -> "aj".',
    algo: 'childNameInitials',
    type: 'text',
    placeholder: 'Ava Johnson',
  },
  {
    shortName: 'Famous Person Initials',
    label: 'Enter a famous person name.',
    explanation: 'We use first letters of each word in the name.',
    algo: 'famousPersonInitials',
    type: 'text',
    placeholder: 'Taylor Swift',
  },
  {
    shortName: "Partner's Name",
    label: "Enter your partner's first and last name.",
    explanation: 'Adds only initials. Example: "Jordan Smith" -> "js".',
    algo: 'partnerNameInitials',
    type: 'text',
    placeholder: 'Jordan Smith',
  },
  {
    shortName: 'Special Date',
    label: 'Pick a special date and choose output format.',
    explanation: 'Format A: 01/15/25 -> 11525. Format B: Jan1525.',
    algo: 'specialDate',
    type: 'special-date',
  },
  {
    shortName: 'Anniversary MMDD',
    label: 'Enter your anniversary in MM-DD format.',
    explanation: 'Example: "04-12" -> "0412". Optional toggle reverses to "1204".',
    algo: 'anniversaryMmdd',
    type: 'mmdd-toggle',
    placeholder: '04-12',
    reverseLabel: 'Reverse MMDD',
  },
  {
    shortName: 'Constant Digits',
    label: 'Enter digits from a meaningful constant or ratio.',
    explanation: 'Adds compact numeric complexity from a memorable sequence.',
    algo: 'constantDigits',
    type: 'text',
    placeholder: '314159',
  },
  {
    shortName: 'Song Name',
    label: 'Enter a song name. One or two words are used directly; longer names use initials.',
    explanation: 'Examples: "Numb" -> "Numb", "Bohemian Rhapsody" -> "BohemianRhapsody", "Stairway to Heaven" -> "sth".',
    algo: 'lyricInitials',
    type: 'text',
    placeholder: 'Stairway to Heaven',
  },
  {
    shortName: 'Go-To Favorite Dish',
    label: 'Enter your go-to favorite dish.',
    explanation: '1-2 words stay whole; 3+ words become initials.',
    algo: 'goToFavoriteDish',
    type: 'text',
    placeholder: 'Fetticinni alfredo',
  },
  {
    shortName: 'Favorite Book Title',
    label: 'Enter a book title. One or two words stay whole; longer titles use initials.',
    explanation: 'Examples: "Dune" -> "Dune", "Project Hail Mary" -> "phm".',
    algo: 'favoriteBookTitle',
    type: 'text',
    placeholder: 'Project Hail Mary',
  },
  {
    shortName: 'Go-To Favorite Breakfast Dish',
    label: 'Enter your go-to favorite breakfast dish.',
    explanation: '1-2 words stay whole; 3+ words become initials.',
    algo: 'goToFavoriteBreakfastDish',
    type: 'text',
    placeholder: 'Fetticinni alfredo',
  },
  {
    shortName: 'Memorable Place Code',
    label: 'Enter a memorable place (city, landmark, neighborhood).',
    explanation: 'Uses the first 3 letters of each word for a compact location code.',
    algo: 'memorablePlaceCode',
    type: 'text',
    placeholder: 'Golden Gate',
  },
  {
    shortName: 'Pet Nickname',
    label: 'Enter a pet name or nickname.',
    explanation: 'Keeps up to 8 letters/numbers from the nickname.',
    algo: 'petNicknameCode',
    type: 'text',
    placeholder: 'Mochi',
  },
  {
    shortName: 'Personal Acronym',
    label: 'Enter a private phrase or inside-joke sentence.',
    explanation: 'Uses first letters from each word to make an acronym-style segment.',
    algo: 'personalAcronym',
    type: 'text',
    placeholder: 'best coffee before coding',
  },
  {
    shortName: 'Milestone Month-Year',
    label: 'Pick a month/year tied to a personal milestone.',
    explanation: 'Converts YYYY-MM into MMYY.',
    algo: 'milestoneMonthYear',
    type: 'month',
  },
  {
    shortName: 'Familiar Number Tail',
    label: 'Enter a familiar long number and use its tail digits.',
    explanation: 'Takes the last 6 digits from what you enter.',
    algo: 'familiarNumberTail',
    type: 'text',
    placeholder: '8675309123',
  },
  {
    shortName: 'Movie Title',
    label: 'Enter a movie title you remember well.',
    explanation: '1-2 words stay whole; 3+ words become initials. Example: "The Dark Knight" -> "tdk".',
    algo: 'favoriteMovieTitle',
    type: 'text',
    placeholder: 'The Dark Knight',
  },
  {
    shortName: 'Childhood Friend Name',
    label: 'Enter the full name of a childhood friend.',
    explanation: 'Uses initials from each name part. Example: "Jamie Lee Parker" -> "jlp".',
    algo: 'childhoodFriendInitials',
    type: 'text',
    placeholder: 'Jamie Lee Parker',
  },
  {
    shortName: 'Hometown ZIP Code',
    label: 'Enter your normal 5-digit hometown ZIP code.',
    explanation: 'Uses exactly the 5 digits you enter. Example: "90210" -> "90210".',
    algo: 'hometownZipTail',
    type: 'text',
    placeholder: '90210',
  },
  {
    shortName: 'Favorite Team Name',
    label: 'Enter a favorite team name.',
    explanation: '1-2 words stay whole; 3+ words become initials.',
    algo: 'favoriteTeamAbbrev',
    type: 'text',
    placeholder: 'Golden State',
  },
  {
    shortName: 'First Concert Year',
    label: 'Enter the year of your first concert.',
    explanation: 'Uses up to 4 digits of that year.',
    algo: 'firstConcertYear',
    type: 'number',
    placeholder: '2011',
  },
  {
    shortName: "Partner's Birth Year",
    label: "Enter your partner's birth year.",
    explanation: 'Enter a 4-digit year. You can toggle reverse mode.',
    algo: 'partnerBirthYear',
    type: 'year-toggle',
    placeholder: '1996',
    reverseLabel: 'Reverse year',
  },
  {
    shortName: 'Street/House Number',
    label: 'Enter a memorable street or house number.',
    explanation: 'Uses up to 4 digits from what you enter.',
    algo: 'memorableStreetNumber',
    type: 'number',
    placeholder: '1428',
  },
  {
    shortName: 'Travel City Names',
    label: 'Enter one or two city names you remember.',
    explanation: '1-2 words stay whole; 3+ words become initials.',
    algo: 'travelCityPair',
    type: 'text',
    placeholder: 'Boston Seattle',
  },
  {
    shortName: 'Favorite Season',
    label: 'Enter a season (spring, summer, autumn/fall, winter).',
    explanation: 'Common seasons map to short codes: spring->sp, summer->su, autumn->au, fall->fa, winter->wi.',
    algo: 'seasonCode',
    type: 'text',
    placeholder: 'autumn',
  },
  {
    shortName: 'App Name',
    label: 'Enter an app name you use often.',
    explanation: '1-2 words stay whole; 3+ words become initials.',
    algo: 'frequentAppName',
    type: 'text',
    placeholder: 'Google Maps',
  },
  {
    shortName: 'Kitchen Item Names',
    label: 'Enter one or two kitchen item names.',
    explanation: '1-2 words stay whole; 3+ words become initials.',
    algo: 'kitchenItemPair',
    type: 'text',
    placeholder: 'Coffee Grinder',
  },
];

const optionRandomMetaByAlgo = {
  phraseInitials: { avgCharLength: 5, containsNumbers: false },
  yourNameInitials: { avgCharLength: 2, containsNumbers: false },
  streetLivedBefore: { avgCharLength: 4, containsNumbers: false },
  reversedSpecialEventYear: { avgCharLength: 4, containsNumbers: true },
  childBirthYear: { avgCharLength: 4, containsNumbers: true },
  closePersonInitials: { avgCharLength: 3, containsNumbers: false },
  childNameInitials: { avgCharLength: 2, containsNumbers: false },
  famousPersonInitials: { avgCharLength: 2, containsNumbers: false },
  partnerNameInitials: { avgCharLength: 2, containsNumbers: false },
  specialDate: { avgCharLength: 5, containsNumbers: true },
  anniversaryMmdd: { avgCharLength: 4, containsNumbers: true },
  constantDigits: { avgCharLength: 6, containsNumbers: true },
  lyricInitials: { avgCharLength: 4, containsNumbers: false },
  goToFavoriteDish: { avgCharLength: 6, containsNumbers: false },
  favoriteBookTitle: { avgCharLength: 5, containsNumbers: false },
  goToFavoriteBreakfastDish: { avgCharLength: 6, containsNumbers: false },
  memorablePlaceCode: { avgCharLength: 6, containsNumbers: false },
  petNicknameCode: { avgCharLength: 5, containsNumbers: false },
  personalAcronym: { avgCharLength: 4, containsNumbers: false },
  milestoneMonthYear: { avgCharLength: 4, containsNumbers: true },
  familiarNumberTail: { avgCharLength: 6, containsNumbers: true },
  favoriteMovieTitle: { avgCharLength: 5, containsNumbers: false },
  childhoodFriendInitials: { avgCharLength: 3, containsNumbers: false },
  hometownZipTail: { avgCharLength: 5, containsNumbers: true },
  favoriteTeamAbbrev: { avgCharLength: 4, containsNumbers: false },
  firstConcertYear: { avgCharLength: 4, containsNumbers: true },
  partnerBirthYear: { avgCharLength: 4, containsNumbers: true },
  memorableStreetNumber: { avgCharLength: 4, containsNumbers: true },
  travelCityPair: { avgCharLength: 6, containsNumbers: false },
  seasonCode: { avgCharLength: 2, containsNumbers: false },
  frequentAppName: { avgCharLength: 6, containsNumbers: false },
  kitchenItemPair: { avgCharLength: 6, containsNumbers: false },
};

const inferRandomMeta = (option) => {
  if (option.type === 'symbol-multi') {
    return { avgCharLength: 2, containsNumbers: false };
  }

  if (option.type === 'number' || option.type === 'year-toggle' || option.type === 'mmdd-toggle') {
    return { avgCharLength: 4, containsNumbers: true };
  }

  if (option.type === 'month') {
    return { avgCharLength: 4, containsNumbers: true };
  }

  if (option.type === 'special-date') {
    return { avgCharLength: 5, containsNumbers: true };
  }

  return { avgCharLength: 4, containsNumbers: false };
};

const attachRandomMeta = (option) => {
  const inferred = inferRandomMeta(option);
  const overrides = optionRandomMetaByAlgo[option.algo] || {};
  const avgCharLength = Math.max(1, Number(overrides.avgCharLength ?? inferred.avgCharLength) || inferred.avgCharLength);
  const containsNumbers = Boolean(overrides.containsNumbers ?? inferred.containsNumbers);
  const selectionWeight = Number((1 / avgCharLength).toFixed(4));

  return {
    ...option,
    avgCharLength,
    containsNumbers,
    selectionWeight,
  };
};

export const passwordOptions = basePasswordOptions.map(attachRandomMeta);
