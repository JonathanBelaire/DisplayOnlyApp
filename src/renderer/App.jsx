import { MemoryRouter as Router, Routes, Route, MemoryRouter } from 'react-router-dom';
import './App.css';
import Home from './home/Home';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home />} >

        </Route>
      </Routes>
    </Router>
  );
}
