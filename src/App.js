import {Route, Routes} from 'react-router-dom'
import './App.css';
import MakePost from './components/MakePost'
import Posts from './components/Posts';
import AutoPost from './components/AutoPost'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/newpost' element={<MakePost />}/>
        <Route path='/autopost' element={<AutoPost />}/>
      </Routes>
    </div>
  );
}

export default App;
