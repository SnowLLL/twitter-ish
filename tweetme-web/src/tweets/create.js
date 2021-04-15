import React from 'react'
import { apiTweetCreate } from './lookup'

export function TweetCreate(props) {
    var textAreaRef = React.createRef()
    const { didTweet } = props
    const handleSumbitForm = (event) => {
        event.preventDefault()
        const newValue = textAreaRef.current.value

        // backend API response
        const BackendTweetCreateUpdate = (response, status) => {
            if (status === 201) {
                didTweet(response)
            }
            else {
                console.log(response)
                alert("An error occured")
            }
        }
        // change this to a server side call
        apiTweetCreate(newValue, BackendTweetCreateUpdate)
        textAreaRef.current.value = ''
    }

    return (
        <div className={props.className}>
            <form onSubmit={handleSumbitForm}>
                <textarea required className='form-control mt-5' name="tweet" ref={textAreaRef}></textarea>
                <button type="submit" className="btn btn-primary my-2">Tweet</button>
            </form>
        </div>
    );

}