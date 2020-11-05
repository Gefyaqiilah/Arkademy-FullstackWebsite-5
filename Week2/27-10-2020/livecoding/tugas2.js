const getData = (method, url, callback) => {
    const ajax = new XMLHttpRequest();

    ajax.open('GET', 'https://jsonplaceder.typicode.com/posts')
    ajax.send()

    ajax.onreadystatechange = () => {
        return new Promise((resolve, reject) => {
            if (ajax.status === 200) {
                const results = JSON.parse(ajax.responseText)
                resolve(results)
            } else {
                reject(new Error('Koneksi atau URL bermasalah'))
            }
        })
            .then(res => {
                res.map((el) => {
                    console.log(el.title)
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }
}
getData()