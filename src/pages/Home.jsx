import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import Navbar from '../components/Navbar.jsx';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const slides = [
    {
        titulo: 'Bem-vindo ao Maplar',
        subtitulo: 'Encontre seu imóvel ideal',
        texto: 'Casas, apartamentos e oportunidades perto de você',
        botoes: true,
    },
    {
        titulo: 'Anuncie em minutos',
        texto: 'Seu imóvel visto por milhares de pessoas',
    },
    {
        titulo: 'Direto com o proprietário',
        texto: 'Sem taxas escondidas, sem complicação',
    },
];

export default function Home() {
    const [current, setCurrent] = useState(0);
    const mapRef = useRef(null);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, 4000);
        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
        if (!mapRef.current || mapRef.current._leaflet_id) return;

        const map = L.map(mapRef.current).setView([-8.283, -35.976], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Mapa',
        }).addTo(map);

        L.marker([-8.283, -35.976])
            .addTo(map)
            .bindPopup('Casa disponível')
            .openPopup();
    }, []);

    return (
        <>
            <Navbar />

            <section className="hero">
                <div className="carousel">
                    {slides.map((slide, i) => (
                        <div key={i} className={`slide${i === current ? ' active' : ''}`}>
                            <h1>{slide.titulo}</h1>
                            {slide.subtitulo && <h2>{slide.subtitulo}</h2>}
                            <p>{slide.texto}</p>

                            {slide.botoes && (
                                <div className="hero-buttons">
                                    <a href="#imoveis" className="cta">Ver imóveis</a>
                                    <Link to="/anunciar" className="cta-secundario">Anunciar</Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="indicators">
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            className={`dot${i === current ? ' active' : ''}`}
                            onClick={() => setCurrent(i)}
                        ></span>
                    ))}
                </div>
            </section>

            <section className="prova-social">
                <p>+150 imóveis cadastrados • +80 clientes satisfeitos</p>
            </section>

            <section className="beneficios">
                <div className="beneficio">
                    <h3>Fácil de usar</h3>
                    <p>Encontre imóveis rapidamente sem burocracia</p>
                </div>
                <div className="beneficio">
                    <h3>Rápido</h3>
                    <p>Contato direto e ágil com quem anuncia</p>
                </div>
                <div className="beneficio">
                    <h3>Sem taxas escondidas</h3>
                    <p>Transparência total nos anúncios</p>
                </div>
            </section>

            <section className="cta-final">
                <h2>Tem um imóvel parado?</h2>
                <p>Anuncie agora e encontre interessados rapidamente</p>
                <Link to="/anunciar" className="btn-cta-final">
                    Anunciar meu imóvel
                </Link>
            </section>

            <section className="captura">
                <h2>Quer receber notícias de imóveis no WhatsApp?</h2>
                <input type="text" placeholder="Seu nome" />
                <input type="text" placeholder="Seu WhatsApp" />
                <button>Quero receber imóveis no WhatsApp</button>
            </section>

            <div className="busca">
                <input type="text" placeholder="Digite bairro, cidade ou preço..." />
                <button>Buscar</button>
            </div>

            <div className="container" id="imoveis">
                <div className="card">
                    <h3>Casa no Maurício de Nassau</h3>
                    <p>3 quartos | 2 banheiros</p>
                    <p className="preco">R$ 1.200 / mês</p>
                    <a href="#" className="btn">Quero alugar</a>
                    <a href="#" className="btn-outline">Ver detalhes</a>
                </div>

                <div className="card">
                    <h3>Casa no Centro</h3>
                    <p>2 quartos | 1 banheiro</p>
                    <p className="preco">R$ 900 / mês</p>
                    <a href="#" className="btn">Quero alugar</a>
                    <a href="#" className="btn-outline">Ver detalhes</a>
                </div>
            </div>

            <h2 className="titulo-mapa">Encontre no mapa</h2>
            <div id="map" ref={mapRef}></div>

            <section className="depoimentos">
                <h2>O que estão dizendo sobre nós?</h2>
                <div className="depoimento">
                    <p>"Consegui alugar minha casa em 2 dias!"</p>
                    <span>- Maria</span>
                </div>
                <div className="depoimento">
                    <p>"Muito mais fácil que imobiliária"</p>
                    <span>- João</span>
                </div>
            </section>
        </>
    );
}
