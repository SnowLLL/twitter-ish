import { BackendLookup } from '../lookup'

export const apiTweetCreate = (newTweet, callback) => {
    BackendLookup("POST", 'tweets/create/', callback, { content: newTweet })
}

export const apiTweetAction = (tweetId, action, callback) => {
    const data = { id: tweetId, action: action }
    BackendLookup("POST", 'tweets/action', callback, data)
}

export function apiTweetDetail(tweetId, callback) {
    BackendLookup("GET", `tweets/${tweetId}`, callback)
}

export function apiTweetList(username, callback) {
    let endpoint = 'tweets/'
    if (username) {
        endpoint = `tweets/?username=${username}`
    }
    BackendLookup("GET", endpoint, callback)
}