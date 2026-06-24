import { Link } from 'react-router-dom';
import logo from '../assets/images/logo/Maplar.svg';

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Maplar logo" />
                </Link>
            </div>

            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">Explorar</a></li>
                    <li><a href="#">Mapa</a></li>
                    <li><Link to="/anunciar">Anunciar</Link></li>
                    <li><Link to="/meus-anuncios">Meus Anúncios</Link></li>
                </ul>
            </nav>

            <div className="nav-auth">
                <Link to="/login" className="btn-login">Entrar</Link>
                <Link to="/login?aba=cadastro" className="btn-cadastro-nav">Criar conta</Link>
            </div>
        </header>
    );
}
