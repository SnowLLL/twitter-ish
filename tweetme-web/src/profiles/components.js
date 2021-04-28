import React from 'react'

// as a button
export const UserLink = (props) => {
    const { username } = props
    const handleUserLink = (e) => {
        window.location.href = `/profile/${username}`
    }
    return <span className="pointer p-3" onClick={handleUserLink}>
        {props.children}
    </span>
}

// 
export const UserDisplay = (props) => {
    const { user, includeFullName, hiddeLink } = props
    // if includeFullName ==== true namedisplay = ?....
    const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null
    return <React.Fragment>
        <div className="pt-3">
            <span className="fw-bolder">{nameDisplay}</span>
            {hiddeLink === true ? `@${user.username}` : <UserLink username={user.username}>@{user.username}</UserLink>}
        </div>
    </React.Fragment>
}

export const UserPicture = (props) => {
    const { user, hiddeLink } = props
    const userPicSpan = <div>< span className="px-3 py-2 rounded-circle bg-dark text-white" >{user.username[0]}</span ></div>
    return hiddeLink === true ? userPicSpan : <UserLink username={user.username}>{userPicSpan}</UserLink>
}
