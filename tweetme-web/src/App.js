import React from 'react'
import './App.css';
// import only one folder b/c they do have index.js export for every export
import { TweetsList } from './tweets'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetsList />
        </div>
      </header>
    </div>
  );
}

export default App;
