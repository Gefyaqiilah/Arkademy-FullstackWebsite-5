const printSegitiga = 5
let container = ''
for (let i = printSegitiga; i >= 1; i--) {
    for (let j = 1; j <= i; j++) {
        container += `${j} `
    }
    container += '\n'
}
console.log(container)