import useStore from '../ZustandStore';

function usePasswordGenerator() {
  const { options, passwordLength, setPassword, setPasswordExplanation } = useStore();

  const generatePassword = () => {
    let password = '';
    let explanation = [];

    // Combine user inputs and generate password
    options.forEach(option => {
      const part = generatePartFromOption(option);
      password += part;
      explanation.push(`Part from ${option.label}: ${part}`);
    });

    // Adjust password to fit the length
    password = password.slice(0, passwordLength);

    setPassword(password);
    setPasswordExplanation(explanation);
  };

  return { generatePassword };
}

export default usePasswordGenerator;
