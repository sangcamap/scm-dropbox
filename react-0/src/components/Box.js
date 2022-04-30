import React from 'react'

export default function Box(props) {
  return (
    <div className='box'>
        <span className='box__content'>{props.name}: {props.msg}</span>
    </div>
  )
}

