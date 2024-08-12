import './App.css';
import Layout from './layout'
import Home from './components/home/home'
import Reg from './components/logsign/signup'
import Log from './components/logsign/login'
import Create from './components/blog/createblog'
import Browse from './components/blog/browse'
import Postimg from './components/blog/postimg'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/register' element={<Reg/>}/>
          <Route path='/login' element={<Log/>}/>
          <Route path='/browse' element={<Browse/>}/>
          <Route path='/postimg' element={<Postimg/>}/>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
