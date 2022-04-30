import React, {useState} from 'react'



export default function Button() {
  const [count, setCount] = useState(0)

  const plus = () => {
    setCount (count + 1)
  } 

  return (
    <div className='Button' onClick={plus}> click ! {count} </div>
  )
}
