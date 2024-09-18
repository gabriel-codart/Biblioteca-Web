import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Emprestimo } from '../../models/emprestimo';

import './style.css';

function Historico() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [pesquisa, setPesquisa] = useState('');

  useEffect(() => {
    // Busca os emprestimos na API
    const fetchEmprestimos = async () => {
      try {
        const response = await fetch('http://localhost:2020/api/emprestimos');
        const data = await response.json();
        console.log(data.emprestimos);
        
        setEmprestimos(data.emprestimos);
      } catch (error) {
        console.error('Erro ao buscar os emprestimos:', error);
      }
    };

    fetchEmprestimos();
  }, []);

  // Filtra os emprestimos com base na pesquisa
  const emprestimosFiltrados = emprestimos.filter(emprestimo =>
    emprestimo.aluno.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <>
        <h1>Histórico de Empréstimos</h1>

        <input
            type="text"
            placeholder="Pesquisar"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
        />

        <ul className='emprestimos'>
            <li className='header'>
                <label>
                    <strong>ID</strong>
                    <strong>Livro</strong>
                    <strong>Aluno</strong>
                    <strong>Prazo</strong>
                    <strong>Devolução</strong>
                    <strong>Status</strong>
                </label>
            </li>
            {emprestimosFiltrados.map((emprestimo) => (
            <li key={emprestimo.id}>
                <NavLink to={`/emprestimo/${emprestimo.id}`}>
                    <p>{emprestimo.id}</p>
                    <p>{emprestimo.livro.nome}</p>
                    <p>{emprestimo.aluno.matricula}</p>
                    <p>{(new Date(emprestimo.dataFim)).toLocaleDateString("pt-BR")}</p>
                    <p>{emprestimo.dataDevolucao ? (new Date(emprestimo.dataDevolucao)).toLocaleDateString("pt-BR") : 'Aguardando'}</p>
                    <p>
                      {
                        emprestimo.dataDevolucao === null ? 'Aguardando'
                        : emprestimo.dataDevolucao > emprestimo.dataFim ? 'Atrasado'
                        : 'Concluído'
                      }
                    </p>
                </NavLink>
            </li>
            ))}
        </ul>
    </>
  );
}

export default Historico;
