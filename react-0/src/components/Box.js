import React from 'react'

export default function Box(props) {
  return (
    <div className='box'>
        <span className='box__content'>This is a Box number: {props.num}</span>
    </div>
  )
}

