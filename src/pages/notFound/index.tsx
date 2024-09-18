import 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <>
        <h1>404</h1>
        <p>Not found</p>
        <NavLink to="/">Voltar para Home</NavLink>
    </>
  )
}

export default NotFound;