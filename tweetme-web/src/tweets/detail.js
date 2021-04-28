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
    let className = props.className ? props.className : 'col-10 mx-auto'
    className = isRetweet === true ? `${className} border rounded` : className

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
            {isRetweet === true && <div className='mb-3'> <span className='small text-muted p-2'>Retweet via <UserDisplay user={retweeter} /></span></div>}
            <div className="container">

                <div className="row text-center" style={{ height: '3rem' }}>
                    <div className="col-2 align-middle my-auto">
                        <span className="d-grid"><UserPicture user={tweet.user} /></span>
                    </div>
                    <div className="col-2 align-middle">
                        <UserDisplay includeFullName user={tweet.user} />
                    </div>
                </div>

                {/* All content here */}
                <div className="card-body mt-3">
                    < p className="card-text">{tweet.content}</p >
                    <div className="mx-auto">< ParentTweet tweet={tweet} retweeter={tweet.user} /></div>
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
