import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Livro } from '../../models/livro';
import { Aluno } from '../../models/aluno';
import './style.css';

function LivroDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [livro, setLivro] = useState<Livro>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<Date>();
  const [dataFim, setDataFim] = useState<Date>();

  useEffect(() => {
    // Função para buscar os dados do livro e dos alunos na API
    const fetchDados = async () => {
      try {
        const responseLivro = await fetch(`http://localhost:2020/api/livros/${id}`);
        const dataLivro = await responseLivro.json();
        setLivro(dataLivro.livro);

        const responseAlunos = await fetch('http://localhost:2020/api/alunos');
        const dataAlunos = await responseAlunos.json();
        setAlunos(dataAlunos.alunos);

        // Calcula a data de início (hoje) e a data de fim (30 dias após a data de início)
        const dataAtual = new Date();
        const dataFimCalculada = new Date(dataAtual);
        dataFimCalculada.setDate(dataFimCalculada.getDate() + 30);

        setDataInicio(dataAtual);
        setDataFim(dataFimCalculada);
      }
      catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    fetchDados();
  }, [id]);

  // Função para enviar os dados do empréstimo para a API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação dos dados do empréstimo
    if (!alunoSelecionado) {
      window.alert('Erro, selecione um aluno!');
      return;
    }

    // Envia o empréstimo para a API
    try {
      const response = await fetch('http://localhost:2020/api/emprestimos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alunoId: Number(alunoSelecionado),
          livroId: Number(id),
          dataInicio: dataInicio?.toISOString().split('T')[0], // Formato YYYY-MM-DD
          dataFim: dataFim?.toISOString().split('T')[0] // Formato YYYY-MM-DD
        })
      });

      if (response.ok) {
        // Redireciona para a página inicial após o sucesso
        navigate('/');
      } else {
        console.error('Erro ao criar o empréstimo');
      }
    } catch (error) {
      console.error('Erro ao enviar o empréstimo:', error);
    }
  };

  return (
    <div className="flex-wrap">
      <section>
        <h1>{livro?.nome}</h1>
        <p>Autor: {livro?.autor}</p>
        <p>Disponível: {livro?.quantidadeDisponivel}</p>
      </section>

      <form onSubmit={handleSubmit}>
        <label>Aluno</label>
        <select value={alunoSelecionado} onChange={(e) => setAlunoSelecionado(e.target.value)}>
          <option value="">Selecione</option>
          {alunos.map(aluno => (
            <option value={aluno.id} key={aluno.id}>
              {aluno.matricula} - {aluno.nome}
            </option>
          ))}
        </select>

        <label>Data Início</label>
        <strong>{dataInicio?.toLocaleDateString("pt-BR")}</strong>

        <label>Prazo de Devolução</label>
        <strong>{dataFim?.toLocaleDateString("pt-BR")}</strong>

        <button type="submit">Emprestar</button>
      </form>
    </div>
  );
}

export default LivroDetalhes;