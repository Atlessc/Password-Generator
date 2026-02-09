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
const randomChar = () => PASSWORD_CHARSET[Math.floor(Math.random() * PASSWORD_CHARSET.length)];
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

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
  if (!dateValue) return 'Jan1525';

  const format = input?.format || 'digits';
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return 'Jan1525';

  const month = parsed.getMonth() + 1;
  const day = parsed.getDate();
  const year = String(parsed.getFullYear()).slice(-2);

  if (format === 'monthText') {
    return `${MONTHS_SHORT[parsed.getMonth()]}${day}${year}`;
  }

  return `${month}${day}${year}`;
};

const transformByAlgo = {
  specialCharacterSelector: (input) => {
    if (Array.isArray(input) && input.length) return input.join('');
    return randomSpecialSymbols();
  },
  phraseInitials: (input) => firstLetters(input) || 'ClctT',
  streetLivedBefore: (input) => firstNLetters(input, 4) || 'Mapl',
  reversedSpecialEventYear: (input) => {
    const year = digitsOnly(input).slice(0, 4);
    return (year || '2018').split('').reverse().join('');
  },
  closePersonInitials: (input) => firstLetters(input) || 'Amj',
  famousPersonInitials: (input) => firstLetters(input) || 'Ts',
  specialDate: (input) => formatSpecialDate(input),
  significantDay: (input) => digitsOnly(input).slice(0, 2).padStart(2, '0') || '07',
  constantDigits: (input) => digitsOnly(input).slice(0, 8) || '31415926',
  lyricInitials: (input) => firstLetters(input) || 'WaliyS',
  frequentTimeCode: (input) => digitsOnly(input).slice(0, 4).padStart(4, '0') || '1111',
};

const generateValue = (option, input, settings) => {
  const transformer = transformByAlgo[option.algo];
  const rawValue = transformer ? transformer(input) : '';

  if (option.algo === 'specialCharacterSelector') return rawValue;
  return applyCapitalization(rawValue, settings.capitalizationMode || 'first');
};

export function generatePassword(options, inputs = {}, settings = {}) {
  const selected = Array.isArray(options) ? options : [];

  const parts = selected.map((option) => ({
    value: generateValue(option, inputs[option.algo], settings),
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
      if (!nextValue) continue;

      trimmedParts.push({ ...part, value: nextValue });
      remaining -= nextValue.length;
    }

    return trimmedParts;
  }

  return parts;
}
