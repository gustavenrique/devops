import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Link to='/' style={{ color: 'white' }}>Home</Link>
          <Link to='/otherpage' style={{ color: 'white' }}>Other Page</Link>
        </header>

        <Routes>
          <Route exact path='/' element={<Fib />} />
          <Route path='/otherpage' element={<OtherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
