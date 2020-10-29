const getData = (method, url, callback) => {
    const ajax = new XMLHttpRequest();

    ajax.open(method, url)
    ajax.send()

    ajax.onload = () => {
        const results = JSON.parse(ajax.responseText)
        callback(results)
    }
}

const callback = (results) => {
    results.map((el) => {
        console.log(el.title)
    })
    // console.log(results)
}
getData('GET', 'https://jsonplaceholder.typicode.com/posts', callback)