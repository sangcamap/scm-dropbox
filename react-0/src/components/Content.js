import React, {useContext} from 'react'
import { Context } from './Context'

export default function Content() {
const data = useContext(Context)
  
return (
    <div> {data.name} {data.age} Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
  )
}
