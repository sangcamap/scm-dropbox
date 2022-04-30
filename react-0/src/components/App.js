import '../sass/App.scss';
import Box from'./Box';
import Button from './Button';
import Background from './Background';

function App() {
  return (
    <div className="App">
      <Background></Background>
      <div className='Group'>
        <Box num = '3'/>   
        <Button/>
      </div>
    </div>
  );
}

export default App;
