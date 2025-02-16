import React from 'react';
import logo from './logo.svg';
import CurrencySwapForm from './components/CurrencySwapForm/CurrencySwapForm';
import './App.css';
import './index.css'; // Import Tailwind CSS

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CurrencySwapForm />
    </div>
  );
};

export default App;
