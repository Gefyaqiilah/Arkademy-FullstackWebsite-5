const divideAndSort = (number) => {
    if (typeof (number) !== 'number' && Number.isInteger(number) === false) {
        console.log('Inputan harus berupa number dan bilangan bulat')
    } else {
        let arrNumber = number.toString()
        let numberResults = []
        let containerString = ''
        let containerArray = []
        let i = 0
        let j = 0
        let n = arrNumber.length - 1
        while (i <= n) {
            j = i
            while (j <= n && arrNumber[j] !== '0') {
                containerString += arrNumber[j]
                j++
            }
            containerArray = containerString.split('')
            containerArray.sort((a, b) => a - b)
            numberResults.push(...containerArray)
            containerString = ''
            containerArray = []
            i = j + 1
        }
        console.log(numberResults.join(''))
    }
}
let number = 5956560159466056
divideAndSort(number)