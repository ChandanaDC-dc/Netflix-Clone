import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-black' : 'navbar-transparent'}`}>
      <div className="navbar-left">
        <img 
          className="navbar-logo" 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix Logo" 
        />
        <ul className="navbar-links">
          <li onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</li>
          <li onClick={() => document.getElementById('Action Movies')?.scrollIntoView({behavior: 'smooth'})}>Action</li>
          <li onClick={() => document.getElementById('Comedy Movies')?.scrollIntoView({behavior: 'smooth'})}>Comedy</li>
          <li onClick={() => document.getElementById('Horror Movies')?.scrollIntoView({behavior: 'smooth'})}>Horror</li>
          <li onClick={() => document.getElementById('Sci-Fi Movies')?.scrollIntoView({behavior: 'smooth'})}>Sci-Fi</li>
        </ul>
      </div>
      <div className="navbar-right">
        <form className={`search-box ${searchOpen ? 'active' : ''}`} onSubmit={handleSearchSubmit}>
          <FaSearch className="search-icon" onClick={() => setSearchOpen(!searchOpen)} />
          <input 
            type="text" 
            placeholder="Titles, people, genres" 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if(onSearch) onSearch(e.target.value);
            }}
            className={searchOpen ? 'open' : ''}
          />
        </form>
        <p className="navbar-kids">Kids</p>
        <FaBell className="navbar-icon" />
        <FaUserCircle className="navbar-icon avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
