import React, {useState, createContext, useEffect} from 'react'
const Context = createContext() 


function ContextProvider({children}) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const updateName = (e) =>{
    setName(e)
  }
  useEffect(() => {
    setName('Sang')
    setAge('12')
  }, [])

  return (
    <Context.Provider value = {
      {
        name,
        age,
        updateName
      }
    }>
        {children}
    </Context.Provider>
  )
}



export { Context, ContextProvider }




