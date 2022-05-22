
function sayHello (callback){
    setTimeout(() =>{console.log('hello')}, 2000)
}

function sayBye(){
    console.log('bye')
}

let promise1 = new Promise((resolve) => {
    setTimeout(resolve, 3000)
    // resolve()
})
let promise2 = new Promise((resolve) => {
    resolve()
})

promise1.then(()=>{
    sayHello()
})

promise2.then(()=>{
    sayBye()
})

async function say(){
    await promise1
    await promise2
}

say() 