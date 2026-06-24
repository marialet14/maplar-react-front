# Maplar — versão React + Vite

Esta é a versão do projeto Maplar refeita com **React + Vite**.
É uma cópia do projeto original (`maplar-frontend-main`), que continua intacto.

## A ideia principal

O projeto foi dividido em duas partes bem separadas:

| Parte | Tecnologia | O que faz |
|-------|-----------|-----------|
| **Visual (telas)** | React (arquivos `.jsx`) | Mostra a interface na tela |
| **Lógica (regras)** | JavaScript puro (arquivos `.js`) | Models, Services e Controllers — **sem React** |

> A pasta `src/scripts` (models, services e controllers) é **JavaScript puro**.
> Quem não conhece React consegue ler e entender essa parte normalmente, porque
> é igual ao projeto original. O React só cuida de mostrar as coisas na tela.

## Como rodar

```bash
npm install     # instala as dependências (só na primeira vez)
npm run dev     # inicia o servidor de desenvolvimento (http://localhost:5173)
npm run build   # gera a versão final para produção (pasta dist/)
```

> Obs.: o login, anunciar e meus anúncios dependem da API rodando em
> `http://localhost:3001` (mesma do projeto original).

## Estrutura das pastas

```
maplar-frontend-react/
├── index.html              → página única; o React monta tudo aqui
├── package.json            → dependências e scripts (npm run dev/build)
├── vite.config.js          → configuração do Vite
│
└── src/
    ├── main.jsx            → ponto de partida: liga o React no index.html
    ├── App.jsx             → define as rotas (qual tela aparece em cada URL)
    │
    ├── components/
    │   └── Navbar.jsx      → cabeçalho reaproveitado em várias telas
    │
    ├── pages/              → cada tela virou um componente React
    │   ├── Home.jsx        → antiga index.html (carrossel + mapa)
    │   ├── Anunciar.jsx    → antiga anunciar.html (formulário)
    │   ├── MeusAnuncios.jsx→ antiga meus-anuncios.html (lista)
    │   └── Login.jsx       → antiga login.html (entrar / criar conta)
    │
    ├── scripts/            → ★ JAVASCRIPT PURO (a lógica, sem React) ★
    │   ├── models/         → Imovel.js, User.js (classes de dados)
    │   ├── services/       → imovelService.js, UserService.js (fetch da API)
    │   └── controllers/    → imovelController.js, listarController.js,
    │                         loginController.js (regras de negócio)
    │
    └── styles/             → mesmos CSS do projeto original
```

## Como as telas usam a lógica

O fluxo é sempre o mesmo e fácil de explicar:

```
Tela (React .jsx)  →  chama uma função do Controller (.js puro)
Controller (.js)   →  monta o Model e chama o Service
Service (.js)      →  faz o fetch na API e devolve o resultado
```

A tela em React **não sabe** como salvar/buscar na API — ela só chama o
controller e mostra o que ele devolver. Toda a regra continua nos arquivos
`.js`, exatamente como no projeto original.

## O que mudou em relação ao original

- As 4 páginas `.html` viraram 4 componentes em `src/pages`.
- A navegação entre páginas agora usa o **React Router** (URLs `/`, `/anunciar`,
  `/meus-anuncios`, `/login`) em vez de links para arquivos `.html`.
- O carrossel da home (que estava no `script.js`) virou estado do React.
- Os **controllers foram ajustados** para apenas receber dados e devolver
  resultados (não mexem mais direto no HTML/`document`); quem mexe na tela
  agora é o React. A lógica de negócio em si continua a mesma.
- **Models e Services continuam praticamente idênticos** ao original (só
  ganharam `export` para o React conseguir importar).
