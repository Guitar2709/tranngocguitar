import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './CurrencySwapForm.css'; // Import custom styles

interface TokenOption {
  label: string;
  value: string;
  icon: string;
}

interface TokenPrice {
  currency: string;
  price: number;
}

const CurrencySwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<TokenOption[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [fromToken, setFromToken] = useState<TokenOption | null>(null);
  const [toToken, setToToken] = useState<TokenOption | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<{ value: string; icon: string; name: string } | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://interview.switcheo.com/prices.json');
        const tokenPrices: TokenPrice[] = response.data;

        const pricesMap = tokenPrices.reduce((acc, token) => {
          acc[token.currency] = token.price;
          return acc;
        }, {} as { [key: string]: number });

        const tokenIcons = tokenPrices.map((token) => ({
          label: token.currency,
          value: token.currency,
          icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`,
        }));

        setPrices(pricesMap);
        setTokens(tokenIcons);
      } catch (error) {
        console.error('Error fetching token prices:', error);
      }
    };

    fetchPrices();
  }, []);

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) {
      setError('Please select tokens and enter an amount.');
      setConvertedAmount(null); // Clear converted amount on error
      return;
    }

    const fromPrice = prices[fromToken.value];
    const toPrice = prices[toToken.value];

    if (!fromPrice || !toPrice) {
      setError('Price information is not available for selected tokens.');
      setConvertedAmount(null); // Clear converted amount on error
      return;
    }

    const converted = (parseFloat(amount) * fromPrice) / toPrice;
    setConvertedAmount({
      value: `${converted.toFixed(2)}`,
      icon: toToken.icon,
      name: toToken.label,
    });
    setError('');
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2 className="text-2xl font-bold mb-4">Currency Swap</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">From</label>
          <Select
            options={tokens}
            value={fromToken}
            onChange={(option) => setFromToken(option as TokenOption)}
            formatOptionLabel={(option) => (
              <div className="flex items-center">
                <img src={option.icon} alt={option.label} className="w-5 h-5 mr-2" />
                {option.label}
              </div>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">To</label>
          <Select
            options={tokens}
            value={toToken}
            onChange={(option) => setToToken(option as TokenOption)}
            formatOptionLabel={(option) => (
              <div className="flex items-center">
                <img src={option.icon} alt={option.label} className="w-5 h-5 mr-2" />
                {option.label}
              </div>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <div className="amount-input">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 text-lg"
            />
          </div>
        </div>
        <button
          onClick={handleSwap}
          className="swap-button"
        >
          Swap
        </button>
        {(error || convertedAmount) && (
          <div className={`mt-4 p-4 rounded-md flex items-center ${error ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
            {error ? (
              <p>{error}</p>
            ) : (
              convertedAmount && (
                <>
                  <p>Converted Amount: {convertedAmount.value} </p>
                  <img src={convertedAmount.icon} alt="Converted Coin" className="w-5 h-5 mx-2" />
                  <p>{convertedAmount.name}</p>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencySwapForm;
