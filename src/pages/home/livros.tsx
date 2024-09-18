import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Livro } from '../../models/livro.ts';

import './style.css';

function Livros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    // Busca os livros na API
    const fetchLivros = async () => {
      try {
        const response = await fetch('http://localhost:2020/api/livros');
        const data = await response.json();
        setLivros(data.livros);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
      }
    };

    fetchLivros();
  }, []);

  // Filtra os livros com base na pesquisa
  const livrosFiltrados = livros.filter(livro =>
    livro.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Pesquisar"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />

      <ul className='livros'>
          <li className='header'>
            <label>
              <strong>Livro</strong>
              <strong>Autor</strong>
              <strong>Disponível</strong>
            </label>
          </li>
        {livrosFiltrados.map((livro) => (
          <li key={livro.id}>
            <NavLink to={`/livro/${livro.id}`}>
              <p>{livro.nome}</p>
              <p>{livro.autor}</p>
              <p>Disponível: {livro.quantidadeDisponivel}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Livros;
