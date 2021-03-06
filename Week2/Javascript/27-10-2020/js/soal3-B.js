const stockCoffee = (orderCoffee, table) => {
    return new Promise((resolve, reject) => {
        const coffeeMenu = ['v60', 'vietnam drip', 'latte', 'moccachino latte']
        let dataCoffee = [{
            name: 'arabica',
            stock: 1000
        }]
        let dataIngridients = [{
            name: 'freshmilk',
            stock: 500
        }, {
            name: 'condensed milk',
            stock: 560
        }, {
            name: 'chocolate',
            stock: 500
        }, {
            name: 'water',
            stock: 2000
        }]
        if (orderCoffee === undefined || orderCoffee.length === 0 || typeof (table) !== 'number' || table === undefined) {
            reject('Parameter tidak boleh kosong')
        } else {
            let orderCoffeeCopy = [...orderCoffee]
            let checkOrderCoffee = orderCoffeeCopy.filter((el) => {
                let i = 0
                while (i <= coffeeMenu.length - 1) {
                    if (el === coffeeMenu[i]) {
                        return el
                    } else {
                        i++
                    }
                }
            })
            if (checkOrderCoffee.length >= orderCoffee.length) {
                let dataCoffeeCopy = dataCoffee[0].stock
                let freshMilk = dataIngridients[0].stock
                let consendedMilk = dataIngridients[1].stock
                let chocolate = dataIngridients[2].stock
                let water = dataIngridients[3].stock
                console.log('Status kopi yang dipesan :');
                for (let i = 0; i <= checkOrderCoffee.length - 1; i++) {
                    if (checkOrderCoffee[i] === 'v60') {
                        if (Math.sign(dataCoffeeCopy - 15) !== -1 && Math.sign(water - 195) !== -1) {
                            dataCoffeeCopy -= 15
                            water -= 195
                            console.log(`+ ${checkOrderCoffee[i]} : ready`)
                        } else {
                            reject(`- ${checkOrderCoffee[i]} : not ready`)
                        }
                    } else if (checkOrderCoffee[i] === 'latte') {
                        if (Math.sign(dataCoffeeCopy - 15) !== -1 && Math.sign(water - 50) !== -1 && Math.sign(freshMilk - 125) !== -1) {
                            dataCoffeeCopy -= 15
                            water -= 50
                            freshMilk -= 125
                            console.log(`+ ${checkOrderCoffee[i]} : ready`)
                        } else {
                            reject(`- ${checkOrderCoffee[i]} : not ready`)
                        }
                    } else if (checkOrderCoffee[i] === 'vietnam drip') {
                        if (Math.sign(dataCoffeeCopy - 15) !== -1 && Math.sign(water - 175) !== -1 && Math.sign(consendedMilk - 25) !== -1) {
                            dataCoffeeCopy -= 15
                            water -= 175
                            consendedMilk -= 25
                            console.log(`+ ${checkOrderCoffee[i]} : ready`)
                        } else {
                            reject(`- ${checkOrderCoffee[i]} : not ready`)
                        }
                    } else if (checkOrderCoffee[i] === 'moccachino latte') {
                        if (Math.sign(dataCoffeeCopy - 15) !== -1 && Math.sign(water - 50) !== -1 && Math.sign(freshMilk - 125) !== -1 && Math.sign(consendedMilk - 25) !== -1 && Math.sign(chocolate - 7) !== -1) {
                            dataCoffeeCopy -= 15
                            water -= 50
                            chocolate -= 7
                            freshMilk -= 125
                            consendedMilk -= 25
                            console.log(`+ ${checkOrderCoffee[i]} : ready`)
                        } else {
                            reject(`- ${checkOrderCoffee[i]} : not ready`)
                        }
                    }
                }
                dataCoffee[0].stock = dataCoffeeCopy
                dataIngridients[0].stock = freshMilk
                dataIngridients[1].stock = consendedMilk
                dataIngridients[2].stock = chocolate
                dataIngridients[3].stock = water
                let data = {
                    dataCoffee: [...dataCoffee],
                    dataIngridients: [...dataIngridients],
                    orderCoffee: [...checkOrderCoffee]
                }
                resolve(data)
            } else {
                let coffeeMenuCopy = coffeeMenu.map((el, index) => {
                    return `${index + 1}. ${el}\n`
                })
                reject('Nama kopi harus valid\nBerikut daftar nama kopi yang valid :\n' + coffeeMenuCopy.join(''))
            }
        }
    })

}
const makeCoffee = (table) => {
    return new Promise((resolve, reject) => {
        console.log('\n* Sedang membuat kopi pesanan anda, harap tunggu dimeja ' + table + ' .....')
        setTimeout(() => {
            resolve('\n* Pesanan anda sudah siap untuk diantar ke meja ' + table)
        }, 5000)

    })
}
const serveCoffee = (checkingCoffee, table) => {
    return new Promise((resolve, reject) => {
        let checkingCoffeeCopy = JSON.stringify(checkingCoffee, undefined, 5)
        console.log('\n* Sedang mengantar kan pesanan ke meja ' + table + ' .....')
        setTimeout(() => {
            resolve(
                `\n* Kopi sudah diterima oleh pelanggan : )\n\n
berikut daftar sisa bahan:
--------------------------------------------------------
kopi arabika       : ${checkingCoffee.dataCoffee[0].stock} gram
Freshmilk          : ${checkingCoffee.dataIngridients[0].stock} gram
Consendedmilk      : ${checkingCoffee.dataIngridients[1].stock} gram
Chocolate          : ${checkingCoffee.dataIngridients[2].stock} gram
Water              : ${checkingCoffee.dataIngridients[3].stock} gram
                `
            )
        }, 6000)

    })
}

const payCoffee = checkOrderCoffee => {
    return new Promise((resolve, reject) => {
        let harga = [{
            name: 'v60',
            price: 12000
        }, {
            name: 'latte',
            price: 16000
        }, {
            name: 'vietnam drip',
            price: 10000
        }, {
            name: 'moccachino latte',
            price: 18000
        }]
        let orderCoffee = [...checkOrderCoffee.orderCoffee]
        let hargaFilter = harga.filter((el) => {
            let i = 0
            while (i <= orderCoffee.length - 1) {
                if (el.name === orderCoffee[i]) {
                    return el.name === orderCoffee[i]
                } else {
                    i++
                }
            }
        })
        let amount = hargaFilter.reduce((acc, value) => {
            let same = 0
            for (let i = 0; i <= orderCoffee.length - 1; i++) {
                if (value.name === orderCoffee[i]) {
                    same += value.price
                }
            }
            return acc + same
        }, 0)

        const inputPay = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        console.log('\nTotal harga kopi anda adalah : ' + amount)
        inputPay.question('Silahkan membayar orderan pesanan anda : Rp. ', bayar => {
            if (parseInt(bayar) > parseInt(amount)) {
                console.log(`Kembalian nya : Rp. ${parseInt(bayar) - parseInt(amount)}\nTerimakasih, Silahkan ditunggu :)`);
                resolve(parseInt(bayar) - parseInt(amount))
            } else if (parseInt(bayar) < parseInt(amount)) {
                reject(`Maaf uang anda kurang sebesar : Rp. ${parseInt(bayar) - parseInt(amount)}`);
            } else if (parseInt(bayar) === parseInt(amount)) {
                console.log("Uang anda pas, silahkan ditunggu :)");
                resolve(parseInt(bayar) - parseInt(amount))
            }
            inputPay.close()
        })
    })
}
const orderCoffee = async (orderCoffee, table) => {
    try {
        const checkingCoffee = await stockCoffee(orderCoffee, table)
        const payingCoffee = await payCoffee(checkingCoffee)
        const makingCoffee = await makeCoffee(table)
        console.log(makingCoffee)
        const servingCoffee = await serveCoffee(checkingCoffee, table)
        console.log(servingCoffee)
    } catch (error) {
        setTimeout(() => {
            console.log(error + '\nMohon untuk memesan kopi yang tersedia')
        }, 3000)
    }
}
//pesan v60
orderCoffee(['latte', 'v60', 'v60', 'v60'], 10)