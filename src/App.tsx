import React from 'react';
import './App.css';
import SearchSection from './ui/components/sections/SearchSection';
import ResultSection from './ui/components/sections/ResultSection';

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchSection />
      <ResultSection />
    </div>
  );
}

export default App;
