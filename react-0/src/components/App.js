import '../sass/App.scss';
import Box from'./Box';
import Button, { Temp } from './Button';
import Background from './Background';
import { useContext, createContext , useState , useRef } from 'react';
import ComB from './ComB'; 
import ComC from './ComC'; 
import { Provider, data } from './Provider';


export const box2 = createContext()


function App() {

  //BOX-1//
  const [time, setTime] = useState(60)
  const ref = useRef()
  const onStart = () => {
    ref.current = setInterval( () => { setTime(time => time - 1)} ,1000)
  }
  const onStop = () => {
    clearInterval(ref.current)
  } 
  //BOX-2//
 
  const dataFromProvider = useContext(data)


  return (
    <div className="App">
        <Background></Background>
        <div className='Group'>
          <Box>
              <span className='box__content'>{time}</span>
              <button onClick={onStart}>Start</button>
              <button onClick= {onStop}>Stop</button>
          </Box>
          <Box>
            <Provider>
            <box2.Provider value={{name: 'Sang', age: '12'}}>
                <ComB></ComB>
                <ComC></ComC>
                
            </box2.Provider>
            </Provider>
          </Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
        </div>

    </div>
  );
}

export default App;


// 1. tạo Context 
// 2. Provider
// 3. Consumer 