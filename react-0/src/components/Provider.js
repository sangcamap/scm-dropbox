import React , {createContext} from 'react'

const data = createContext()

function Provider(props) {

  
return (
    <data.Provider value={ {name: 'sang', address: 'ww333'} }>
        {props.children}
    </data.Provider>
  )
}


export {Provider, data}

