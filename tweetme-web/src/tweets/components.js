import React, { useEffect, useState } from 'react'
import { apiTweetList, apiTweetCreate, apiTweetAction } from './lookup'

//Form Sections
export const TweetForm = (props) => {
    var textAreaRef = React.createRef()
    const [newtweets, setNewtweets] = useState([])
    const handleSumbitForm = (event) => {
        event.preventDefault()
        const newValue = textAreaRef.current.value
        console.log('new value: ', newValue)
        var tempNewtweets = [...newtweets] // create an array of new tweets

        // backend API response
        const BackendTweetCreateUpdate = (response, status) => {
            console.log(response, status)
            if (status === 201) {
                tempNewtweets.unshift(response)
                setNewtweets(tempNewtweets)
            }
            else {
                console.log(response)
                alert("An error occured")
            }
        }
        // change this to a server side call
        apiTweetCreate(newValue, BackendTweetCreateUpdate)
        textAreaRef.current.value = ''
    }

    return (
        <div className={props.className}>
            <div className="col-12 mb-3">
                <form onSubmit={handleSumbitForm}>
                    <textarea required className='form-control mt-5' name="tweet" ref={textAreaRef}></textarea>
                    <button type="submit" className="btn btn-primary my-2">Tweet</button>
                </form>
            </div>
            <TweetsList newtweets={newtweets} />
        </div>
    );
}

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
            apiTweetList(handleTweetListLookup)
        }
    }, [tweetsInit, tweetsDidset, setTweetsDidset])

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

// Action: like unlike retween btns
export function ActionBtn(props) {
    const { tweet, action, didPerformAction } = props
    const likes = tweet.likes ? tweet.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'ACTION'
    //backend 
    const handleBackendActionEvent = (response, status) => {
        console.log(response, status)
        if ((status === 200 || 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    }
    const handleActionClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleBackendActionEvent)
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : `${actionDisplay}`
    return <button className={className} onClick={handleActionClick}>{display}</button>
}

// key as props
export function Tweet(props) {
    const { tweet, didRetweet } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    // display 
    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {
            setActionTweet(newActionTweet)

        } else if (status === 201) {
            if (didRetweet) {
                didRetweet(newActionTweet)
            }
        }
    }
    return (
        <div className={className}>
            <div>
                < p >{tweet.id} - {tweet.content}</p >
                < ParentTweet tweet={tweet} />
            </div>
            {actionTweet &&
                <div className="btn btn-primary">
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', display: 'Likes' }} />
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', display: 'UnLikes' }} />
                    <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', display: 'Retweet' }} />
                </div>
            }
        </div >

    );
}

// parent API
export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent
        ? <div className='row'>
            <div className='col-11 mx-auto my-2 p-3 border'>
                <p className='mb-0 text-muted'>Retweet</p>
                <Tweet tweet={tweet.parent} />
            </div>
        </div>
        : null
}