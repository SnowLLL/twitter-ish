import React from 'react'
import { apiTweetAction } from './lookup'

// Action: like unlike retween btns
export function ActionBtn(props) {
    const { tweet, action, didPerformAction } = props
    const likes = tweet.likes ? tweet.likes : 0
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'ACTION'
    //backend 
    const handleBackendActionEvent = (response, status) => {
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