import React, { useState } from 'react'
import { TweetsList } from './list'
import { TweetCreate } from './create'

//Form Sections
export const TweetForm = (props) => {
    console.log(props)
    // from index.html data-can-tweet will automatically change to 'data-cantweet'
    // const { cantweet } = props

    const [newtweets, setNewtweets] = useState([])
    // change string to a boolean value
    const canTweet = props.cantweet === 'false' ? false : true

    const handleNewTweet = (newTweet) => {
        let tempNewtweets = [...newtweets] // create an array of new tweets
        tempNewtweets.unshift(newTweet)
        setNewtweets(newTweet)
    }

    return (
        <div className={props.className}>
            {canTweet === true &&
                <TweetCreate didtweet={handleNewTweet} className="col-12 mb-3" />}
            <TweetsList {...props} newtweets={newtweets} />
        </div>
    );
}