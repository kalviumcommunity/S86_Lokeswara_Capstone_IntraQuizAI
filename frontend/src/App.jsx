import { Route, Routes } from 'react-router-dom';
import './App.css'

import Home from './pages/Home'

function App() {
  return (
    <>
      <div className='main-content'>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </div>
    </>
  );
}

export default App
