import { BackendLookup } from '../lookup'

export const apiTweetCreate = (newTweet, callback) => {
    BackendLookup("POST", 'tweets/create/', callback, { content: newTweet })
}

export const apiTweetAction = (tweetId, action, callback) => {
    const data = { id: tweetId, action: action }
    BackendLookup("POST", 'tweets/action', callback, data)
}

export function apiTweetList(callback) {
    BackendLookup("GET", 'tweets/', callback)
}