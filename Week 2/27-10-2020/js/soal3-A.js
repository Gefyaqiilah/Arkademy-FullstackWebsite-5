function startChat(tglAwalJanji) {
    return new Promise((res, rej) => {
        console.log('#Day' + tglAwalJanji)
        setTimeout(() => {
            res('Rudi : "Yah laptop rudi sudah rusak, rudi pengen laptop baru pah, boleh ga?"\n')
        }, 2000)
    })
}
function chat1() {
    return new Promise((res) => {
        setTimeout(() => {
            res('Ayah : "Kalau gaada halangan, insyaallah kita beli laptop baru tanggal 28"\n')
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
function chat3() {
    return new Promise((res) => {
        setTimeout(() => {
            res('Rudi : "Yah gimana buat beli laptopnya? jadi beli kan?"\n')
        }, 2000)

    })
}
function chat4(uangTerpakai, message) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (uangTerpakai) {
                rej('Ayah : "' + message + '"\n')
            } else {
                res('Ayah : "' + message + '"\n')
            }
        }, 2000)
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

const cekJanjiAyah = async (tglAwalJanji, tglAkhirJanji, uangTerpakai, message) => {
    if (typeof (tglAwalJanji) === 'number' && typeof (tglAkhirJanji) === 'number' && typeof (uangTerpakai) === 'boolean' && typeof (message) === 'string') {
        if (tglAwalJanji > 0 && tglAkhirJanji > tglAwalJanji && tglAkhirJanji <= 31) {
            let dayStart = tglAwalJanji
            let dayEnd = tglAkhirJanji
            try {
                const start = await startChat(dayStart)
                console.log(start)
                const chat1st = await chat1();
                console.log(chat1st)
                const chat2nd = await chat2();
                console.log(chat2nd)
                const waitIng = await waiting(dayStart, dayEnd);
                console.log(waitIng)
                const chat3rd = await chat3();
                console.log(chat3rd)
                const chat4th = await chat4(uangTerpakai, message);
                console.log(chat4th)
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
1. Tanggal waktu dijanjiin
2. Tanggal waktu menepati janji
3. uang nya terpakai? jika true maka tidak menepati janji dan false sebaliknya
4. pesan ketika ditepati janji ataupun tidak ditepati
(True)Nak maaf ayah lagi ada musibah, ayah lagi sakit jadi uang nya kepake dulu insyaallah kalau udah sehat ayah gantiin ya nak
(False)Ayo nak kita beli sekarang laptopnya, uangnya dah siapp
*/
cekJanjiAyah(1, 30, true, 'Nak maaf ayah lagi ada musibah, ayah lagi sakit jadi uang nya kepake dulu insyaallah kalau udah sehat ayah gantiin ya nak')