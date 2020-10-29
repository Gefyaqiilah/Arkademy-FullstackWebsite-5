const getMonth = (callback) => {
    setTimeout(() => {
        let error = true
        let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December']
        if (!error) {
            callback(null, month)
        } else {
            callback(new Error('Sorry Data Not Found'), []) //ada yang salah penempatan array kosong
        }
    })
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