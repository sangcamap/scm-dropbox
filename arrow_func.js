// Func thường
function sum(a, b){
    return a + b
}

console.log(sum(2,3))
// Arrow Func
const sum1 = (a,b) => a+b
console.log(sum1(4,4))

const obj = (a,b) => ({name: a, age: b})
console.log(obj("sang", 18))