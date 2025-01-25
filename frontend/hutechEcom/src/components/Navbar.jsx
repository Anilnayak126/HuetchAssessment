import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCartIcon,
  UserCircleIcon,
  LogInIcon,
  UserPlusIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      setUserName('Welcome'); // This can be dynamically set, could be fetched from backend if needed
    } else {
      setIsAuthenticated(false);
      setUserName('');
    }
  }, []);  // Effect runs once when the component is mounted, will auto-update login/logout state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');
  
    if (refreshToken && accessToken) {
      fetch('http://localhost:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to logout');
          }
          return response.json();
        })
        .then(data => {
          if (data.message === 'Logout successful') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setIsAuthenticated(false);
            setUserName('');
            navigate('/Login');
          } else {
            console.log('Logout failed', data.message);
          }
        })
        .catch(error => console.log('Error during logout:', error));
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo-text">
            Hutech Ecom
          </Link>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <Link to="/products" className="nav-link">
              <ShoppingCartIcon className="nav-icon" />
              Products
            </Link>
            <Link to="/cart" className="nav-link">
              <ShoppingCartIcon className="nav-icon" />
              Cart
            </Link>
          </div>

          <div className="navbar-dropdown">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <UserCircleIcon className="nav-icon" />
              {isAuthenticated ? `Hello, ${userName}` : 'Account'}
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="dropdown-item" onClick={toggleDropdown}>
                      <UserCircleIcon className="dropdown-icon" /> Profile
                    </Link>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <LogInIcon className="dropdown-icon" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item" onClick={toggleDropdown}>
                      <LogInIcon className="dropdown-icon" /> Login
                    </Link>
                    <Link to="/register" className="dropdown-item" onClick={toggleDropdown}>
                      <UserPlusIcon className="dropdown-icon" /> Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
