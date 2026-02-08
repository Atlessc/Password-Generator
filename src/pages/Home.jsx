import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { generatePassword } from '../utils/passwordGenerator';
import { passwordOptions } from '../utils/passwordOptions';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background-color: #0f172a;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 0.75rem;
  background: linear-gradient(to right, #667eea, #764ba2);
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  max-width: 760px;
  margin: 0 auto;
  color: #94a3b8;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 2fr;
  }
`;

const Card = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.25rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
`;

const Subtle = styled.span`
  color: #94a3b8;
  font-size: 0.9rem;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.5rem;

  @media (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const OptionCard = styled.button`
  text-align: left;
  border-radius: 0.8rem;
  border: ${({ selected }) => (selected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.15)')};
  background: ${({ selected }) => (selected ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.06)')};
  color: white;
  padding: 0.65rem 0.75rem;
  cursor: pointer;

  &:hover {
    border-color: rgba(102, 126, 234, 0.5);
  }
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const InputRow = styled.div`
  display: grid;
  gap: 0.25rem;
`;

const Input = styled.input`
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(2, 6, 23, 0.5);
  color: white;
  padding: 0.55rem 0.65rem;
`;

const SymbolGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const SymbolButton = styled.button`
  border-radius: 0.45rem;
  border: ${({ selected }) => (selected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.25)')};
  background: ${({ selected }) => (selected ? 'rgba(102, 126, 234, 0.3)' : 'rgba(255, 255, 255, 0.07)')};
  color: white;
  padding: 0.35rem 0.55rem;
  min-width: 2rem;
  cursor: pointer;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin: 0.75rem 0 1rem;
`;

const Button = styled.button`
  border: 0;
  border-radius: 0.65rem;
  padding: 0.55rem 0.9rem;
  background: ${({ primary }) => (primary ? '#6366f1' : 'rgba(255, 255, 255, 0.14)')};
  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const PasswordBox = styled.div`
  font-family: monospace;
  font-size: 1.05rem;
  word-break: break-all;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(2, 6, 23, 0.5);
  padding: 0.9rem;
  min-height: 3rem;
`;

const ExplanationList = styled.ul`
  margin: 0.85rem 0 0;
  padding-left: 1rem;
  color: #cbd5e1;
`;

const specialOption = passwordOptions.find((option) => option.algo === 'specialCharacterSelector');
const regularOptions = passwordOptions.filter((option) => option.algo !== 'specialCharacterSelector');

function Home() {
  const [selectedOptions, setSelectedOptions] = useState(specialOption ? [specialOption] : []);
  const [inputValues, setInputValues] = useState({});
  const [passwordParts, setPasswordParts] = useState([]);
  const [passwordLength, setPasswordLength] = useState(18);
  const [copied, setCopied] = useState(false);

  const fullPassword = useMemo(
    () => passwordParts.map((part) => part.value).join(''),
    [passwordParts],
  );

  const toggleOption = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((entry) => entry !== option) : [...prev, option],
    );
  };

  const handleInputChange = (algo, value) => {
    setInputValues((prev) => ({ ...prev, [algo]: value }));
  };

  const toggleSymbolSelection = (algo, symbol) => {
    setInputValues((prev) => {
      const current = Array.isArray(prev[algo]) ? prev[algo] : [];
      const next = current.includes(symbol)
        ? current.filter((entry) => entry !== symbol)
        : [...current, symbol];
      return { ...prev, [algo]: next };
    });
  };

  const handleGeneratePassword = () => {
    if (!selectedOptions.length) return;
    const parts = generatePassword(selectedOptions, inputValues, { length: passwordLength });
    setPasswordParts(parts);
  };

  const handleClear = () => {
    setSelectedOptions(specialOption ? [specialOption] : []);
    setInputValues({});
    setPasswordParts([]);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (!fullPassword) return;
    await navigator.clipboard.writeText(fullPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Container>
      <Header>
        <Title>Memorable Password Generator</Title>
        <Subtitle>
          Build passwords from personal-but-obscure options, then generate one combined password.
        </Subtitle>
      </Header>

      <Grid>
        <Card>
          <Row>
            <SectionTitle>Password Options</SectionTitle>
            <Subtle>{selectedOptions.length} selected / {passwordOptions.length} available</Subtle>
          </Row>

          {specialOption && (
            <InputRow>
              <label>{specialOption.label}</label>
              <SymbolGrid>
                {specialOption.symbols.map((symbol) => {
                  const selectedSymbols = Array.isArray(inputValues[specialOption.algo])
                    ? inputValues[specialOption.algo]
                    : [];
                  const selected = selectedSymbols.includes(symbol);
                  return (
                    <SymbolButton
                      key={`${specialOption.algo}-${symbol}`}
                      type="button"
                      selected={selected}
                      onClick={() => toggleSymbolSelection(specialOption.algo, symbol)}
                    >
                      {symbol}
                    </SymbolButton>
                  );
                })}
              </SymbolGrid>
              <Subtle>
                {Array.isArray(inputValues[specialOption.algo]) && inputValues[specialOption.algo].length
                  ? `Selected: ${inputValues[specialOption.algo].join(' ')}`
                  : 'No symbols selected. Generator will pick 1-3 random symbols.'}
              </Subtle>
            </InputRow>
          )}

          <OptionGrid>
            {regularOptions.map((option) => {
              const selected = selectedOptions.includes(option);
              return (
                <OptionCard
                  key={option.algo}
                  selected={selected}
                  onClick={() => toggleOption(option)}
                  type="button"
                >
                  <strong>{option.shortName}</strong>
                </OptionCard>
              );
            })}
          </OptionGrid>

          <Controls>
            <Subtle>Password Length: {passwordLength}</Subtle>
            <Input
              type="range"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              aria-label="Password length"
            />
          </Controls>

          {selectedOptions.filter((option) => option.algo !== 'specialCharacterSelector').length > 0 && (
            <InputGrid>
              {selectedOptions
                .filter((option) => option.algo !== 'specialCharacterSelector')
                .map((option) => (
                <InputRow key={`${option.algo}-input`}>
                  <label htmlFor={option.algo}>{option.label}</label>
                  {option.type === 'symbol-multi' ? (
                    <>
                      <SymbolGrid>
                        {option.symbols.map((symbol) => {
                          const selectedSymbols = Array.isArray(inputValues[option.algo])
                            ? inputValues[option.algo]
                            : [];
                          const selected = selectedSymbols.includes(symbol);
                          return (
                            <SymbolButton
                              key={`${option.algo}-${symbol}`}
                              type="button"
                              selected={selected}
                              onClick={() => toggleSymbolSelection(option.algo, symbol)}
                            >
                              {symbol}
                            </SymbolButton>
                          );
                        })}
                      </SymbolGrid>
                      <Subtle>
                        {Array.isArray(inputValues[option.algo]) && inputValues[option.algo].length
                          ? `Selected: ${inputValues[option.algo].join(' ')}`
                          : 'No symbols selected. Generator will pick 1-3 random symbols.'}
                      </Subtle>
                    </>
                  ) : (
                    <Input
                      id={option.algo}
                      type={option.type}
                      value={inputValues[option.algo] || ''}
                      placeholder={option.placeholder || ''}
                      onChange={(e) => handleInputChange(option.algo, e.target.value)}
                    />
                  )}
                </InputRow>
              ))}
            </InputGrid>
          )}
        </Card>

        <Card>
          <SectionTitle>Generated Password</SectionTitle>
          <Controls>
            <Button primary disabled={!selectedOptions.length} onClick={handleGeneratePassword}>
              Generate
            </Button>
            <Button disabled={!selectedOptions.length} onClick={handleGeneratePassword}>
              Regenerate
            </Button>
            <Button disabled={!fullPassword} onClick={copyToClipboard}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button onClick={handleClear}>Clear</Button>
          </Controls>

          <PasswordBox>{fullPassword}</PasswordBox>
          <Subtle>Length: {fullPassword.length}</Subtle>

          {passwordParts.length > 0 && (
            <>
              <SectionTitle>Password Explanation</SectionTitle>
              <ExplanationList>
                {passwordParts.map((part, index) => (
                  <li key={`${part.source}-${index}`}>
                    <strong>{part.source}:</strong> {part.value}
                  </li>
                ))}
              </ExplanationList>
            </>
          )}
        </Card>
      </Grid>
    </Container>
  );
}

export default Home;
