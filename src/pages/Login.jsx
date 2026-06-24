import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import logo from '../assets/images/logo/Maplar.svg';
import { fazerLogin, fazerCadastro } from '../scripts/controllers/loginController.js';

import '../styles/pages/login.css';

export default function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [abaAtual, setAbaAtual] = useState('login');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        if (searchParams.get('aba') === 'cadastro') {
            setAbaAtual('cadastro');
        }
    }, [searchParams]);

    function mudarAba(aba) {
        setAbaAtual(aba);
        setMensagem(null);
    }

    function toggleSenha() {
        setMostrarSenha((v) => !v);
    }

    async function submeter() {
        if (!email.trim() || !senha.trim()) {
            setMensagem({ texto: 'Preencha todos os campos.', tipo: 'erro' });
            return;
        }

        setCarregando(true);

        if (abaAtual === 'cadastro') {
            if (!nome.trim()) {
                setMensagem({ texto: 'Preencha seu nome.', tipo: 'erro' });
                setCarregando(false);
                return;
            }

            const resultado = await fazerCadastro(nome.trim(), email.trim(), senha.trim());
            if (resultado.ok) {
                setMensagem({ texto: resultado.mensagem, tipo: 'sucesso' });
                mudarAba('login');
            } else {
                setMensagem({ texto: resultado.mensagem, tipo: 'erro' });
            }
        } else {
            const resultado = await fazerLogin(email.trim(), senha.trim());
            if (resultado.ok) {
                setMensagem({ texto: resultado.mensagem, tipo: 'sucesso' });
                setTimeout(() => navigate('/'), 1200);
            } else {
                setMensagem({ texto: resultado.mensagem, tipo: 'erro' });
            }
        }

        setCarregando(false);
    }

    let textoBotao = abaAtual === 'login' ? 'Entrar' : 'Criar conta';
    if (carregando) textoBotao = 'Aguarde...';

    return (
        <div className="login-page">
            <div className="logo-area">
                <img src={logo} alt="Maplar" />
            </div>

            <div className="card">
                <h2>Acesse sua conta</h2>

                <div className="toggle">
                    <button
                        className={abaAtual === 'login' ? 'active' : ''}
                        onClick={() => mudarAba('login')}
                    >
                        Entrar
                    </button>
                    <button
                        className={abaAtual === 'cadastro' ? 'active' : ''}
                        onClick={() => mudarAba('cadastro')}
                    >
                        Criar conta
                    </button>
                </div>

                {abaAtual === 'cadastro' && (
                    <div className="form-group" id="campo-nome">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Seu nome completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="senha">Senha</label>
                    <div className="senha-wrapper">
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            id="senha"
                            placeholder="••••••••"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button type="button" className="toggle-senha" onClick={toggleSenha}>👁</button>
                    </div>
                </div>

                <button className="btn-submit" id="btn-submit" onClick={submeter} disabled={carregando}>
                    {textoBotao}
                </button>

                {mensagem && (
                    <div className={`mensagem ${mensagem.tipo}`}>
                        {mensagem.texto}
                    </div>
                )}
            </div>

            <p className="rodape"><Link to="/">← Voltar para o início</Link></p>
        </div>
    );
}
