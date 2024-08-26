import { create } from 'zustand';
import { optionDetails } from './data/options';
import { shuffleArray } from './common/helpers'; // Import the shuffleArray helper

const calculateRequiredOptions = (passwordLength) => {
  if (passwordLength <= 12) return { required: 2, allowed: 6 };
  if (passwordLength <= 20) return { required: 3, allowed: 7 };
  if (passwordLength <= 30) return { required: 4, allowed: 8 };
  if (passwordLength <= 40) return { required: 5, allowed: 10 };
  return { required: 6, allowed: 10 };
};

const algoMap = {
  getPhraseInitials: () => import('./algos/PhraseInitials.js'),
  getDailyProductsUsed: () => import('./algos/DailyProductsUsed.js'),
  getCommonWordAnagram: () => import('./algos/CommonWordAnagram.js'),
  getStreetNameAnagram: () => import('./algos/StreetNameAnagram.js'),
  generateRandomNumbers: () => import('./algos/generateRandomNumbers.js'),
  generateRandomLetters: () => import('./algos/generateRandomLetters.js'),
  generateRandomSpecialCharacters: () => import('./algos/generateRandomSpecialCharacters.js'),
};

const initialPasswordLength = 12;
const { required, allowed } = calculateRequiredOptions(initialPasswordLength);

const useStore = create((set, get) => ({
  options: optionDetails.map(detail => ({
    ...detail,
    value: '',
    selected: false,
    length: 1, // Default length for random options
    showDetails: false
  })),
  passwordLength: initialPasswordLength,
  requiredOptions: required,
  allowedOptions: allowed,
  password: '',
  passwordExplanation: [],
  passwordError: '', // Store the error message
  highlightedOptions: [], // Store the highlighted options

  setPasswordLength: (length) => set((state) => {
    const { required, allowed } = calculateRequiredOptions(length);
    return { passwordLength: length, requiredOptions: required, allowedOptions: allowed };
  }),
  
  setOption: (index, value) => set((state) => {
    const options = [...state.options];
    options[index] = { ...options[index], value };
    return { options };
  }),

  setOptionLength: (index, length) => set((state) => {
    const options = [...state.options];
    options[index] = { ...options[index], length };
    return { options };
  }),

  toggleOptionSelection: (index) => set((state) => {
    const selectedCount = state.options.filter(opt => opt.selected).length;
    if (state.options[index].selected || selectedCount < state.allowedOptions) {
      const options = [...state.options];
      options[index] = { ...options[index], selected: !options[index].selected };
      return { options };
    } else {
      console.log(`You can only select up to ${state.allowedOptions} options.`);
      return state; // Do nothing if max allowed options are already selected
    }
  }),
  
  toggleDetails: (index) => set((state) => {
    const options = [...state.options];
    options[index] = { ...options[index], showDetails: !options[index].showDetails };
    return { options };
  }),
  
  generatePassword: async () => {
    const selectedOptions = get().options.filter(option => option.selected);
    const selectedOptionTypes = selectedOptions.map(option => option.shortName);

    if (selectedOptions.length < get().requiredOptions) {
      console.error(`You must select at least ${get().requiredOptions} options.`);
      return;
    }
  
    const passwordSegments = [];
    const explanationSegments = [];
    let containsNumber = false;
    let containsSpecialCharacter = false;
  
    for (const option of selectedOptions) {
      const algoFunction = algoMap[option.algo];
  
      if (algoFunction) {
        try {
          const importedFunction = (await algoFunction()).default;
          const result = importedFunction(option.value || option.length); // Use length if value is not provided
          passwordSegments.push(result);
          explanationSegments.push(`${option.shortName}: ${result}`);

          // Check if the segment contains numbers or special characters
          if (/\d/.test(result)) containsNumber = true;
          if (/[!@#$%^&*(),.?":{}|<>]/.test(result)) containsSpecialCharacter = true;
          
        } catch (error) {
          console.error(`Error loading algorithm for ${option.shortName}:`, error);
        }
      } else {
        console.error(`Algorithm not found for ${option.shortName}`);
      }
    }
  
    // Shuffle the order of the password segments
    const shuffledPasswordSegments = shuffleArray(passwordSegments);
    const password = shuffledPasswordSegments.join('');
  
    let passwordError = '';
    let highlightedOptions = [];
  
    // If the password doesn't contain a number or special character, show an error
    if (!containsNumber || !containsSpecialCharacter) {
      passwordError = 'Passwords should usually include numbers and special characters.';
      
      highlightedOptions = [
        ...(!containsNumber ? ['Random Number'] : []),
        ...(!containsSpecialCharacter ? ['Special Character'] : []),
      ];
    }
  
    set({ password, passwordExplanation: explanationSegments, passwordError, highlightedOptions });
  },
  
  clearInputs: () => set((state) => ({
    options: optionDetails.map(detail => ({
      ...detail,
      value: '',
      selected: false,
      length: 1,
      showDetails: false
    })),
    password: '',
    passwordExplanation: [],
    passwordError: '',
    highlightedOptions: [],
    requiredOptions: calculateRequiredOptions(state.passwordLength).required,
    allowedOptions: calculateRequiredOptions(state.passwordLength).allowed
  })),
  
  copyToClipboard: () => {
    navigator.clipboard.writeText(get().password).then(() => {
      console.log("Password copied to clipboard!");
    }).catch(err => {
      console.error("Failed to copy password: ", err);
    });
  }
}));

export default useStore;
