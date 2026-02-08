import React from 'react'; 
import { useTheme } from './ThemeContext';

const ThemeToggleButton = () => { 
  const { toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Toggle Theme</button>; 
};

const App = () => (

  <div>
    <h1>Welcome to Themed App</h1> 
    <ThemeToggleButton /> 
  </div> 
);

export default App; 