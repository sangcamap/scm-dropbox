function sayHello (callback){
    setTimeout(() =>{console.log('hello')}, 2000)
}

function sayBye(){
    console.log('bye')
}

let promise1 = new Promise((resolve) => {
    setTimeout(() =>{console.log('hello')}, 2000)
    resolve()
})
let promise2 = new Promise((resolve) => {
    sayBye()
    resolve()
})


async function say(){
    await promise1
    await promise2
}