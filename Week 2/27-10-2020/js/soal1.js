const cekHariKerja = (day) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dataDay = ['senin', 'selasa', 'rabu', 'kamis', 'jumat']
            let cek = dataDay.find((item) => {
                let itemCopy = item.toUpperCase()
                let dayCopy = day.toUpperCase()
                return itemCopy === dayCopy
            })
            if (cek) {
                resolve(cek)
            } else {
                reject(new Error(`Hari ${day} bukan hari kerja`))
            }

        })
    })
}

//jalankan fungsi --> synchronous menggunakan then & catch
/*
cekHariKerja('rabu')
    // kalau kita langsung jalankan fungsi diatas tanpa then catch maka return promise akan <pending>
    // karena sifungsi baru saja dijalankan dan tidak bisa langsung mengirim hasil promise
    .then(res => {
        console.log(`Hari ${res} adalah hari kerja`);
    })
    //untuk menampung sebuah promise yang terpenuhi kita gunakan then
    .catch(err => {
        console.log(err);
    })
    // untuk menampung sebuah promise yang tidak terpenuhi kita gunakan catch
*/

// jalankan fungsi --> synchronous menggunakan async await & try catch

/*
// untuk menggunakan async await, kita gunakan keyword async di function dan await di pemanggilan function
const hasilCek = async () => {
    // try untuk menampung promise yang terpenuhi, ketika ada function yang tidak terpenuhi maka akan langsung loncat ke catch
    try {
        const funcCekHariKerja = await cekHariKerja('rabu')
        console.log(`Hari ${funcCekHariKerja} adalah hari kerja`);
    } catch (error) {
        console.log(error.message)
    }
    // catch untuk menampung promise yang tidak terpenuhi, dari function yang gagal dijalankan di try
}
hasilCek()
*/