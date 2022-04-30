import React from 'react'

export default function Button() {

  const sayHello = () => {
    alert("Hello")
  } 

  return (
    <div className='Button' onClick={sayHello}> click ! </div>
  )
}
