const input = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
input.question('Masukkan kata yang mau dicek : ', kata => {
    let container = ''
    if (kata.length > 0) {

        for (let i = kata.length - 1; i >= 0; i--) {
            container += kata[i]
        }
        if (kata.toUpperCase() === container.toUpperCase()) {
            console.log(`Kata "${kata}" adalah Palindrom`)
        } else {
            console.log(`Kata "${kata}" Bukan Palindrom`)
        }
    } else {
        console.log('Maaf inputan kata belum dimasukkan..')
    }
    input.close()
})