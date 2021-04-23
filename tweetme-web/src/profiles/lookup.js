import { BackendLookup } from '../lookup'

export function apiProfileDetail(username, callback) {
    BackendLookup("GET", `profiles/${username}`, callback)
}