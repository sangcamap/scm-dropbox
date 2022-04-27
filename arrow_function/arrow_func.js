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


//Không dùng arrow func để làm constructor
const person = function (name, age){
    this.name = name
    this.age = age
}

let sang = new person("Sang", 18)
console.log(sang)
//
const person1 =  (name, age) => {
    this.name = name
    this.age = age
}
let sang1 = new person1("Sang", 18)
console.log(sang1) //=> person1 is not constructor