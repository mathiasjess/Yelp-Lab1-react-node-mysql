import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

//  render Main component to App component
function App() {
  return (
  // Use Browser Router to route to different pages

    <BrowserRouter>
      <div className="App">
        {/* App Component Has a Child Component called Main */}
        <Main />
      </div>
    </BrowserRouter>
  );

}

// Export the App component so that it can be used in index.js

export default App;
