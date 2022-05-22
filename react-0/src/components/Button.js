import React, {useState} from 'react'
const color = ['blue', 'green', 'red']

export default function Button({title, onShow}) {
  
    return (
    <div className='Button' onClick={onShow}>{title}</div>
  )
}
