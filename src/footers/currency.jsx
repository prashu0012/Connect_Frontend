import { useState } from 'react';
import Flag from 'react-world-flags';

const GlobalCurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');

  // Expanded country list with regional currencies
  const currencies = [
    // Asian
    { code: 'IN', symbol: 'INR', name: 'Indian Rupee', region: 'Asia' },
    { code: 'CN', symbol: 'CNY', name: 'Chinese Yuan', region: 'Asia' },
    { code: 'JP', symbol: 'JPY', name: 'Japanese Yen', region: 'Asia' },
    { code: 'KR', symbol: 'KRW', name: 'South Korean Won', region: 'Asia' },
    { code: 'SG', symbol: 'SGD', name: 'Singapore Dollar', region: 'Asia' },
    
    // European
    { code: 'GB', symbol: 'GBP', name: 'British Pound', region: 'Europe' },
    { code: 'DE', symbol: 'EUR', name: 'Euro (Germany)', region: 'Europe' },
    { code: 'FR', symbol: 'EUR', name: 'Euro (France)', region: 'Europe' },
    { code: 'CH', symbol: 'CHF', name: 'Swiss Franc', region: 'Europe' },
    
    // African
    { code: 'NG', symbol: 'NGN', name: 'Nigerian Naira', region: 'Africa' },
    { code: 'ZA', symbol: 'ZAR', name: 'South African Rand', region: 'Africa' },
    { code: 'EG', symbol: 'EGP', name: 'Egyptian Pound', region: 'Africa' },
    
    // Americas
    { code: 'US', symbol: 'USD', name: 'US Dollar', region: 'Americas' },
    { code: 'CA', symbol: 'CAD', name: 'Canadian Dollar', region: 'Americas' },
    { code: 'BR', symbol: 'BRL', name: 'Brazilian Real', region: 'Americas' },
    
    // Oceania
    { code: 'AU', symbol: 'AUD', name: 'Australian Dollar', region: 'Oceania' },
    { code: 'NZ', symbol: 'NZD', name: 'New Zealand Dollar', region: 'Oceania' }
  ];

  // Group currencies by region
  const groupedCurrencies = currencies.reduce((acc, currency) => {
    if (!acc[currency.region]) acc[currency.region] = [];
    acc[currency.region].push(currency);
    return acc;
  }, {});

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative ">
        {/* Flag-only trigger */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          <Flag 
            code={currencies.find(c => c.symbol === selectedCurrency)?.code}
            className="w-8 h-5 rounded shadow-lg"
          />
        </div>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-4  w-64 bg-white rounded-lg shadow-2xl border max-h-[40vh] overflow-y-auto">
            {Object.entries(groupedCurrencies).map(([region, regionCurrencies]) => (
              <div key={region}>
                <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 sticky top-0">
                  {region}
                </div>
                {regionCurrencies.map((currency) => (
                  <div
                    key={currency.symbol}
                    onClick={() => {
                      setSelectedCurrency(currency.symbol);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-t"
                  >
                    <Flag code={currency.code} className="w-6 h-4 rounded" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{currency.symbol}</div>
                      <div className="text-xs text-gray-500">{currency.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalCurrencySelector;