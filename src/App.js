import './App.css';
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/home/Home.js';
import Focus from './pages/focus/Focus.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/focus" element={<Focus />}></Route>
      </Routes>
    </div>
  );
}

export default App;
