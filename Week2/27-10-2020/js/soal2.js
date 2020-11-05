const getMonth = (callback) => {
    setTimeout(() => {
        let error = false
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December']
        if (!error) {
            callback(null, month)
        } else {
            callback(new Error('Sorry Data Not Found'), [])
        }
    }, 2000)
}

const callback = (error, month) => {
    if (month.length > 0) {
        const monthCopy = month.map((el) => {
            console.log(el)
        })
    } else {
        console.log(error.message)
    }
}
getMonth(callback)