import 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/historico">Histórico</NavLink>
      <NavLink to="/sobre">Sobre</NavLink>
    </header>
  )
}

export default Header;