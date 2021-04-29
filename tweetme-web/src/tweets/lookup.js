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

export function apiTweetList(username, callback, nextUrl) {
    let endpoint = 'tweets/'
    if (username) {
        endpoint = `tweets/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("http://localhost:8000/api/", "")
        endpoint = nextUrl.replace("http://my-twitter-ish.herokuapp.com:8000/api/", "")
    }
    BackendLookup("GET", endpoint, callback)
}

export function apiTweetFeed(callback, nextUrl) {
    let endpoint = 'tweets/feed'
    if (nextUrl !== null && nextUrl !== undefined) {
        // endpoint = nextUrl.replace("http://localhost:8000/api/", "")
        endpoint = nextUrl.replace("http://my-twitter-ish.herokuapp.com:8000/api/", "")
    }
    BackendLookup("GET", endpoint, callback)
}