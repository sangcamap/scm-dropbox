import '../sass/App.scss';
import Box from'./Box';
import Button from './Button';
import Background from './Background';

function App() {
  const users = [
    {name: 'Hana', msg: 'Hello Vietnam'}, 
    {name: 'John', msg: 'konichiwa'}, 
    {name: 'Xahra', msg: 'Im stuck'}]
  return (

    <div className="App">
      <Background></Background>
      <Button/>
      <div className='Group'>
        {users.map((user) => (
          <Box name = {user.name} msg = {user.msg}></Box>
        ))}   
      </div>
    </div>
  );
}

export default App;
