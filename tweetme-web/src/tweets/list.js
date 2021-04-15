import React, { useEffect, useState } from 'react'
import { apiTweetList } from './lookup'
import { Tweet } from './detail'

// Tweet sections
export const TweetsList = (props) => {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetsDidset, setTweetsDidset] = useState(false)
    useEffect(() => {
        const finalList = [...props.newtweets].concat(tweetsInit)
        if (tweets.length !== finalList.length) {
            setTweets(finalList)
        }
    }, [props.newtweets, tweets, tweetsInit])

    useEffect(() => {
        if (tweetsDidset === false) {
            // do my lookup
            const handleTweetListLookup = (response, status) => {
                if (status === 200) {
                    setTweetsInit(response)
                    setTweetsDidset(true)
                }
                else {
                    alert('there is an error')
                }
            }
            apiTweetList(props.username, handleTweetListLookup)
        }
    }, [tweetsInit, tweetsDidset, setTweetsDidset, props.username])

    const handleDidRetweet = (newTweet) => {
        const updatetweetsInit = [...tweetsInit]
        updatetweetsInit.unshift(newTweet)
        setTweetsInit(updatetweetsInit)

        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets) // why tweets not newTweet?
        setTweets(updateFinalTweets)
    }
    return tweets.map((item, index) => {
        return <Tweet
            tweet={item}
            didRetweet={handleDidRetweet}
            className='my-5 py-5 border bg-white text-dark'
            key={`${index}-{ item.id }`} /> // `` NOT ''
    })
}
