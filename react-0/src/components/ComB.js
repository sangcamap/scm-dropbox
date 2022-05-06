import React, {useContext} from 'react'
import { box2 } from './App'
import { data } from './Provider'

export default function ComB() {
  const dataFromProvider = useContext(data)
  const box = useContext(box2)

  return (
    <div>Com-B {box.name}  {dataFromProvider.address}</div>
  )
}
