import React, { useState, useEffect } from 'react'
import { TweetsList } from './list'
import { TweetCreate } from './create'
import { apiTweetDetail } from './lookup'
import { Tweet } from './detail'

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

// Tweet Detail Section
export const TweetDetailComponent = (props) => {
    const { tweetId } = props
    const [didLookup, setDidLookup] = useState(false)
    const [tweet, setTweet] = useState(null)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setTweet(response)
        } else {
            alert("There was an error finding your tweet.")
        }
    }

    useEffect(() => {
        if (didLookup === false) {
            apiTweetDetail(tweetId, handleBackendLookup)
            setDidLookup(true)
        }
    }, [tweetId, didLookup, setDidLookup])
    return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}