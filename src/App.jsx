import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Conatct';
import Flightspage from './Pages/Flightspage';
// import Login from './Pages/login';

function App() {
  const navStyle = {
    padding: '10px',
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const linkStyle = {
    margin: '0 15px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  };

  const linkHoverStyle = {
    backgroundColor: '#555',
  };

  return (
    <>
      <Router>
        <div>
          {/* Navigation Bar */}
          <nav style={navStyle}>
            <Link
              to="/"
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#555')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#555')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={linkStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#555')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              Contact
            </Link>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/flightspage" element={<Flightspage />} />
            {/* <Route path='/login' element={<Login/>}/> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;