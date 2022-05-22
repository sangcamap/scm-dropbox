import '../sass/App.scss';
import Content from './Content';
import Button from './Button';
import { Context, ContextProvider } from './Context';

import React
  , { 
    useState,
    createContext,
    memo,
    useContext
  } from 'react'

  function App() {
  const context = useContext(Context)
  const [show, setShow] = useState(true)
  const updateShow = () => {
    if (show === true) {
      setShow(false)
    }
    else {
      setShow(true)
    }
    console.log(show)
  }
  
  return (
    <div className='App'>
      <div className='box'>
        {show == true ? (<Content></Content>) : ''}
        <Button title={'Click me!'} onShow={updateShow}> </Button>
        <input onChange={(e)=>{context.updateName(e.target.value)}}></input>
        {/* <button onClick={updateShow}>OKKKKK</button> */}
      </div>
    </div>
  );
}

export default App;


// 1. tạo Context 
// 2. Provider
// 3. Consumer 