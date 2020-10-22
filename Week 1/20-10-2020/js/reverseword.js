const input = 'saya belajar javascript'
let i = 0;
let n = input.length - 1
let j = 0;
let results = '';
let subs = '';

while (i <= n) {
    j = i
    while (j <= n && input[j] !== ' ') {
        j++
    }
    subs = input.substr(i, j - i)

    if (results.length === 0) {
        results = subs
    } else {
        results = subs + ' ' + results
    }

    i = j + 1
    console.log(i)
}
console.log(results)