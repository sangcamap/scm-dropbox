import '../sass/App.scss';
// import ComB from './ComB'; 
// import ComA from './ComA';
import React
  , { 
    useState,
    createContext,
    memo
  } from 'react'

  
  const arr = [
    {
      id: '1',
      name: 'honda'
    },
    {
      id: '2',
      name: 'xuzi'
    },
    {
      id: '3',
      name: 'py'
    },
  ]

  const data = {
    name: 'Sang',
    age: '12',
    tel: '123'
  }

  function App() {
  const [state, setState] = useState() 
  const randomState = () => {
    setState(arr[Math.floor(Math.random() * arr.length)])
  }
  
  const [input, setInput] = useState()


  return (
    <div className='box'>
        <h1 {...data}> Thẻ này chứa props</h1>
        <h1>Chọn: {input}</h1>
        {
          arr.map(
            e => (<h1 key={e.id}><input type='radio' checked={ input === e.id} onChange={() => setInput(e.id)}/> Hello {e.name}</h1>)
          )
        }
    </div>
  );
}

export default App;


// 1. tạo Context 
// 2. Provider
// 3. Consumer 