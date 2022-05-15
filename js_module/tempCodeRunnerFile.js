
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
.then(()=>{ console.log("Thành công") })
.then(()=>{ return new Promise((resolve) => {
    sayHello();
    // resolve();
    setTimeout(resolve, 4000)
})})
.then((data)=>{ sayBye()})
.catch((err)=>{ console.log(err)}
)