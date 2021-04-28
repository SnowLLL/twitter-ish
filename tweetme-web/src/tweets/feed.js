import React, { useEffect, useState } from 'react'
import { apiTweetFeed } from './lookup'
import { Tweet } from './detail'


// Tweet sections
export const TweetsFeedList = (props) => {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
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
                    setNextUrl(response.next)
                    setTweetsInit(response.results) // from api views see response,you can know results
                    setTweetsDidset(true)
                }
            }
            apiTweetFeed(handleTweetListLookup)
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

    const handleNextPage = (e) => {
        e.preventDefault()
        if (nextUrl !== null) {
            const handleBackendNextPageButton = (response, status) => {
                if (status === 200) {
                    setNextUrl(response.next)
                    // keep on loading: scroll down to display new page tweets
                    const newTweetsList = [...tweets].concat(response.results)
                    setTweetsInit(newTweetsList) // from api views see response,you can know results
                    setTweets(newTweetsList)
                }
            }
            apiTweetFeed(handleBackendNextPageButton, nextUrl)
        }
    }
    return <React.Fragment>
        {tweets.map((item, index) => {
            return <Tweet
                tweet={item}
                didRetweet={handleDidRetweet}
                className='my-5 py-5 border bg-white text-dark'
                key={`${index}-{ item.id }`} /> // `` NOT ''
        })}
        {nextUrl != null && <button className="btn btn-outline-primary d-block mx-auto" onClick={handleNextPage}>Next Page</button>}
    </React.Fragment>
}