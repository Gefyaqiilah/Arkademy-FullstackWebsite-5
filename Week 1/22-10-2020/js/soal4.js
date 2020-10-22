let data = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874'
    },
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org'
}

const dataCopy = {
    ...data,
    name: "Gefy Aqiilah Aqshal",
    email: "gefyaqiilah26@gmail.com",
    hobby: ['coffee', 'playing games', 'swimming', 'programming']
}

const { street, city } = dataCopy.address

console.log(dataCopy)
console.log(`\nStreet : ${street}`)
console.log(`City : ${city}`)