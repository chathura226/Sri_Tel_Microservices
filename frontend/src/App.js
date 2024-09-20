import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { CssBaseline} from '@mui/material';

//importing pages and components
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import NavBar from './components/NavBar';
import PageNotFound from './pages/PageNotFound';
import ForgotPass from "./pages/ForgotPass";

function App() {
  return (
    <>
        <CssBaseline />
        <div className="App">
          <BrowserRouter>
            <NavBar/>
            <div className='pages'>
              <Routes>
              <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/forgot-password' element={<ForgotPass />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
        </>
  );
}

export default App;
