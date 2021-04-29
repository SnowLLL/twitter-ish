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

export const BackendLookup = (method, endpoint, callback, data) => {
    let jsonData;
    if (data) {
        //  converts a JavaScript object or value to a JSON string
        jsonData = JSON.stringify(data)
    }
    const xml = new XMLHttpRequest()
    // const url = `http://localhost:8000/api/${endpoint}`
    const url = `https://my-twitter-ish.herokuapp.com/api/${endpoint}`
    xml.responseType = 'json'
    xml.open(method, url)
    xml.setRequestHeader('Content-Type', 'application/json')

    if (csrftoken) {
        // xml.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest')
        xml.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xml.setRequestHeader('X-CSRFToken', csrftoken)
        //only work on django, not on react local site
        // JWT token work on the react local site
    }

    xml.onload = function () {
        if (xml.status === 403 && xml.response) {
            var detail = xml.response.detail
            if (detail === "Authentication credentials were not provided.") {
                // return index of a string in an array: -1 = not exist
                // if not, the page will keep refreshing
                if (window.location.href.indexOf("login") === -1) {
                    window.location.href = '/login?showLoginRequired=true'
                    console.log(detail)
                }
            }
        }
        callback(xml.response, xml.status)
    }
    xml.onerror = function (e) {
        console.log('error: ', e)
        alert("An error occured. Please try again later")
    }
    xml.send(jsonData)
}