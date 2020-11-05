const palindrom = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
palindrom.question('Masukkan kalimat yang mau direverse : ', kalimat => {
    if (kalimat.length > 0) {
        let n = kalimat.length - 1
        let i = 0;
        let j = 0;
        let results = '';
        let subs = '';

        while (i <= n) {
            j = i
            while (j <= n && kalimat[j] !== ' ') {
                j++
            }
            subs = kalimat.substr(i, j - i)

            if (results.length === 0) {
                results = subs
            } else {
                results = subs + ' ' + results
            }

            i = j + 1
        }
        console.log(results)
    } else {
        console.log('Maaf Input tidak boleh kosong!');
    }
    palindrom.close()
})
