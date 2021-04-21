import React, { useState } from 'react'
import { ActionBtn } from './buttons'

// parent API
export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent
        ? <div className='row'>
            <div className='col-11 mx-auto my-2 p-3 border'>
                <p className='mb-0 text-muted'>Retweet</p>
                {/* hiddenActions === true */}
                <Tweet hiddenActions tweet={tweet.parent} />
            </div>
        </div>
        : null
}

// key as props
export function Tweet(props) {
    const { tweet, didRetweet, hiddenActions } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'

    const path = window.location.pathname
    var match = path.match(/(?<tweetid>\d+)/) // /(?P<id>\d+)/ in python
    // match = e.g ["111", "111", index: 1, input: "/111", groups: {…}]
    const urlTweetId = match ? match.groups.tweetid : -1 // if match === true(exist) return ? or :

    // handle view link button
    const isDetail = `${tweet.id}` === `${urlTweetId}` // return true or false
    const handleDetailLink = (event) => {
        event.preventDefault()
        // handle link redirection
        window.location.href = `${tweet.id}`
    }

    // display parent tweet
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
                <p>
                    {tweet.user.first_name} {' '}
                    {tweet.user.last_name} {''}
                    @{tweet.user.username} {''}
                </p>

                < p >{tweet.content}</p >
                < ParentTweet tweet={tweet} />
            </div>

            <div className='btn btn-group px-0'>
                {(actionTweet && hiddenActions !== true) &&
                    <React.Fragment>
                        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'like', display: 'Likes' }} />
                        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'unlike', display: 'UnLikes' }} />
                        <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{ type: 'retweet', display: 'Retweet' }} />
                    </React.Fragment>}
                {isDetail === true ? null : <button id="viewLink" className="btn btn-outline-primary btn-sm" onClick={handleDetailLink}> View </button>}
            </div>
        </div >

    );
}
