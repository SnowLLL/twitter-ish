export function loadTweets(callback) {
    const xml = new XMLHttpRequest()
    const method = "GET" //'POST'
    const url = "http://localhost:8000/api/tweets/"
    const responseType = 'json'
    xml.responseType = responseType
    xml.open(method, url)
    xml.onload = function () {
        callback(xml.response, xml.status)
    }
    xml.onerror = function () {
        alert("An error occured. Please try again later")
    }
    xml.send()
}
