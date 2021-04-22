import React from 'react'

// as a button
export const UserLink = (props) => {
    const { username } = props
    const handleUserLink = (e) => {
        window.location.href = `/profile/${username}`
    }
    return <span className="pointer" onClick={handleUserLink}>
        {props.children}
    </span>
}

// 
export const UserDisplay = (props) => {
    const { user, includeFullName } = props
    // if includeFullName ==== true namedisplay = ?....
    const nameDisplay = includeFullName === true ? `${user.first_name} ${user.last_name} ` : null
    return <React.Fragment>
        {nameDisplay}
        <UserLink username={user.username}>@{user.username}</UserLink>
    </React.Fragment>
}

export const UserPicture = (props) => {
    const { user } = props
    return <UserLink username={user.username}>
        < span className="px-3 py-2 rounded-circle bg-dark text-white" >
            {/* display the first letter of username */}
            {user.username[0]}
        </span >
    </UserLink>
}
