const printSegitiga = 5
let container = ''
if (typeof printSegitiga === 'number') {
    for (let i = printSegitiga; i >= 1; i--) {
        for (let j = 1; j <= i; j++) {
            container += `${j} `
        }
        container += '\n'
    }
} else {
    container += 'Data harus number'
}
console.log(container)