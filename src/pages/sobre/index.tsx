import 'react';
import './style.css';

function Sobre() {
  return (
    <div className='sobre'>
      <h1>O que é isso?</h1>

      <p>Este é o sistema de empréstimo de livros da biblioteca escolar.</p>

      <h1>Quem opera?</h1>

      <p>Os funcionários da biblioteca.</p>

      <h1>Qual o prazo de devolução?</h1>

      <p>O prazo é definido em 30 dias a partir da data de empréstimo.</p>

      <h1>E se um aluno atrasar?</h1>

      <p>
        Se um aluno devolver um livro depois dos 30 dias, 
        ele deverá pagar uma taxa de <strong>R$1</strong> por dia excedente.
      </p>
    </div>
  )
}

export default Sobre;