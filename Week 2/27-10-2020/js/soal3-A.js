function startChat(day) {
    return new Promise((res, rej) => {
        console.log('#Day' + day)
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
function chat4(uangTerpakai) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (uangTerpakai) {
                rej('Ayah : "Nak maaf ayah lagi ada musibah, ayah lagi sakit jadi uang nya kepake dulu\ninsyaallah kalau udah sehat ayah gantiin ya nak"\n')
            } else {
                res('Ayah : "Ayo nak kita beli sekarang laptopnya, uangnya dah siapp"\n')
            }
        }, 2000)
    })
}

function waiting(day) {
    return new Promise((res, rej) => {
        const waiting = setInterval(() => {
            if (day < 28) {
                day++
                console.log(`#Day${day}`)
            } else {
                res('\n#Day' + day)
                clearInterval(waiting)
            }
        }, 100)
    })
}

const cekJanjiAyah = async (uangTerpakai) => {
    let day = 1
    try {
        const start = await startChat(day)
        console.log(start)
        const chat1st = await chat1();
        console.log(chat1st)
        const chat2nd = await chat2();
        console.log(chat2nd)
        const waitIng = await waiting(day);
        console.log(waitIng)
        const chat3rd = await chat3();
        console.log(chat3rd)
        const chat4th = await chat4(uangTerpakai);
        console.log(chat4th)
    } catch (error) {
        console.log(error)
    }
}

//parameter uang terpakai maksudnya apakah uang yang dimaksud terpakai ke yang lain
cekJanjiAyah(false)