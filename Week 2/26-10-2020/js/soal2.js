const searchName = (kata, jumlah, callback) => {
    const name = [
        'Abigail', 'Alexandra', 'Alison', 'Amanda', 'Angela', 'Bella', 'Carol',
        'Caroline', 'Carolyn', 'Deirdre', 'Diana', 'Elizabeth', 'Ella', 'Faith',
        'Olivia', 'Penelope'
    ]
    if (kata && jumlah && callback) {
        if (typeof kata === 'string' && typeof jumlah === 'number' && typeof callback === 'function') {
            let nameCopy = name.filter((el) => {
                let el2 = el.toUpperCase()
                let kata2 = kata.toUpperCase()
                return el2.includes(kata2)
            })
            if (nameCopy.length >= jumlah) {
                nameCopy.splice(jumlah, nameCopy.length - jumlah)
            }
            callback(`Menampilkan ${jumlah} hasil pencarian kalimat dari kata '${kata}' adalah :\n${nameCopy.join(', ')}`)
        } else {
            callback('argumen yang dimasukkan tidak valid, harap isi dengan benar')
        }
    } else {
        callback('Argumen yang dikirim tidak boleh kosong')
    }
}

const callback = (res) => {
    console.log(res)
}
searchName('zz', 4, callback)