// login auth 
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

const Lookup = (method, endpoint, callback, data) => {
    let jsonData;
    if (data) {
        //  converts a JavaScript object or value to a JSON string
        jsonData = JSON.stringify(data)
    }
    const xml = new XMLHttpRequest()
    const url = `http://localhost:8000/api/${endpoint}`
    xml.responseType = 'json'
    xml.open(method, url)
    xml.setRequestHeader('Content-Type', 'application/json')

    if (csrftoken) {
        xml.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
        xml.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xml.setRequestHeader('X-CSRFToken', csrftoken)
        //only work on django, not on react local site
        // JWT token work on the react local site
    }

    xml.onload = function () {
        callback(xml.response, xml.status)
    }
    xml.onerror = function () {
        alert("An error occured. Please try again later")
    }
    xml.send(jsonData)
}

export function loadTweets(callback) {
    Lookup("GET", 'tweets/create/', callback)
}

export const createTweet = (newTweet, callback) => {
    Lookup("POST", 'tweets/', callback, { content: newTweet })
}