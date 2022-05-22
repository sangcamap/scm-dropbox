function* generator(){
    console.log('step 1')
    yield 1

    console.log('step 2')
    yield 2

    console.log('step 3, done')
    return 3
}


const id = generator() 
console.log(id.next())
console.log(id.next())
console.log(id.next())



