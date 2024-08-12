import { useState } from 'react';

import './App.css';
import Weather from './Weather';


function App() {
  console.log("App rendered");
  
  return (
    <div>
      <Weather/>
    </div>
  );
}

export default App;
