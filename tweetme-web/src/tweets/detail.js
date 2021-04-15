import React, { useState } from 'react'
import { ActionBtn } from './buttons'

// key as props
export function Tweet(props) {
    const { tweet, didRetweet, hiddenActions } = props
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
            {(actionTweet && hiddenActions !== true) &&
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
                {/* hiddenActions === true */}
                <Tweet hiddenActions tweet={tweet.parent} />
            </div>
        </div>
        : null
}