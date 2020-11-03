const valueBetween = (nilaiAwal, nilaiAkhir, dataArray) => {
    if (nilaiAwal && nilaiAkhir && dataArray) {
        if (typeof nilaiAwal === 'number' && typeof nilaiAkhir === 'number' && Array.isArray(dataArray) === true && dataArray.length > 0) {
            if (nilaiAwal < nilaiAkhir) {
                let dataArrayCopy = dataArray.filter((el) => el >= nilaiAwal && el <= nilaiAkhir)
                if (dataArrayCopy.length > 0) {
                    dataArrayCopy.sort((a, b) => a - b)
                    return 'Menampilkan nilai diantara ' + nilaiAwal + ' sampai ' + nilaiAkhir + ' adalah :\n' + dataArrayCopy.join(', ')
                } else {
                    return 'jumlah angka dalam dataArray tidak ada'
                }
            } else {
                return 'nilai awal tidak boleh lebih besar atau sama dengan nilai akhir'
            }
        } else {
            return 'nilai awal & akhir harus number & data aray harus berupa array (!tidak boleh array kosong)'
        }
    } else {
        return 'Maaf nilai tidak lengkap, harap dicek kembali'
    }
}
console.log(valueBetween(12, 12, [1, 3, 9, 2, 7, 9, 10]))