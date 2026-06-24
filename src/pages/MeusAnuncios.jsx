import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import { listarAnuncios, excluirAnuncio } from '../scripts/controllers/listarController.js';

import '../styles/pages/anuncios.css';

export default function MeusAnuncios() {
    const navigate = useNavigate();
    const [anuncios, setAnuncios] = useState([]);
    const [carregado, setCarregado] = useState(false);

    async function carregarAnuncios() {
        const lista = await listarAnuncios();
        setAnuncios(lista);
        setCarregado(true);
    }

    useEffect(() => {
        carregarAnuncios();
    }, []);

    async function deletarAnuncio(id) {
        const confirmar = window.confirm('Tem a certeza que deseja excluir este anúncio?');
        if (confirmar) {
            await excluirAnuncio(id);
            carregarAnuncios();
        }
    }

    return (
        <>
            <Navbar />

            <div className="container-geral">
                <div className="navegacao-lateral">
                    <nav className="menu-lateral">
                        <ul>
                            <li><a href="#">Meu perfil</a></li>
                            <li><a href="#">Meus anúncios</a></li>
                            <li><a href="#">Favoritos</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="anuncios">
                    <h1>Meus anúncios</h1>
                    <div id="containerAnuncios" className="lista-container">
                        {carregado && anuncios.length === 0 && (
                            <p>Nenhum anúncio encontrado.</p>
                        )}

                        {anuncios.map((imovel) => (
                            <div key={imovel.id} className="card-imovel">
                                <div className="info-imovel">
                                    <p>
                                        <strong>{imovel.titulo}</strong> | {imovel.tipo || 'Não definido'} | R$ {imovel.valor},00
                                    </p>
                                </div>
                                <div className="acoes">
                                    <button onClick={() => navigate(`/anunciar?edit=${imovel.id}`)}>
                                        Editar
                                    </button>
                                    <button onClick={() => deletarAnuncio(imovel.id)}>
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
