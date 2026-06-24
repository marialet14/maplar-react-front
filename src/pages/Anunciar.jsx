import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import { buscarImovelParaEdicao, salvarImovel } from '../scripts/controllers/imovelController.js';

import '../styles/pages/anunciar.css';

export default function Anunciar() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const idParaEditar = searchParams.get('edit');

    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [imagem, setImagem] = useState('');
    const [quarto, setQuarto] = useState('');
    const [banheiro, setBanheiro] = useState('');
    const [descricao, setDescricao] = useState('');

    const editando = Boolean(idParaEditar);

    useEffect(() => {
        async function carregarEdicao() {
            const imovel = await buscarImovelParaEdicao(idParaEditar);
            if (imovel) {
                setTitulo(imovel.titulo ?? '');
                setValor(imovel.valor ?? '');
                setTipo(imovel.tipo ?? '');
                setQuarto(imovel.quarto ?? '');
                setBanheiro(imovel.banheiro ?? '');
                setDescricao(imovel.descricao ?? '');
            }
        }
        carregarEdicao();
    }, [idParaEditar]);

    async function capturarDados(event) {
        event.preventDefault();

        const dados = { titulo, valor, tipo, imagem, quarto, banheiro, descricao };
        const sucesso = await salvarImovel(dados, idParaEditar);

        if (sucesso) {
            navigate('/meus-anuncios');
        }
    }

    return (
        <>
            <Navbar />

            <div className="container-pag">
                <form id="formImovel" name="formImovel" onSubmit={capturarDados}>
                    <h1 className="titulo-pagina">
                        {editando ? 'Editar meu imóvel' : 'Anunciar meu imóvel'}
                    </h1>

                    <h2 className="rotulo">Inserir imagem</h2>
                    <div className="container-imagem">
                        <div className="inserir-imagem">
                            <input
                                type="file"
                                id="imagem"
                                name="imagem"
                                accept="image/*"
                                onChange={(e) => setImagem(e.target.files[0]?.name || '')}
                            />
                        </div>
                    </div>

                    <div>
                        <h2 className="topicos-pagina">Tipo de anúncio</h2>
                        <div className="container-tipo-anuncio">
                            <div className="tipo-anuncio">
                                <input
                                    type="radio"
                                    id="aluguel"
                                    name="tipo"
                                    value="aluguel"
                                    checked={tipo === 'aluguel'}
                                    onChange={(e) => setTipo(e.target.value)}
                                />
                                <label htmlFor="aluguel">Aluguel</label>
                                <p>Anuncie para alugar rápido e com segurança</p>
                            </div>
                            <div className="tipo-anuncio">
                                <input
                                    type="radio"
                                    id="venda"
                                    name="tipo"
                                    value="venda"
                                    checked={tipo === 'venda'}
                                    onChange={(e) => setTipo(e.target.value)}
                                />
                                <label htmlFor="venda">Venda</label>
                                <p>Venda seu imóvel pelo melhor preço de mercado</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="topicos-pagina">Detalhes do imovel</h2>
                    <div className="superior-detalhes">
                        <div className="detalhe">
                            <label htmlFor="titulo" className="rotulo">Título</label>
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>
                        <div className="detalhe">
                            <label htmlFor="valor" className="rotulo">Valor</label>
                            <input
                                type="number"
                                name="valor"
                                id="valor"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="inferior-detalhes">
                        <div className="detalhe">
                            <label htmlFor="descricao" className="rotulo">Descrição</label>
                            <textarea
                                name="descricao"
                                id="descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="direita-detalhes">
                            <div className="detalhe">
                                <label htmlFor="quarto" className="rotulo">Quartos</label>
                                <input
                                    type="number"
                                    name="quarto"
                                    id="quarto"
                                    value={quarto}
                                    onChange={(e) => setQuarto(e.target.value)}
                                />
                            </div>
                            <div className="detalhe">
                                <label htmlFor="banheiro" className="rotulo">Banheiros</label>
                                <input
                                    type="number"
                                    name="banheiro"
                                    id="banheiro"
                                    value={banheiro}
                                    onChange={(e) => setBanheiro(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit">
                        {editando ? 'Salvar Alterações' : 'Publicar anúncio'}
                    </button>
                </form>
            </div>
        </>
    );
}
