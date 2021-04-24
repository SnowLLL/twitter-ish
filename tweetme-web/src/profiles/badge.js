import React, { useEffect, useState } from 'react'
import { apiProfileDetail, apiProfileFollowToggle } from './lookup'
import { UserDisplay, UserPicture } from './components'
import { DisplayCount } from './utils'


export const ProfileBadge = (props) => {
    // user means user's profile 
    const { user, didFollowToggle, profileLoading } = props
    let currentV = (user && user.is_following) ? "unfollow" : 'follow'
    currentV = profileLoading ? 'Loading' : currentV
    const handleFollowToggle = (e) => {
        e.preventDefault()
        if (didFollowToggle && !profileLoading) {
            didFollowToggle(currentV)
        }
    }
    return user
        ? <div>
            <UserPicture user={user} hiddeLink />
            <p> <UserDisplay user={user} includeFullName hiddeLink /></p>
            <p> <DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count === 1 ? 'follower' : 'followers'} </p>
            <p> <DisplayCount>{user.following_count}</DisplayCount> following</p>
            <p>{user.location}</p>
            <p>{user.bio}</p>
            <button className="btn btn-primary" onClick={handleFollowToggle}>{currentV}</button>
        </div>
        : null
}
export const ProfileBadgeComponet = (props) => {
    const { username } = props
    const [didLookup, setDidLookup] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)
    const handleBackendLookup = (response, status) => {
        if (status === 200) {
            setProfile(response)
        }
    }

    useEffect(() => {
        if (didLookup === false) {
            apiProfileDetail(username, handleBackendLookup)
            setDidLookup(true)
        }
    }, [username, didLookup, setDidLookup])

    // backend side
    const handleNewFollow = (actionVerb) => {
        apiProfileFollowToggle(username, actionVerb, (response, status) => {
            console.log(response, status)
            // update interface immediately
            if (status === 200) {
                setProfile(response)
            }
            setProfileLoading(false)
        })
        setProfileLoading(true)
    }

    return didLookup === false
        ? 'Loading...'
        : profile
            ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading} />
            : null
    // <Tweet tweet={tweet} className={props.className} />
}