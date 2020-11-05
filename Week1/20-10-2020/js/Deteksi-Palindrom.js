const input = "malam"
let length = input.length - 1
let reverse = ""

for (length; length >= 0; length--) {
    console.log(length)
    reverse += input[length]
}
console.log(reverse)
if (input === reverse) {
    console.log('Palindrom')
} else {
    console.log('Not palindrom')
}

