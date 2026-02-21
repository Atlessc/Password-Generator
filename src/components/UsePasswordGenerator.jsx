import useStore from '../ZustandStore';

function usePasswordGenerator() {
  const generatePassword = useStore((state) => state.generatePassword);

  return { generatePassword };
}

export default usePasswordGenerator;
