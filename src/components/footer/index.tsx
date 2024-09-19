import 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer>
        <p>Feito por <NavLink to={'https://github.com/gabriel-codart'}>@GabrielCodart</NavLink></p>
    </footer>
  )
}

export default Footer;