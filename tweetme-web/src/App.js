import React from 'react'
import './App.css';
// import only one folder b/c they do have index.js export for every export
import { TweetForm } from './tweets'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetForm />
        </div>
      </header>
    </div>
  );
}

export default App;
