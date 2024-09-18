import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Emprestimo } from '../../models/emprestimo';
import './style.css';

function EmprestimoDetalhes() {
  const { id } = useParams();

  const [emprestimo, setEmprestimo] = useState<Emprestimo>();

  useEffect(() => {
    // Busca o emprestimo na API
    const fetchEmprestimo = async () => {
      try {
        const response = await fetch(`http://localhost:2020/api/emprestimos/${id}`);
        const data = await response.json();
        setEmprestimo(data.emprestimo);
        console.log(data.emprestimo);
        
      } catch (error) {
        console.error('Erro ao buscar os emprestimos:', error);
      }
    };

    fetchEmprestimo();
  }, [id]);

  // Funcionalidade para finalizar o empréstimo
  const handleFinalizarEmprestimo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:2020/api/emprestimos/${id}/finalizar`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        alert('Empréstimo finalizado com sucesso!');
        window.location.reload();
      } else {
        console.error('Erro ao finalizar empréstimo');
      }
    } catch (error) {
      console.error('Erro ao finalizar empréstimo:', error);
    }
  };

  // Funcionalidade para finalizar o atraso
  const handleFinalizarAtraso = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:2020/api/emprestimos/${id}/atraso/finalizar`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        alert('Atraso finalizado com sucesso!');
        window.location.reload();
      } else {
        console.error('Erro ao finalizar o atraso');
      }
    } catch (error) {
      console.error('Erro ao finalizar o atraso:', error);
    }
  };
  
  
  return (
    <>
        <section>
            <h1>Empréstimo {emprestimo?.id}</h1>
            <p>Livro: {emprestimo?.livro.nome}</p>
            <p>Aluno: {emprestimo?.aluno.matricula} - {emprestimo?.aluno.nome}</p>
            <p>Emprestimo: {emprestimo ? (new Date(emprestimo?.dataInicio).toLocaleDateString("pt-BR")) : '...'}</p>
            <p>Prazo de Entrega: {emprestimo ? (new Date(emprestimo?.dataFim).toLocaleDateString("pt-BR")) : '...'}</p>

            <br />

            {emprestimo?.atrasado && (
                <>
                <p><strong>Devolvido {emprestimo?.atrasado ? 'Atrasado' : 'Em dia'}</strong></p>
                <p>Atraso: R$ {emprestimo?.atrasos[0].valor.toFixed(2)}</p>
                <p>Pago: {emprestimo?.atrasos[0].pago ? 'Sim' : 'Não'}</p>
                </>
            )}
        </section>

        {   
            // Caso o emprestimo ainda não tenha sido finalizado
            emprestimo?.dataDevolucao === null ? (
                <form onSubmit={handleFinalizarEmprestimo}>
                    <button type="submit">Finalizar</button>
                </form>
            )
        :
            // Caso a devolução tenha sido atrasada e o pagamento ainda não tenha sido efetuado
            emprestimo?.atrasado === true && emprestimo?.atrasos[0].pago === false ? (
                <form onSubmit={handleFinalizarAtraso}>
                    <label>
                        <strong>R$ {emprestimo?.atrasos[0].valor.toFixed(2)}</strong>
                    </label>
    
                    <label>Forma de Pagamento</label>
                    <select>
                        <option value="pix">PIX</option>
                        <option value="debito">Cartão Debito</option>
                        <option value="credito">Cartão Crédito</option>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="boleto">Boleto</option>
                    </select>
    
                    <button type="submit">Pagar Atraso</button>
                </form>
            )
            : emprestimo?.dataDevolucao !== null ? (
                <form>
                    <strong>Operação finalizada!</strong>
                </form>
            )
            : ("...")
        }
      
    </>
  );
}

export default EmprestimoDetalhes;