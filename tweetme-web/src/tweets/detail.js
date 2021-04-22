import React, { useState } from 'react'
import { ActionBtn } from './buttons'
import { UserPicture, UserDisplay } from '../profiles'

// parent API
export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent
        ? <Tweet isRetweet hiddenActions retweeter={props.retweeter} tweet={tweet.parent} />
        : null
    // isRetweet,hiddenActions === true
}

// key as props
export function Tweet(props) {
    const { tweet, didRetweet, hiddenActions, isRetweet, retweeter } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    // when parent here, change style -> add border
    let className = props.className ? props.className : 'col-10 col-md-6'
    className = isRetweet === true ? `${className} border rounded p-2` : className

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
            {isRetweet === true && <div className='mb-3'> <span className='small text-muted'>Retweet via <UserDisplay user={retweeter} /></span></div>}
            <div className="d-flex">
                <div className='col-1'>
                    <UserPicture user={tweet.user} />
                </div>
                <div className="col-11">
                    {/* All content here */}
                    <div>
                        <p>
                            <UserDisplay includeFullName user={tweet.user} />
                        </p>

                        < p >{tweet.content}</p >
                        < ParentTweet tweet={tweet} retweeter={tweet.user} />
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
                </div>
            </div>
        </div >

    );
}
