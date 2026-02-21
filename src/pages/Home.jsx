import { useMemo, useState } from 'react';
import { generatePassword } from '../utils/passwordGenerator';
import { passwordOptions } from '../utils/passwordOptions';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 64;

const symbolOption = passwordOptions.find((option) => option.algo === 'specialCharacterSelector');
const regularOptions = passwordOptions.filter((option) => option.algo !== 'specialCharacterSelector');

const cardClass = 'rounded-2xl border border-base-content/15 bg-base-100/30 p-4';
const subtleTextClass = 'm-0 text-sm text-base-content/70';
const inputClass = 'input input-bordered input-sm w-full bg-base-200/60';
const panelHeaderClass = 'mb-2 border-b border-base-content/20 pb-1 text-xs font-bold uppercase tracking-wider text-base-content/90';

const normalizeYearInput = (rawValue = '') => String(rawValue).replace(/\D/g, '').slice(0, 4);

const normalizeMonthDayInput = (rawValue = '') => {
  const digits = String(rawValue).replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
};

const isValidMonthDay = (value = '') => {
  const match = String(value).match(/^(\d{2})-(\d{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const day = Number(match[2]);
  return month >= 1 && month <= 12 && day >= 1 && day <= 31;
};

const getFieldError = (option, inputValues) => {
  if (option.type === 'special-date') {
    return inputValues.specialDate?.date ? '' : 'Pick a date.';
  }

  if (option.algo === 'hometownZipTail') {
    return /^\d{5}$/.test(String(inputValues[option.algo] ?? '').trim())
      ? ''
      : 'Enter a valid 5-digit ZIP code.';
  }

  if (option.type === 'year-toggle') {
    const value = typeof inputValues[option.algo] === 'object'
      ? inputValues[option.algo]?.value
      : inputValues[option.algo];

    return /^\d{4}$/.test(String(value ?? '').trim()) ? '' : 'Enter a 4-digit year.';
  }

  if (option.type === 'mmdd-toggle') {
    const value = typeof inputValues[option.algo] === 'object'
      ? inputValues[option.algo]?.value
      : inputValues[option.algo];

    return isValidMonthDay(value) ? '' : 'Enter a valid MM-DD date.';
  }

  return String(inputValues[option.algo] ?? '').trim().length > 0 ? '' : 'This field is required.';
};

const normalizeMinLength = (rawValue, fallback) => {
  const match = String(rawValue ?? '').match(/\d+/);
  if (!match) return fallback;

  const parsed = Number(match[0]);
  if (Number.isNaN(parsed)) return fallback;

  return Math.max(MIN_PASSWORD_LENGTH, Math.min(MAX_PASSWORD_LENGTH, parsed));
};

const getStrength = (password) => {
  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  if (!password.length) {
    return {
      label: 'Not generated',
      barClass: 'bg-base-content/20',
      width: '0%',
      checks,
    };
  }

  let score = 0;
  if (password.length >= 12) score += 1;
  if (password.length >= 18) score += 1;
  score += Object.values(checks).filter(Boolean).length;

  if (score <= 2) return { label: 'Weak', barClass: 'bg-error', width: '25%', checks };
  if (score <= 4) return { label: 'Fair', barClass: 'bg-warning', width: '50%', checks };
  if (score <= 5) return { label: 'Strong', barClass: 'bg-success', width: '75%', checks };
  return { label: 'Very Strong', barClass: 'bg-success', width: '100%', checks };
};

function Home() {
  const [selectedOptions, setSelectedOptions] = useState(symbolOption ? [symbolOption] : []);
  const [activeOptionAlgo, setActiveOptionAlgo] = useState(regularOptions[0]?.algo || '');
  const [openPopoverAlgo, setOpenPopoverAlgo] = useState('');
  const [inputValues, setInputValues] = useState({ specialDate: { date: '', format: 'digits' }, specialCharacterSelector: [] });
  const [passwordParts, setPasswordParts] = useState([]);
  const [minLengthInput, setMinLengthInput] = useState('18');
  const [minPasswordLength, setMinPasswordLength] = useState(18);
  const [copyStatus, setCopyStatus] = useState({ type: 'idle', message: '' });
  const [explanationExpanded, setExplanationExpanded] = useState(false);
  const [capitalizeFirst, setCapitalizeFirst] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [generationError, setGenerationError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const selectedRegularOptions = useMemo(
    () => selectedOptions.filter((option) => option.algo !== 'specialCharacterSelector'),
    [selectedOptions],
  );

  const selectedSymbols = useMemo(
    () => (Array.isArray(inputValues.specialCharacterSelector) ? inputValues.specialCharacterSelector : []),
    [inputValues.specialCharacterSelector],
  );

  const fullPassword = useMemo(() => passwordParts.map((part) => part.value).join(''), [passwordParts]);
  const strength = useMemo(() => getStrength(fullPassword), [fullPassword]);

  const recipe = useMemo(
    () => passwordParts.filter((part) => part.source !== 'Random filler').map((part) => part.source).join(' + '),
    [passwordParts],
  );

  const clearFieldError = (algo) => {
    setFieldErrors((prev) => {
      if (!prev[algo]) return prev;
      const next = { ...prev };
      delete next[algo];
      return next;
    });
  };

  const commitMinLength = (rawValue = minLengthInput) => {
    const normalized = normalizeMinLength(rawValue, minPasswordLength);
    setMinPasswordLength(normalized);
    setMinLengthInput(String(normalized));
  };

  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((entry) => entry.algo === option.algo);
      if (exists) return prev.filter((entry) => entry.algo !== option.algo);
      return [...prev, option];
    });

    clearFieldError(option.algo);
    setGenerationError('');
    setActiveOptionAlgo(option.algo);
  };

  const handleInputChange = (algo, value) => {
    const option = regularOptions.find((entry) => entry.algo === algo);

    setInputValues((prev) => {
      if (algo === 'hometownZipTail') {
        return { ...prev, [algo]: String(value).replace(/\D/g, '').slice(0, 5) };
      }

      if (option?.type === 'year-toggle') {
        const existing = typeof prev[algo] === 'object' ? prev[algo] : { value: '', reverse: false };
        return {
          ...prev,
          [algo]: {
            ...existing,
            value: normalizeYearInput(value),
          },
        };
      }

      if (option?.type === 'mmdd-toggle') {
        const existing = typeof prev[algo] === 'object' ? prev[algo] : { value: '', reverse: false };
        return {
          ...prev,
          [algo]: {
            ...existing,
            value: normalizeMonthDayInput(value),
          },
        };
      }

      return { ...prev, [algo]: value };
    });

    clearFieldError(algo);
    setGenerationError('');
  };

  const handleReverseToggleChange = (algo, checked) => {
    setInputValues((prev) => {
      const existing = typeof prev[algo] === 'object' ? prev[algo] : { value: '', reverse: false };
      return {
        ...prev,
        [algo]: {
          ...existing,
          reverse: checked,
        },
      };
    });

    clearFieldError(algo);
    setGenerationError('');
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

    clearFieldError('specialDate');
    setGenerationError('');
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
    if (!selectedRegularOptions.length) {
      setGenerationError('Select at least one option from Options Menu before generating.');
      return;
    }

    const nextFieldErrors = {};
    for (const option of selectedRegularOptions) {
      const fieldError = getFieldError(option, inputValues);
      if (fieldError) {
        nextFieldErrors[option.algo] = fieldError;
      }
    }

    if (Object.keys(nextFieldErrors).length) {
      setFieldErrors(nextFieldErrors);
      setGenerationError('Complete the highlighted option fields.');
      return;
    }

    const normalizedMinLength = normalizeMinLength(minLengthInput, minPasswordLength);
    setMinPasswordLength(normalizedMinLength);
    setMinLengthInput(String(normalizedMinLength));

    const parts = generatePassword(selectedOptions, inputValues, {
      minLength: normalizedMinLength,
      capitalizationMode: capitalizeFirst ? 'first' : 'random',
    });

    setFieldErrors({});
    setGenerationError('');
    setPasswordParts(parts);
  };

  const handleClear = () => {
    setSelectedOptions(symbolOption ? [symbolOption] : []);
    setInputValues({ specialDate: { date: '', format: 'digits' }, specialCharacterSelector: [] });
    setPasswordParts([]);
    setCopyStatus({ type: 'idle', message: '' });
    setExplanationExpanded(false);
    setGenerationError('');
    setFieldErrors({});
  };

  const copyToClipboard = async () => {
    if (!fullPassword) return;

    try {
      await navigator.clipboard.writeText(fullPassword);
      setCopyStatus({ type: 'success', message: 'Copied to clipboard.' });
      setTimeout(() => setCopyStatus({ type: 'idle', message: '' }), 1500);
    } catch {
      setCopyStatus({ type: 'error', message: 'Clipboard access failed. Copy manually from the password field.' });
    }
  };

  return (
    <main className="min-h-screen bg-base-300 p-5 text-base-content">
      <header className="mb-4 text-center">
        <h1 className="mb-2 bg-gradient-to-r from-sky-300 to-indigo-400 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-5xl">
          Memorable Password Generator
        </h1>
        <p className={subtleTextClass}>
          Build passwords from personal-but-obscure options, then generate one combined password.
        </p>
      </header>

      <div className="grid gap-4 xl:grid-cols-[1.65fr_1fr]">
        <section className={`${cardClass} grid gap-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="m-0 text-xl font-bold">Password Options</h2>
            <p className={subtleTextClass}>
              {selectedRegularOptions.length} pattern options selected / {regularOptions.length} available
            </p>
          </div>

          <div className="rounded-xl border border-base-content/15 p-3">
            <h3 className={panelHeaderClass}>Generator Settings</h3>

            <div className="grid gap-3 md:grid-cols-[minmax(260px,360px)_1fr] md:items-end">
              <label className="grid gap-1" htmlFor="min-password-length">
                <span className="text-sm font-medium text-base-content/90">Minimum Password Length (8-64)</span>
                <input
                  id="min-password-length"
                  type="text"
                  inputMode="numeric"
                  className={`${inputClass} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                  value={minLengthInput}
                  onChange={(event) => setMinLengthInput(event.target.value)}
                  onBlur={() => commitMinLength()}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                      event.preventDefault();
                      const current = normalizeMinLength(minLengthInput, minPasswordLength);
                      const delta = event.key === 'ArrowUp' ? 1 : -1;
                      const next = Math.max(MIN_PASSWORD_LENGTH, Math.min(MAX_PASSWORD_LENGTH, current + delta));
                      setMinPasswordLength(next);
                      setMinLengthInput(String(next));
                    }

                    if (event.key === 'Enter') {
                      event.preventDefault();
                      commitMinLength();
                    }
                  }}
                  placeholder="Example: 18"
                />
                <span className="text-xs text-base-content/65">
                  Type a value, then use keyboard up/down arrows to adjust.
                </span>
              </label>

              <label className="label cursor-pointer justify-start gap-2 p-0 md:pb-1">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  checked={capitalizeFirst}
                  onChange={(event) => setCapitalizeFirst(event.target.checked)}
                />
                <span className="label-text text-sm text-base-content/90">
                  Capitalize first letter in each option output
                </span>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-base-content/15 p-3">
            <h3 className={panelHeaderClass}>Special Symbols</h3>

            <p className={subtleTextClass}>{symbolOption?.label}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {symbolOption?.symbols.map((symbol) => {
                const selected = selectedSymbols.includes(symbol);

                return (
                  <button
                    key={`symbol-${symbol}`}
                    type="button"
                    className={`btn btn-sm min-w-8 px-2 ${
                      selected
                        ? 'btn-primary'
                        : 'btn-ghost border border-base-content/25 bg-base-100/40 hover:bg-base-100/70'
                    }`}
                    onClick={() => toggleSymbolSelection(symbol)}
                  >
                    {symbol}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn btn-xs sm:btn-sm btn-ghost border border-base-content/25 normal-case"
                onClick={clearSymbols}
              >
                Select none
              </button>
              <button
                type="button"
                className="btn btn-xs sm:btn-sm btn-ghost border border-base-content/25 normal-case"
                onClick={selectAllSymbols}
              >
                Select all
              </button>
              <button
                type="button"
                className="btn btn-xs sm:btn-sm btn-ghost border border-base-content/25 normal-case"
                onClick={randomizeSymbols}
              >
                Randomize
              </button>
            </div>

            <p className={`${subtleTextClass} mt-2`}>
              {selectedSymbols.length
                ? `Selected symbols: ${selectedSymbols.join(' ')}`
                : 'No symbols selected. Generator will pick 1-3 random symbols.'}
            </p>
          </div>

          <div className="rounded-xl border border-base-content/15 p-3">
            <h3 className={panelHeaderClass}>Pattern Builder</h3>

            <div className="mb-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="btn btn-xs normal-case sm:btn-sm btn-outline btn-primary"
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                {sidebarOpen ? 'Hide options menu' : 'Show options menu'}
              </button>
            </div>

            <div className={`grid items-start gap-3 ${sidebarOpen ? 'lg:grid-cols-[280px_1fr]' : ''}`}>
              <aside
                className={`${sidebarOpen ? 'block' : 'hidden'} max-h-[460px] overflow-y-auto rounded-xl border border-base-content/15 p-2`}
              >
                <h4 className={panelHeaderClass}>Options Menu</h4>

                {regularOptions.map((option) => {
                  const selected = selectedOptions.some((entry) => entry.algo === option.algo);
                  const detailsOpen = openPopoverAlgo === option.algo;

                  return (
                    <div
                      key={option.algo}
                      className={`mb-2 rounded-xl border p-2 ${
                        selected
                          ? 'border-primary/70 bg-primary/20'
                          : 'border-base-content/15 bg-base-100/40'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <button
                          type="button"
                          className="flex-1 text-left text-sm font-medium"
                          onClick={() => toggleOption(option)}
                        >
                          {option.shortName}
                        </button>

                        <button
                          type="button"
                          className="btn btn-circle btn-xs btn-ghost border border-base-content/30"
                          onClick={() => setOpenPopoverAlgo((prev) => (prev === option.algo ? '' : option.algo))}
                          aria-label={`View details for ${option.shortName}`}
                          aria-expanded={detailsOpen}
                        >
                          i
                        </button>
                      </div>

                      {detailsOpen && (
                        <div className="mt-2 rounded-lg border border-base-content/20 bg-base-200/55 p-2 text-xs text-base-content/80">
                          {option.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </aside>

              <div className="flex max-h-[460px] flex-col items-stretch justify-start gap-3 overflow-y-auto rounded-xl border border-base-content/15 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="m-0 text-sm font-bold uppercase tracking-wider text-base-content/90">Option Fields</h4>
                  <p className={subtleTextClass}>Select 1 or more options. 2-4 options are recommended.</p>
                </div>

                {selectedRegularOptions.length === 0 && (
                  <p className={subtleTextClass}>Select at least one option from the menu to unlock generation.</p>
                )}

                {selectedRegularOptions.map((option) => (
                  <div
                    key={`field-${option.algo}`}
                    className={`grid gap-1.5 rounded-xl border bg-base-100/35 p-3 ${
                      fieldErrors[option.algo]
                        ? 'border-error/60'
                        : 'border-base-content/15'
                    } ${activeOptionAlgo === option.algo ? 'ring-1 ring-info/60' : ''}`}
                  >
                    <label className="text-sm font-medium text-base-content/90" htmlFor={option.algo}>
                      {option.label}
                    </label>

                    {option.type === 'special-date' ? (
                      <>
                        <input
                          id={option.algo}
                          type="date"
                          className={inputClass}
                          value={inputValues.specialDate?.date || ''}
                          onChange={(event) => handleSpecialDateChange('date', event.target.value)}
                        />

                        <div className="join">
                          <button
                            type="button"
                            className={`join-item btn btn-xs sm:btn-sm ${
                              (inputValues.specialDate?.format || 'digits') === 'digits'
                                ? 'btn-primary'
                                : 'btn-outline btn-primary'
                            }`}
                            onClick={() => handleSpecialDateChange('format', 'digits')}
                          >
                            01/15/25 -&gt; 11525
                          </button>

                          <button
                            type="button"
                            className={`join-item btn btn-xs sm:btn-sm ${
                              (inputValues.specialDate?.format || 'digits') === 'monthText'
                                ? 'btn-primary'
                                : 'btn-outline btn-primary'
                            }`}
                            onClick={() => handleSpecialDateChange('format', 'monthText')}
                          >
                            Jan1525
                          </button>
                        </div>
                      </>
                    ) : option.type === 'year-toggle' ? (
                      <>
                        <input
                          id={option.algo}
                          type="text"
                          inputMode="numeric"
                          maxLength={4}
                          className={inputClass}
                          value={typeof inputValues[option.algo] === 'object' ? inputValues[option.algo]?.value || '' : ''}
                          placeholder={option.placeholder || ''}
                          onChange={(event) => handleInputChange(option.algo, event.target.value)}
                        />
                        <label className="label cursor-pointer justify-start gap-2 p-0 text-xs text-base-content/75">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-xs checkbox-primary"
                            checked={Boolean(typeof inputValues[option.algo] === 'object' && inputValues[option.algo]?.reverse)}
                            onChange={(event) => handleReverseToggleChange(option.algo, event.target.checked)}
                          />
                          <span className="label-text text-xs text-base-content/75">
                            {option.reverseLabel || 'Reverse year'}
                          </span>
                        </label>
                      </>
                    ) : option.type === 'mmdd-toggle' ? (
                      <>
                        <input
                          id={option.algo}
                          type="text"
                          inputMode="numeric"
                          maxLength={5}
                          className={inputClass}
                          value={typeof inputValues[option.algo] === 'object' ? inputValues[option.algo]?.value || '' : ''}
                          placeholder={option.placeholder || ''}
                          onChange={(event) => handleInputChange(option.algo, event.target.value)}
                        />
                        <label className="label cursor-pointer justify-start gap-2 p-0 text-xs text-base-content/75">
                          <input
                            type="checkbox"
                            className="checkbox checkbox-xs checkbox-primary"
                            checked={Boolean(typeof inputValues[option.algo] === 'object' && inputValues[option.algo]?.reverse)}
                            onChange={(event) => handleReverseToggleChange(option.algo, event.target.checked)}
                          />
                          <span className="label-text text-xs text-base-content/75">
                            {option.reverseLabel || 'Reverse MMDD'}
                          </span>
                        </label>
                      </>
                    ) : option.type === 'number' ? (
                      <input
                        id={option.algo}
                        type="number"
                        className={inputClass}
                        value={inputValues[option.algo] || ''}
                        placeholder={option.placeholder || ''}
                        onChange={(event) => handleInputChange(option.algo, event.target.value)}
                      />
                    ) : (
                      <input
                        id={option.algo}
                        type={option.type}
                        className={inputClass}
                        inputMode={option.algo === 'hometownZipTail' ? 'numeric' : undefined}
                        maxLength={option.algo === 'hometownZipTail' ? 5 : undefined}
                        value={inputValues[option.algo] || ''}
                        placeholder={option.placeholder || ''}
                        onChange={(event) => handleInputChange(option.algo, event.target.value)}
                      />
                    )}

                    {fieldErrors[option.algo] && (
                      <p className="m-0 text-xs text-error">{fieldErrors[option.algo]}</p>
                    )}
                  </div>
                ))}

                {generationError && (
                  <div className="alert alert-warning p-2 text-sm">
                    <span>{generationError}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className={subtleTextClass}>
            Security note: avoid exact public facts. Slightly customize your inputs so only you know the pattern.
          </p>
        </section>

        <section
          className={`${cardClass} sticky top-4 self-start max-h-[calc(100vh-2rem)] ${
            explanationExpanded ? 'overflow-auto' : 'overflow-hidden'
          }`}
        >
          <h2 className="m-0 text-xl font-bold">Generated Password</h2>

          <div className="mb-3 mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleGeneratePassword}
            >
              {fullPassword ? 'Regenerate' : 'Generate'}
            </button>

            <button
              type="button"
              className="btn btn-sm btn-ghost border border-base-content/25"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>

          <div className="join w-full">
            <input
              type="text"
              className="input input-bordered join-item w-full bg-base-200/65 font-mono"
              value={fullPassword}
              placeholder="Your password will appear here."
              readOnly
              aria-label="Generated password"
            />
            <button
              type="button"
              className="btn btn-secondary join-item"
              disabled={!fullPassword}
              onClick={copyToClipboard}
            >
              {copyStatus.type === 'success' ? 'Copied' : 'Copy'}
            </button>
          </div>

          {copyStatus.message && (
            <div className={`alert mt-2 p-2 text-sm ${copyStatus.type === 'error' ? 'alert-error' : 'alert-success'}`}>
              <span>{copyStatus.message}</span>
            </div>
          )}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-base-content/70">
            <p className="m-0">Length: {fullPassword.length}</p>
            <p className="m-0">Strength: {strength.label}</p>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-base-content/15">
            <div className={`h-full transition-[width] duration-300 ${strength.barClass}`} style={{ width: strength.width }} />
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className={`badge badge-sm ${strength.checks.uppercase ? 'badge-success' : 'badge-ghost'}`}>
              Uppercase
            </span>
            <span className={`badge badge-sm ${strength.checks.lowercase ? 'badge-success' : 'badge-ghost'}`}>
              Lowercase
            </span>
            <span className={`badge badge-sm ${strength.checks.number ? 'badge-success' : 'badge-ghost'}`}>
              Number
            </span>
            <span className={`badge badge-sm ${strength.checks.symbol ? 'badge-success' : 'badge-ghost'}`}>
              Symbol
            </span>
          </div>

          <p className={`${subtleTextClass} mt-3`}>Recipe: {recipe || 'No options generated yet.'}</p>

          <div className="mt-3">
            <button
              type="button"
              className="btn btn-sm btn-ghost border border-base-content/25"
              onClick={() => setExplanationExpanded((prev) => !prev)}
            >
              {explanationExpanded ? 'Hide Explanation' : 'Expand Explanation'}
            </button>
          </div>

          {explanationExpanded && passwordParts.length > 0 && (
            <ul className="mt-3 list-disc pl-5 text-sm text-base-content/80">
              {passwordParts.map((part, index) => (
                <li key={`${part.source}-${index}`}>
                  <strong>{part.source}:</strong> {part.value}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default Home;
