const PASSWORD_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
const SPECIAL_SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '?'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getWords = (input = '') =>
  String(input)
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const firstLetters = (input = '', maxWords = Infinity) =>
  getWords(input)
    .slice(0, maxWords)
    .map((word) => word[0])
    .join('');

const firstNLetters = (input = '', count = 3) => String(input).replace(/[^a-zA-Z]/g, '').slice(0, count);
const digitsOnly = (input = '') => String(input).replace(/\D/g, '');
const alphaNumOnly = (input = '') => String(input).replace(/[^a-zA-Z0-9]/g, '');
const randomChar = () => PASSWORD_CHARSET[Math.floor(Math.random() * PASSWORD_CHARSET.length)];
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const parseNumber = (input, fallback = 0) => {
  const value = parseInt(String(input), 10);
  return Number.isNaN(value) ? fallback : value;
};

const randomizeCase = (value = '') =>
  value
    .split('')
    .map((char) => {
      if (!/[a-z]/i.test(char)) return char;
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    })
    .join('');

const capitalizeFirstAlpha = (value = '') => {
  const lower = value.toLowerCase();
  const chars = lower.split('');
  const index = chars.findIndex((char) => /[a-z]/i.test(char));
  if (index === -1) return value;
  chars[index] = chars[index].toUpperCase();
  return chars.join('');
};

const applyCapitalization = (value, mode) => {
  if (!/[a-z]/i.test(value)) return value;
  if (mode === 'random') return randomizeCase(value);
  return capitalizeFirstAlpha(value);
};

const randomSpecialSymbols = () => {
  const count = Math.floor(Math.random() * 3) + 1;
  let symbols = '';
  for (let i = 0; i < count; i += 1) symbols += randomFrom(SPECIAL_SYMBOLS);
  return symbols;
};

const formatSpecialDate = (input) => {
  const dateValue = input?.date;
  if (!dateValue) return '';

  const format = input?.format || 'digits';
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return '';

  const month = parsed.getMonth() + 1;
  const day = parsed.getDate();
  const year = String(parsed.getFullYear()).slice(-2);

  if (format === 'monthText') {
    return `${MONTHS_SHORT[parsed.getMonth()]}${day}${year}`;
  }

  return `${month}${day}${year}`;
};

const songNameToPasswordPart = (input = '') => {
  const words = getWords(input);
  if (!words.length) return '';

  if (words.length <= 2) {
    return words.map((word) => alphaNumOnly(word)).filter(Boolean).join('');
  }

  return words
    .map((word) => alphaNumOnly(word))
    .filter(Boolean)
    .map((word) => word[0])
    .join('');
};

const joinWordsOrUseInitials = (input = '', maxWordsBeforeInitials = 2) => {
  const words = getWords(input).map((word) => alphaNumOnly(word)).filter(Boolean);
  if (!words.length) return '';

  if (words.length <= maxWordsBeforeInitials) {
    return words.join('');
  }

  return words.map((word) => word[0]).join('');
};

const firstNOfEachWord = (input = '', countPerWord = 3, maxWords = 2) => {
  const words = getWords(input).map((word) => alphaNumOnly(word)).filter(Boolean).slice(0, maxWords);
  if (!words.length) return '';

  return words.map((word) => word.slice(0, countPerWord)).join('');
};

const formatMonthYear = (input = '') => {
  const match = String(input).match(/^(\d{4})-(\d{2})$/);
  if (!match) return '';

  const [, year, month] = match;
  return `${month}${year.slice(-2)}`;
};

const parseYearWithReverseToggle = (input = '') => {
  const rawValue = typeof input === 'object' ? input?.value : input;
  const reverse = typeof input === 'object' ? Boolean(input?.reverse) : false;
  const year = digitsOnly(rawValue).slice(0, 4);

  if (year.length < 4) return '';
  return reverse ? year.split('').reverse().join('') : year;
};

const parseAnniversaryMmdd = (input = '') => {
  const rawValue = typeof input === 'object' ? input?.value : input;
  const reverse = typeof input === 'object' ? Boolean(input?.reverse) : false;
  const digits = digitsOnly(rawValue).slice(0, 4);

  if (digits.length < 4) return '';

  const month = Number(digits.slice(0, 2));
  const day = Number(digits.slice(2, 4));
  if (month < 1 || month > 12 || day < 1 || day > 31) return '';

  return reverse ? `${digits.slice(2, 4)}${digits.slice(0, 2)}` : digits;
};

const seasonKeywordCode = (input = '') => {
  const normalized = alphaNumOnly(String(input).toLowerCase());
  if (!normalized) return '';

  const knownSeasonCodes = {
    spring: 'sp',
    summer: 'su',
    autumn: 'au',
    fall: 'fa',
    winter: 'wi',
  };

  return knownSeasonCodes[normalized] || normalized.slice(0, 3);
};

const transformByAlgo = {
  specialCharacterSelector: (input) => {
    if (Array.isArray(input) && input.length) return input.join('');
    return randomSpecialSymbols();
  },
  phraseInitials: (input) => firstLetters(input),
  yourNameInitials: (input) => firstLetters(input, 2),
  streetLivedBefore: (input) => firstNLetters(input, 4),
  reversedSpecialEventYear: (input) => {
    const year = digitsOnly(input).slice(0, 4);
    if (!year) return '';
    return year.split('').reverse().join('');
  },
  childBirthYear: (input) => parseYearWithReverseToggle(input),
  closePersonInitials: (input) => firstLetters(input),
  childNameInitials: (input) => firstLetters(input, 2),
  famousPersonInitials: (input) => firstLetters(input),
  partnerNameInitials: (input) => firstLetters(input, 2),
  specialDate: (input) => formatSpecialDate(input),
  anniversaryMmdd: (input) => parseAnniversaryMmdd(input),
  constantDigits: (input) => digitsOnly(input).slice(0, 8),
  lyricInitials: (input) => songNameToPasswordPart(input),
  goToFavoriteDish: (input) => joinWordsOrUseInitials(input, 2),
  favoriteBookTitle: (input) => joinWordsOrUseInitials(input, 2),
  goToFavoriteBreakfastDish: (input) => joinWordsOrUseInitials(input, 2),
  memorablePlaceCode: (input) => firstNOfEachWord(input, 3, 2),
  petNicknameCode: (input) => alphaNumOnly(input).slice(0, 8),
  personalAcronym: (input) => firstLetters(input),
  milestoneMonthYear: (input) => formatMonthYear(input),
  favoriteMovieTitle: (input) => joinWordsOrUseInitials(input, 2),
  childhoodFriendInitials: (input) => firstLetters(input),
  hometownZipTail: (input) => {
    const value = digitsOnly(input).slice(0, 5);
    if (value.length < 5) return '';
    return value;
  },
  favoriteTeamAbbrev: (input) => joinWordsOrUseInitials(input, 2),
  firstConcertYear: (input) => digitsOnly(input).slice(0, 4),
  partnerBirthYear: (input) => parseYearWithReverseToggle(input),
  memorableStreetNumber: (input) => digitsOnly(input).slice(0, 4),
  travelCityPair: (input) => joinWordsOrUseInitials(input, 2),
  seasonCode: (input) => seasonKeywordCode(input),
  frequentAppName: (input) => joinWordsOrUseInitials(input, 2),
  kitchenItemPair: (input) => joinWordsOrUseInitials(input, 2),
};

const generateValue = (option, input, settings) => {
  const transformer = transformByAlgo[option.algo];
  const rawValue = transformer ? transformer(input) : '';

  if (option.algo === 'specialCharacterSelector') return rawValue;
  return applyCapitalization(rawValue, settings.capitalizationMode || 'first');
};

export function generatePassword(options, inputs = {}, settings = {}) {
  const selected = Array.isArray(options) ? options : [];
  const shuffledSelected = shuffleArray(selected);

  const parts = shuffledSelected
    .map((option) => ({
      value: generateValue(option, inputs[option.algo], settings),
      source: option.shortName,
    }))
    .filter((part) => part.value.length > 0);

  if (!parts.length) return [];

  const rawPassword = parts.map((part) => part.value).join('');
  const targetLength = clamp(
    parseNumber(settings.minLength ?? settings.length, rawPassword.length || 16),
    8,
    64,
  );
  let password = rawPassword;

  while (password.length < targetLength) {
    const char = randomChar();
    password += char;
    parts.push({ value: char, source: 'Random filler' });
  }

  return parts;
}
