function startChat(tglAwalJanji, barangDijanjikan) {
    return new Promise((res, rej) => {
        console.log('#Day' + tglAwalJanji)
        if (typeof barangDijanjikan === 'string') {
            setTimeout(() => {
                res('Rudi : "Yah ' + barangDijanjikan + ' rudi sudah rusak, rudi pengen ' + barangDijanjikan + ' baru pah, boleh ga?"\n')
            }, 2000)
        } else {
            rej('argumen barang yang dijanjikan harus berupa string')
        }
    })
}
function chat1(barangDijanjikan, tglAkhirJanji) {
    return new Promise((res) => {
        setTimeout(() => {
            res('Ayah : "Kalau gaada halangan, insyaallah kita beli ' + barangDijanjikan + ' baru ' + tglAkhirJanji + ' hari kedepan dek"\n')
        }, 2000)
    })
}
function chat2() {
    return new Promise((res) => {
        setTimeout(() => {
            res('Rudi : "Alhamdulillah, mantap makasih yah :D"\n')
        }, 2000)

    })
}
function chat3(barangDijanjikan) {
    return new Promise((res) => {
        setTimeout(() => {
            res('Rudi : "Yah gimana buat beli ' + barangDijanjikan + 'nya? jadi beli kan?"\n')
        }, 2000)

    })
}
function chat4() {
    return new Promise((res, rej) => {
        let status = ''
        const cek = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        cek.question('* Apakah Uang nya terpakai atau tidak ? (Y/N) :', message => {
            status = message
            const pesan = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            })
            setTimeout(() => {
                pesan.question('Pesan ?', message => {
                    if (status === 'Y' || status === 'y') {
                        console.log('Ayah : "' + message + '"\n')
                        res(status)
                    } else if (status === 'N' || status === 'n') {
                        console.log('Ayah : "' + message + '"\n')
                        res(status)
                    } else {
                        rej('Hanya jawab dengan Y atau N')
                    }
                    pesan.close()
                })
            }, 2000)
        })
    })
}

function waiting(tglAwalJanji, tglAkhirJanji) {
    return new Promise((res, rej) => {
        const waiting = setInterval(() => {
            if (tglAwalJanji < tglAkhirJanji) {
                tglAwalJanji++
                console.log(`#Day${tglAwalJanji}`)
            } else {
                res('\n#Day' + tglAwalJanji)
                clearInterval(waiting)
            }
        }, 100)
    })
}
function chat5(status) {
    return new Promise((res) => {
        setTimeout(() => {
            if (status === 'Y' || status === 'y') {
                res('Rudi : "Iya deh kalau gitu yah gapapa" ')
            } else if (status === 'N' || status === 'n') {
                res('Rudi : "Terimakasih ayah :D"')
            } else {
                rej('Harap input status dengan benar')
            }
        }, 2000)
    })
}
const cekJanjiAyah = async (tglAwalJanji, tglAkhirJanji, barangDijanjikan) => {
    if (typeof (tglAwalJanji) === 'number' && typeof (tglAkhirJanji) === 'number') {
        if (tglAwalJanji > 0 && tglAkhirJanji > tglAwalJanji && tglAkhirJanji <= 31) {
            let dayStart = tglAwalJanji
            let dayEnd = tglAkhirJanji
            try {
                const start = await startChat(dayStart, barangDijanjikan)
                console.log(start)
                const chat1st = await chat1(barangDijanjikan, tglAkhirJanji);
                console.log(chat1st)
                const chat2nd = await chat2();
                console.log(chat2nd)
                const waitIng = await waiting(dayStart, dayEnd);
                console.log(waitIng)
                const chat3rd = await chat3(barangDijanjikan);
                console.log(chat3rd)
                const chat4th = await chat4();
                const chat5th = await chat5(chat4th)
                console.log(chat5th);
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('Tanggal awal janji atau tanggal akhir janji tidak valid')
        }
    } else {
        console.log('Parameter tidak boleh kosong\nFormat tipe data parameter :\n1.Paramater 1 = boolean\n2. Parameter 2 = string');
    }
}

/*
Parameter :
1. hari waktu dijanjiin
2. hari waktu menepati janji
3. apa yang dijanjikan, misal : laptop, smartphone, ps5 dll
(True)Nak maaf ayah lagi ada musibah, ayah lagi sakit jadi uang nya kepake dulu insyaallah kalau udah sehat ayah gantiin ya nak
(False)Ayo nak kita beli sekarang laptopnya, uangnya dah siapp
*/

cekJanjiAyah(1, 30, 'iphone 12')