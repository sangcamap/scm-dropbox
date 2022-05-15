function sayHello (){
    setTimeout(() =>{console.log('hello')}, 2000)
}

function sayBye(){
    console.log('bye')
}

let promise = new Promise((resolve, reject) => {
    resolve()
})

promise
.then(()=>{ return new Promise((resolve) => {
    sayHello();
    setTimeout(resolve, 4000)
})})
.then((data)=>{ sayBye()})
.catch((err)=>{ console.log(err)}
)