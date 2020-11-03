/*
1. Array Array.isArray() Method
   Checks whether an object is an array,
This function returns true if the object is an array, and false if not.
Parameter : 
1. obj = (Required), The object to be tested.
*/
const arr = [1, 2, 3, 4]
const arr2 = 'string'
// console.log(Array.isArray(arr)) // true
// console.log(Array.isArray(arr2)) //false

/*
2. Array concat() Method
    Joins two or more arrays, and returns a copy of the joined arrays.
Parameter :
1. Array = (Required), The arrays to be joined.
*/
const arr3 = [1, 2, 3, 4, 5]
const arr4 = [6, 7, 8, 9, 10]
const arr5 = [11, 12, 13]
const concat = arr3.concat(arr4, arr5)
// console.log(concat)

/*
3. Array reduce() method
    Reduce the values of an array to a single value (going left-to-right).
Note: reduce() does not execute the function for array elements without values.
Note: this method does not change the original array.
Parameter :
1. Function (total,currentValue,currentIndex,arr) = (Required). A function to be run for each element in the array.
    Function arguments:
    1. total = (Required). The initialValue, or the previously returned value of the function.
    2. currentValue = (Required). The value of the current element
    3. currentIndex = (Optional). The array index of the current element
    4. arr = (Optional). The array object the current element belongs to
2. initial = (Optional). A value to be passed to the function as the initial value
   example : if we use multiply don't use it.
*/
const arr6 = [2, 2, 2, 2]
const reduce = arr6.reduce((total, currentValue) => {
    return currentValue * total
}, 0)
console.log(reduce)

/*
4. Array join() method
    Joins all elements of an array into a string.
The elements will be separated by a specified paramater separator. The default separator is comma (,).

Note: this method will not change the original array.
Parameter :
1. Separator = (Optional). The separator to be used. If omitted, the elements are separated with a comma
 */
const arr7 = ['ada', 'aku', 'disini']
const join = arr7.join(' ')
// console.log(join)

/*
5. Array splice() method
   method adds/removes items to/from an array, and returns the removed item(s).

Note: This method changes the original array.
Parameter :
1. index = (Required). An integer that specifies at what position to add/remove items,
           Use negative values to specify the position from the end of the array.
2. howmany = Optional. The number of items to be removed. If set to 0, no items will be removed
3. item1, ..., itemX = Optional. The new item(s) to be added to the array
*/
const arr8 = ['apel', 'semangka', 'durian', 'lengkeng', 'rambutan']
const splice = arr8.splice(0, 2)
console.log(arr8)
console.log(splice)

/*
6. Math.min() method
   The min() method returns the number with the lowest value.
Parameter :
1. n1, n2, n3, ..., nX = (Optional). One or more numbers to compare
*/
const arr9 = [4, 7, 3, 1, 5]
const min = Math.min.apply(Math, arr9) // Before ES6
const min2 = Math.min(...arr9)  // After ES6
// console.log(min)
// console.log(min2)

/*
7. Math.max() method
    The max() method returns the number with the highest value.
Parameter :
1. n1, n2, n3, ..., nX = (Optional). One or more numbers to compare
*/
const arr10 = [6, 7, 3, 33, 2, 20]
const max = Math.max.apply(Math, arr10)
const max2 = Math.max(...arr10)
// console.log(max)
// console.log(max2)

/*
8. Math.round() method
   The round() method rounds a number to the nearest integer.
   Note: 2.49 will be rounded down (2), and 2.5 will be rounded up (3).
Parameter :
1. x	= (Required). The number to be rounded
*/
const round = Math.round(9.51)
// console.log(round)

/*
9. Math.sign method
    The sign() method checks whether a number is negative, positive or zero.
    If the number is positive, this method returns 1.
    If the number is negative, it returns -1.
    If the number is zero, it returns 0.
Parameter :
1. X    = (Required) A number
*/
const minus = 934 - 950
// console.log(minus)
if (Math.sign(minus) === 1) {
    // console.log(minus + ' is positive')
} else if (Math.sign(minus) === 0) {
    // console.log(minus + ' is equal')
} else if (Math.sign(minus) === -1) {
    // console.log(minus + ' is negative')
}

/*
10. Array includes() method
    The includes() method determines whether an array contains a specified element.
This method returns true if the array contains the element, and false if not.

Note: The includes() method is case sensitive.
Parameter:
1. element = (Required). The element to search for
2. start = (Optional). Default 0. At which position in the array to start the search
*/
const arr11 = ['harimau', 'kelinci', 'kucing', 'marmut', 'tikus']
const includes = arr11.includes('harima') //true
console.log(includes)