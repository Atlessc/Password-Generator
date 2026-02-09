import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { generatePassword } from '../utils/passwordGenerator';
import { passwordOptions } from '../utils/passwordOptions';

const Container = styled.div`
  min-height: 100vh;
  padding: 1.25rem;
  background-color: #0f172a;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin: 0 0 0.4rem;
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  background: linear-gradient(to right, #7dd3fc, #818cf8);
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #94a3b8;
`;

const AppGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 1100px) {
    grid-template-columns: 1.65fr 1fr;
  }
`;

const Card = styled.section`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1rem;
  padding: 1rem;
`;

const LeftCard = styled(Card)`
  display: grid;
  gap: 0.9rem;
`;

const RightCard = styled(Card)`
  align-self: start;
  position: sticky;
  top: 1rem;
  max-height: calc(100vh - 2rem);
  overflow: ${({ explanationExpanded }) => (explanationExpanded ? 'auto' : 'hidden')};
`;

const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.15rem;
`;

const Subtle = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 0.92rem;
`;

const SymbolBlock = styled.div`
  display: grid;
  gap: 0.45rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.85rem;
  padding: 0.75rem;
`;

const SymbolGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const SymbolButton = styled.button`
  border-radius: 0.45rem;
  border: ${({ selected }) => (selected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.25)')};
  background: ${({ selected }) => (selected ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.07)')};
  color: white;
  padding: 0.32rem 0.52rem;
  min-width: 2rem;
  cursor: pointer;
`;

const SmallGhostButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.08);
  color: #dbeafe;
  border-radius: 0.45rem;
  padding: 0.28rem 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
`;

const WorkArea = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;

  @media (min-width: 980px) {
    grid-template-columns: ${({ $sidebarOpen }) => ($sidebarOpen ? '280px 1fr' : '1fr')};
  }
`;

const Sidebar = styled.div`
  display: ${({ $open }) => ($open ? 'block' : 'none')};
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.85rem;
  padding: 0.55rem;
  max-height: 460px;
  overflow-y: auto;
`;

const SidebarItem = styled.button`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  border-radius: 0.7rem;
  border: ${({ selected }) => (selected ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.12)')};
  background: ${({ selected }) => (selected ? 'rgba(99, 102, 241, 0.24)' : 'rgba(255, 255, 255, 0.06)')};
  color: white;
  padding: 0.55rem 0.62rem;
  margin-bottom: 0.45rem;
  cursor: pointer;
`;

const InfoWrap = styled.div`
  position: relative;
`;

const InfoButton = styled.button`
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.1);
  color: #dbeafe;
  cursor: pointer;
  font-size: 0.78rem;
`;

const Popover = styled.div`
  position: absolute;
  left: 2rem;
  top: 0;
  width: 250px;
  border-radius: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #0b1228;
  padding: 0.55rem;
  z-index: 15;
  color: #cbd5e1;
  font-size: 0.82rem;
`;

const FieldsPane = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.85rem;
  padding: 0.75rem;
  max-height: 460px;
  overflow-y: auto;
  display: grid;
  gap: 0.75rem;
`;

const FieldCard = styled.div`
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.65rem;
  display: grid;
  gap: 0.35rem;
`;

const FieldLabel = styled.label`
  font-size: 0.9rem;
  color: #dbeafe;
`;

const Input = styled.input`
  border-radius: 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(2, 6, 23, 0.55);
  color: white;
  padding: 0.5rem 0.58rem;
`;

const NumberInput = styled(Input)`
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Segmented = styled.div`
  display: inline-flex;
  gap: 0.32rem;
`;

const SegmentedButton = styled.button`
  border-radius: 0.45rem;
  border: ${({ active }) => (active ? '1px solid #6366f1' : '1px solid rgba(255, 255, 255, 0.2)')};
  background: ${({ active }) => (active ? 'rgba(99, 102, 241, 0.28)' : 'rgba(255, 255, 255, 0.08)')};
  color: white;
  padding: 0.32rem 0.55rem;
  cursor: pointer;
`;

const TwoColRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ToggleWrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  color: #dbeafe;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  margin: 0.6rem 0 0.9rem;
`;

const Button = styled.button`
  border: 0;
  border-radius: 0.62rem;
  padding: 0.5rem 0.82rem;
  background: ${({ primary }) => (primary ? '#6366f1' : 'rgba(255, 255, 255, 0.14)')};
  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PasswordBox = styled.div`
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(2, 6, 23, 0.62);
  min-height: 3.1rem;
  padding: 0.78rem;
  font-family: monospace;
  font-size: 1.02rem;
  word-break: break-all;
  color: ${({ empty }) => (empty ? '#7c8aa5' : 'white')};
`;

const Meter = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
`;

const MeterFill = styled.div`
  height: 100%;
  width: ${({ width }) => width};
  background: ${({ color }) => color};
`;

const Checklist = styled.div`
  display: flex;
  gap: 0.45rem;
  flex-wrap: wrap;
`;

const Chip = styled.span`
  font-size: 0.78rem;
  border-radius: 999px;
  padding: 0.22rem 0.48rem;
  border: 1px solid ${({ active }) => (active ? 'rgba(34, 197, 94, 0.65)' : 'rgba(255, 255, 255, 0.22)')};
  background: ${({ active }) => (active ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.06)')};
  color: ${({ active }) => (active ? '#bbf7d0' : '#cbd5e1')};
`;

const ExplanationList = styled.ul`
  margin: 0.75rem 0 0;
  padding-left: 1rem;
  color: #cbd5e1;
`;

const symbolOption = passwordOptions.find((option) => option.algo === 'specialCharacterSelector');
const regularOptions = passwordOptions.filter((option) => option.algo !== 'specialCharacterSelector');

const getStrength = (password) => {
  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  let score = 0;
  if (password.length >= 12) score += 1;
  if (password.length >= 18) score += 1;
  score += Object.values(checks).filter(Boolean).length;

  if (score <= 2) return { label: 'Weak', color: '#ef4444', width: '25%', checks };
  if (score <= 4) return { label: 'Fair', color: '#f59e0b', width: '50%', checks };
  if (score <= 5) return { label: 'Strong', color: '#22c55e', width: '75%', checks };
  return { label: 'Very Strong', color: '#10b981', width: '100%', checks };
};

function Home() {
  const [selectedOptions, setSelectedOptions] = useState(symbolOption ? [symbolOption] : []);
  const [activeOptionAlgo, setActiveOptionAlgo] = useState(regularOptions[0]?.algo || '');
  const [openPopoverAlgo, setOpenPopoverAlgo] = useState('');
  const [inputValues, setInputValues] = useState({ specialDate: { date: '', format: 'digits' } });
  const [passwordParts, setPasswordParts] = useState([]);
  const [passwordLength, setPasswordLength] = useState(18);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [explanationExpanded, setExplanationExpanded] = useState(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedRegularOptions = useMemo(
    () => selectedOptions.filter((option) => option.algo !== 'specialCharacterSelector'),
    [selectedOptions],
  );

  const fullPassword = useMemo(() => passwordParts.map((part) => part.value).join(''), [passwordParts]);

  const displayPassword = useMemo(() => {
    if (!fullPassword) return '';
    if (showPassword) return fullPassword;
    return '•'.repeat(fullPassword.length);
  }, [fullPassword, showPassword]);

  const strength = useMemo(() => getStrength(fullPassword), [fullPassword]);

  const recipe = useMemo(
    () => passwordParts.filter((part) => part.source !== 'Random filler').map((part) => part.source).join(' + '),
    [passwordParts],
  );

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((entry) => entry.algo === option.algo);
      if (exists) return prev.filter((entry) => entry.algo !== option.algo);
      return [...prev, option];
    });

    setActiveOptionAlgo(option.algo);
  };

  const handleInputChange = (algo, value) => {
    setInputValues((prev) => ({ ...prev, [algo]: value }));
  };

  const handleSpecialDateChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      specialDate: {
        date: prev.specialDate?.date || '',
        format: prev.specialDate?.format || 'digits',
        [field]: value,
      },
    }));
  };

  const toggleSymbolSelection = (symbol) => {
    setInputValues((prev) => {
      const current = Array.isArray(prev.specialCharacterSelector) ? prev.specialCharacterSelector : [];
      const next = current.includes(symbol)
        ? current.filter((entry) => entry !== symbol)
        : [...current, symbol];

      return { ...prev, specialCharacterSelector: next };
    });
  };

  const selectAllSymbols = () => {
    if (!symbolOption) return;
    setInputValues((prev) => ({ ...prev, specialCharacterSelector: [...symbolOption.symbols] }));
  };

  const clearSymbols = () => {
    setInputValues((prev) => ({ ...prev, specialCharacterSelector: [] }));
  };

  const randomizeSymbols = () => {
    if (!symbolOption) return;
    const count = Math.floor(Math.random() * 3) + 1;
    const pool = [...symbolOption.symbols].sort(() => Math.random() - 0.5);
    setInputValues((prev) => ({ ...prev, specialCharacterSelector: pool.slice(0, count) }));
  };

  const handleGeneratePassword = () => {
    const length = Math.max(8, Math.min(64, Number(passwordLength) || 18));
    if (!selectedRegularOptions.length) return;

    const parts = generatePassword(selectedOptions, inputValues, {
      length,
      capitalizationMode: capitalizeFirst ? 'first' : 'random',
    });

    setPasswordParts(parts);
  };

  const handleClear = () => {
    setSelectedOptions(symbolOption ? [symbolOption] : []);
    setInputValues({ specialDate: { date: '', format: 'digits' }, specialCharacterSelector: [] });
    setPasswordParts([]);
    setCopied(false);
    setShowPassword(false);
    setExplanationExpanded(false);
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
        <Subtitle>Build passwords from personal-but-obscure options, then generate one combined password.</Subtitle>
      </Header>

      <AppGrid>
        <LeftCard>
          <TopRow>
            <SectionTitle>Password Options</SectionTitle>
            <Subtle>{selectedOptions.length} selected / {passwordOptions.length} available</Subtle>
          </TopRow>

          <SymbolBlock>
            <Subtle>{symbolOption?.label}</Subtle>
            <SymbolGrid>
              {symbolOption?.symbols.map((symbol) => {
                const selectedSymbols = Array.isArray(inputValues.specialCharacterSelector)
                  ? inputValues.specialCharacterSelector
                  : [];
                const selected = selectedSymbols.includes(symbol);
                return (
                  <SymbolButton
                    key={`symbol-${symbol}`}
                    type="button"
                    selected={selected}
                    onClick={() => toggleSymbolSelection(symbol)}
                  >
                    {symbol}
                  </SymbolButton>
                );
              })}
            </SymbolGrid>
            <TwoColRow>
              <SmallGhostButton type="button" onClick={clearSymbols}>Select none</SmallGhostButton>
              <SmallGhostButton type="button" onClick={selectAllSymbols}>Select all</SmallGhostButton>
              <SmallGhostButton type="button" onClick={randomizeSymbols}>Randomize</SmallGhostButton>
            </TwoColRow>
            <Subtle>
              {Array.isArray(inputValues.specialCharacterSelector) && inputValues.specialCharacterSelector.length
                ? `Selected: ${inputValues.specialCharacterSelector.join(' ')}`
                : 'No symbols selected. Generator will pick 1-3 random symbols.'}
            </Subtle>
          </SymbolBlock>

          <TwoColRow>
            <SmallGhostButton
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              {sidebarOpen ? 'Hide options menu' : 'Show options menu'}
            </SmallGhostButton>
          </TwoColRow>

          <WorkArea $sidebarOpen={sidebarOpen}>
            <Sidebar $open={sidebarOpen}>
              <Subtle style={{ marginBottom: '0.45rem' }}>Sidebar Menu</Subtle>
              {regularOptions.map((option) => {
                const selected = selectedOptions.some((entry) => entry.algo === option.algo);
                return (
                  <SidebarItem
                    key={option.algo}
                    selected={selected}
                    type="button"
                    onClick={() => toggleOption(option)}
                  >
                    <span>{option.shortName}</span>
                    <InfoWrap>
                      <InfoButton
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setOpenPopoverAlgo((prev) => (prev === option.algo ? '' : option.algo));
                        }}
                      >
                        i
                      </InfoButton>
                      {openPopoverAlgo === option.algo && <Popover>{option.explanation}</Popover>}
                    </InfoWrap>
                  </SidebarItem>
                );
              })}
            </Sidebar>

            <FieldsPane>
              <TopRow>
                <Subtle>Option Fields</Subtle>
                <Subtle>Select 2-4 options for best memorability.</Subtle>
              </TopRow>

              {selectedRegularOptions.length === 0 && (
                <Subtle>Select at least one sidebar option to unlock generation.</Subtle>
              )}

              {selectedRegularOptions.map((option) => (
                <FieldCard key={`field-${option.algo}`} style={{ outline: activeOptionAlgo === option.algo ? '1px solid rgba(125, 211, 252, 0.55)' : 'none' }}>
                  <FieldLabel htmlFor={option.algo}>{option.label}</FieldLabel>

                  {option.type === 'special-date' ? (
                    <>
                      <Input
                        id={option.algo}
                        type="date"
                        value={inputValues.specialDate?.date || ''}
                        onChange={(event) => handleSpecialDateChange('date', event.target.value)}
                      />
                      <Segmented>
                        <SegmentedButton
                          type="button"
                          active={(inputValues.specialDate?.format || 'digits') === 'digits'}
                          onClick={() => handleSpecialDateChange('format', 'digits')}
                        >
                          01/15/25 -&gt; 11525
                        </SegmentedButton>
                        <SegmentedButton
                          type="button"
                          active={(inputValues.specialDate?.format || 'digits') === 'monthText'}
                          onClick={() => handleSpecialDateChange('format', 'monthText')}
                        >
                          Jan1525
                        </SegmentedButton>
                      </Segmented>
                    </>
                  ) : option.type === 'number' ? (
                    <NumberInput
                      id={option.algo}
                      type="number"
                      value={inputValues[option.algo] || ''}
                      placeholder={option.placeholder || ''}
                      onChange={(event) => handleInputChange(option.algo, event.target.value)}
                    />
                  ) : (
                    <Input
                      id={option.algo}
                      type={option.type}
                      value={inputValues[option.algo] || ''}
                      placeholder={option.placeholder || ''}
                      onChange={(event) => handleInputChange(option.algo, event.target.value)}
                    />
                  )}
                </FieldCard>
              ))}
            </FieldsPane>
          </WorkArea>

          <TwoColRow>
            <ToggleWrap>
              <input
                type="checkbox"
                checked={capitalizeFirst}
                onChange={(event) => setCapitalizeFirst(event.target.checked)}
              />
              Capitalize first letter in each option output
            </ToggleWrap>
            <ToggleWrap>
              <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
              Show password text
            </ToggleWrap>
          </TwoColRow>

          <TwoColRow>
            <FieldLabel htmlFor="password-length">Password Length (8-64)</FieldLabel>
            <NumberInput
              id="password-length"
              type="number"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Number.isNaN(value)) {
                  setPasswordLength(8);
                  return;
                }
                setPasswordLength(Math.max(8, Math.min(64, value)));
              }}
            />
          </TwoColRow>

          <Subtle>Security note: avoid exact public facts. Slightly customize your inputs so only you know the pattern.</Subtle>
        </LeftCard>

        <RightCard explanationExpanded={explanationExpanded}>
          <SectionTitle>Generated Password</SectionTitle>

          <Controls>
            <Button
              primary
              disabled={!selectedRegularOptions.length}
              onClick={handleGeneratePassword}
            >
              Generate
            </Button>
            <Button
              disabled={!selectedRegularOptions.length}
              onClick={handleGeneratePassword}
            >
              Regenerate
            </Button>
            <Button disabled={!fullPassword} onClick={copyToClipboard}>{copied ? 'Copied' : 'Copy'}</Button>
            <Button onClick={handleClear}>Clear</Button>
          </Controls>

          <PasswordBox empty={!fullPassword}>{displayPassword || 'Your password will appear here.'}</PasswordBox>

          <TopRow style={{ marginTop: '0.55rem' }}>
            <Subtle>Length: {fullPassword.length}</Subtle>
            <Subtle>Strength: {strength.label}</Subtle>
          </TopRow>

          <Meter>
            <MeterFill width={strength.width} color={strength.color} />
          </Meter>

          <Checklist style={{ marginTop: '0.55rem' }}>
            <Chip active={strength.checks.uppercase}>Uppercase</Chip>
            <Chip active={strength.checks.lowercase}>Lowercase</Chip>
            <Chip active={strength.checks.number}>Number</Chip>
            <Chip active={strength.checks.symbol}>Symbol</Chip>
          </Checklist>

          <Subtle style={{ marginTop: '0.65rem' }}>Recipe: {recipe || 'No options generated yet.'}</Subtle>

          <Controls>
            <Button onClick={() => setExplanationExpanded((prev) => !prev)}>
              {explanationExpanded ? 'Hide Explanation' : 'Expand Explanation'}
            </Button>
          </Controls>

          {explanationExpanded && passwordParts.length > 0 && (
            <ExplanationList>
              {passwordParts.map((part, index) => (
                <li key={`${part.source}-${index}`}>
                  <strong>{part.source}:</strong> {part.value}
                </li>
              ))}
            </ExplanationList>
          )}
        </RightCard>
      </AppGrid>
    </Container>
  );
}

export default Home;
