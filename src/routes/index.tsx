import 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import LivroDetalhes from '../pages/livro';
import Historico from '../pages/historico';
import EmprestimoDetalhes from '../pages/historico/emprestimo';
import NotFound from '../pages/notFound';

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/livro/:id" element={<LivroDetalhes/>}/>
            <Route path="/historico" element={<Historico/>}/>
            <Route path="/historico/:id" element={<EmprestimoDetalhes/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default UserRoutes;