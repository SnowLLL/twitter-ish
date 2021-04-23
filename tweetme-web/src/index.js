import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { TweetForm, TweetDetailComponent, FeedFormComponents } from './tweets';
import reportWebVitals from './reportWebVitals';


const e = React.createElement
const rId = document.getElementById('tweetme');
const feedId = document.getElementById('tweetme-feed');
const TweetDetailElement = document.querySelectorAll('.tweetme-detail')

// add children or props to TweetForm component
// ReactDOM.render(e(App, rId.dataset), rId);
// The same style -> sometimes it only render the first one
if (rId) {
    ReactDOM.render(e(TweetForm, rId.dataset), rId);
    console.log(rId)
}

if (feedId) {
    ReactDOM.render(e(FeedFormComponents, feedId.dataset), feedId);
    console.log(feedId)
}

TweetDetailElement.forEach(container => {
    ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
    console.log(container)
})



// ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
