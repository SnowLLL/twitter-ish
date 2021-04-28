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
        ? <div className="card shadow-sm">
            <div className="card-body">
                <div className="row" style={{ height: '3rem' }}>
                    <div className="col-1 align-middle my-auto"><UserPicture user={user} hiddeLink /></div>
                    <p className="col-9 align-middle mx-auto"> <UserDisplay user={user} includeFullName hiddeLink /></p>
                </div>
                <div className="card-text mt-4">
                    <p> <DisplayCount className="fw-bold">{user.follower_count}</DisplayCount> <span className="text-muted">{user.follower_count === 1 ? 'Follower' : 'Followers'}</span></p>
                    <p> <DisplayCount className="fw-bold">{user.following_count}</DisplayCount> <span className="text-muted">Following</span></p>
                    <p>{user.location}</p>
                    <p>{user.bio}</p>
                </div>

                <button className="btn btn-primary container" onClick={handleFollowToggle}>{currentV}</button>
            </div>
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