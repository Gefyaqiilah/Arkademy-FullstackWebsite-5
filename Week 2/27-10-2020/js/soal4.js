const getData = (url, method) => {
    fetch(url, {
        method: method
    })
        .then(responseJson => {
            return responseJson.json()
        })
        .then(response => {
            const name = response.map((el) => {
                console.log(el.name)
            })
        })
        .catch(error => {
            console.log('URL atau Koneksi bermasalah')
        })
}
getData('https://jsonplaceholder.typicode.com/users', 'GET')
