
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Table from './Table'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/data" element={<Table />} />
  
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
