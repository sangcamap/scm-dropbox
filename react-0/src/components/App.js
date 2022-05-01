import '../sass/App.scss';
import Box from'./Box';
import Button, { Temp } from './Button';
import Background from './Background';
import { useContext , useState , useRef } from 'react';



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


  return (
    <div className="App">
        <Background></Background>
        <div className='Group'>
          <Box>
              <span className='box__content'>{time}</span>
              <button onClick={onStart}>Start</button>
              <button onClick= {onStop}>Stop</button>
          </Box>
          <Box></Box>
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