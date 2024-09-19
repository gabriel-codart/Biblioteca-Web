import 'react';
import './style.css';

function Home() {
  return (
    <>
      <h1>O que é isso?</h1>

      <p>Este é o sistema de empréstimo de livros da biblioteca escolar.</p>

      <h2>Quem opera?</h2>

      <p>Os funcionários da biblioteca.</p>

      <h2>Qual o prazo de devolução?</h2>

      <p>O prazo é definido em 30 dias a partir da data de empréstimo.</p>

      <h2>E se um aluno atrasar?</h2>

      <p>
        Se um aluno devolver um livro depois dos 30 dias, 
        ele deverá pagar uma taxa de <strong>R$1</strong> 
        por dia excedente.
      </p>
    </>
  )
}

export default Home;