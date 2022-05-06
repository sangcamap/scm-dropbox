import React, {useContext} from 'react'
import { box2 } from './App'


export default function ComC() {

  const box = useContext(box2)
  return (
    <div>Com-C {box.age}</div>
  )
}
