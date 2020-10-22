const hitungNilai = (bindo, bing, mtk, ipa) => {
    if (bindo === undefined || bing === undefined || mtk === undefined || ipa === undefined) {
        return 'Semua nilai harus diisi'
    } else {
        const jumlah = (bindo + bing + mtk + ipa) / 4;
        if (jumlah >= 0 && jumlah <= 59) {
            return `Rata-rata = ${jumlah}\nGrade = E`
        } else if (jumlah >= 60 && jumlah <= 69) {
            return `Rata-rata = ${jumlah}\nGrade = D`
        } else if (jumlah >= 70 && jumlah <= 79) {
            return `Rata-rata = ${jumlah}\nGrade = C`
        } else if (jumlah >= 80 && jumlah <= 89) {
            return `Rata-rata = ${jumlah}\nGrade = B`
        } else if (jumlah >= 90 && jumlah <= 100) {
            return `Rata-rata = ${jumlah}\nGrade = A`
        }
    }
}
console.log(hitungNilai(90, 100, 90, 90))