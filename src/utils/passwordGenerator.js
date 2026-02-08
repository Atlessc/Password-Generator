const PASSWORD_CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
const SPECIAL_SYMBOLS = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', '?'];

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

const firstNLetters = (input = '', count = 3) =>
  String(input).replace(/[^a-zA-Z]/g, '').slice(0, count);

const digitsOnly = (input = '') => String(input).replace(/\D/g, '');

const randomDigits = (count = 2) => {
  let value = '';
  for (let i = 0; i < count; i += 1) {
    value += Math.floor(Math.random() * 10).toString();
  }
  return value;
};

const randomChar = () => PASSWORD_CHARSET[Math.floor(Math.random() * PASSWORD_CHARSET.length)];
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const splitByComma = (input = '') =>
  String(input)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

const shuffleText = (input = '') =>
  String(input)
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

const parseNumber = (input, fallback = 0) => {
  const value = parseInt(String(input), 10);
  return Number.isNaN(value) ? fallback : value;
};

const transformByAlgo = {
  specialCharacterSelector: (input) => {
    if (Array.isArray(input) && input.length) return input.join('');
    const count = Math.floor(Math.random() * 3) + 1;
    let symbols = '';
    for (let i = 0; i < count; i += 1) {
      symbols += randomFrom(SPECIAL_SYMBOLS);
    }
    return symbols;
  },
  phraseInitials: (input) => firstLetters(input) || 'ClctT',
  bookPageDigits: (input) => digitsOnly(input).slice(0, 4) || randomDigits(3),
  threeWordSyllables: (input) => {
    const words = getWords(input).slice(0, 3);
    if (!words.length) return 'EleUmb';
    return words.map((word) => word.slice(0, 2)).join('');
  },
  significantDay: (input) => digitsOnly(input).slice(0, 2).padStart(2, '0') || '07',
  windowCount: (input) => digitsOnly(input) || '12',
  interestingWordLength: (input) => {
    const cleaned = String(input).replace(/[^a-zA-Z]/g, '');
    return cleaned ? String(cleaned.length) : '9';
  },
  streetNameTrigrams: (input) => {
    const names = splitByComma(input).slice(0, 3);
    if (!names.length) return 'MapCedOak';
    return names.map((name) => firstNLetters(name, 3)).join('');
  },
  secretSequence: (input) => String(input).replace(/\s+/g, '') || 'OnlyMe',
  bedToDoorSteps: (input) => digitsOnly(input) || '37',
  twoLanguageMix: (input) => {
    const words = splitByComma(input).slice(0, 2);
    if (words.length < 2) return 'hbaojn';
    const a = firstNLetters(words[0], 3);
    const b = firstNLetters(words[1], 3);
    return `${a[0] || ''}${b[0] || ''}${a[1] || ''}${b[1] || ''}${a[2] || ''}${b[2] || ''}`;
  },
  constantDigits: (input) => digitsOnly(input).slice(0, 6) || '314159',
  keystrokePattern: (input) => String(input).replace(/\s+/g, '') || 'qweqwe',
  albumCountTimesTwo: (input) => String(parseNumber(input, 40) * 2),
  inventedAnagram: (input) => shuffleText(String(input).replace(/\s+/g, '')) || 'nggYU',
  roomObjectCount: (input) => digitsOnly(input) || '23',
  characterPlusRandom: (input) => `${firstNLetters(input, 4) || 'Vark'}${randomDigits(2)}`,
  productiveHours: (input) => digitsOnly(input).slice(0, 2).padStart(2, '0') || '11',
  alphabetPositionCode: (input) => {
    const cleaned = firstNLetters(input, 4).toLowerCase();
    if (!cleaned) return '3154';
    return cleaned
      .split('')
      .map((char) => String(char.charCodeAt(0) - 96).padStart(2, '0'))
      .join('');
  },
  reversedEventDate: (input) => (digitsOnly(input).split('').reverse().join('') || '42010202'),
  unreadEmailCount: (input) => digitsOnly(input) || '41',
  lyricInitials: (input) => firstLetters(input) || 'WaliyS',
  bookPageCount: (input) => digitsOnly(input) || '274',
  stopwatchDigits: (input) => digitsOnly(input) || '034721',
  insideJokeAcronym: (input) => firstLetters(input) || 'PBPL',
  nonEnglishTrigram: (input) => firstNLetters(input, 3) || 'amo',
  frequentTimeCode: (input) => digitsOnly(input).slice(0, 4).padStart(4, '0') || '1111',
  keyboardPatternPlusRandom: (input) => `${String(input).replace(/\s+/g, '') || 'zxc'}${randomDigits(2)}`,
  keyCount: (input) => digitsOnly(input) || '88',
  photoNameInitials: (input) => {
    const names = splitByComma(input);
    if (!names.length) return 'ABC';
    return names
      .map((name) => firstLetters(name, 2))
      .join('');
  },
  recentStreetInitials: (input) => {
    const streets = splitByComma(input);
    if (!streets.length) return 'PLE';
    return streets.map((street) => firstLetters(street, 1)).join('');
  },
};

const generateValue = (option, input) => {
  const transformer = transformByAlgo[option.algo];
  return transformer ? transformer(input) : '';
};

export function generatePassword(options, inputs = {}, settings = {}) {
  const selected = Array.isArray(options) ? options : [];
  const parts = selected.map((option) => ({
    value: generateValue(option, inputs[option.algo] || ''),
    source: option.shortName,
  }));

  const rawPassword = parts.map((part) => part.value).join('');
  const targetLength = clamp(parseNumber(settings.length, rawPassword.length || 16), 8, 64);
  let password = rawPassword;

  while (password.length < targetLength) {
    const char = randomChar();
    password += char;
    parts.push({ value: char, source: 'Random filler' });
  }

  if (password.length > targetLength) {
    let remaining = targetLength;
    const trimmedParts = [];
    for (const part of parts) {
      if (remaining <= 0) break;
      const nextValue = part.value.slice(0, remaining);
      if (nextValue) {
        trimmedParts.push({ ...part, value: nextValue });
        remaining -= nextValue.length;
      }
    }
    return trimmedParts;
  }

  return parts;
}
