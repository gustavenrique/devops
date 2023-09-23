import logo from './assets/logo.svg';
import './assets/App.css';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to='/' className='link'>Home</Link>
            <Link to='/otherpage' className='link'>Other Page</Link>
          </div>
        </header>

        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Routes>
            <Route exact path='/' element={<Fib />} />
            <Route path='/otherpage' element={<OtherPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
