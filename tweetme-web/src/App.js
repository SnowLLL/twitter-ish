import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

function loadTweets(callback) {
  const xml = new XMLHttpRequest()
  const method = "GET" //'POST'
  const url = "http://localhost:8000/api/tweets/"
  const responseType = 'json'
  xml.responseType = responseType
  xml.open(method, url)
  xml.onload = function () {
    callback(xml.response, xml.status)
  }
  xml.onerror = function () {
    alert("An error occured. Please try again later")
  }
  xml.send()
}

// component as props
const Tweet = (props) => {
  const { tweet } = props
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  return (
    <div class={className}>
      < p >
        {tweet.id} - {tweet.content}
      </p >

    </div >
  );
}


function App() {
  const [tweets, setTweets] = useState([])
  useEffect(() => {
    // do my lookup
    const myCallback = (response, status) => {
      if (status === 200) {
        setTweets(response)
      }
    }
    loadTweets(myCallback)
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <p>
          {tweets.map((item, index) => {
            return <Tweet tweet={item} className='my-5 py-5 border bg-white text-dark' />
          })}
        </p>
      </header>
    </div>
  );
}

export default App;
