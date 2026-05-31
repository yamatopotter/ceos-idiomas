# CÉOS Escola de Idiomas

Site institucional da CÉOS Escola de Idiomas, desenvolvido em HTML, CSS e JavaScript puros, sem frameworks ou dependências de runtime.

## Estrutura do projeto

```
ceos-idiomas/
├── index.html            # Página principal (single-page)
├── css/
│   ├── style.scss        # Fonte SCSS
│   └── style.css         # CSS compilado
├── js/
│   └── main.js           # Menu mobile, scroll suave
├── assets/
│   └── img/
│       ├── banner.webp
│       ├── logo.webp
│       ├── logo-full.webp
│       ├── papel-rasgado.webp
│       ├── sobre.webp
│       ├── idiomas/      # 10 bandeiras de idiomas
│       └── diferenciais/ # 10 ícones de diferenciais
└── tests/
    ├── screenshots.js    # Capturas multi-resolução (Puppeteer)
    └── lighthouse.js     # Auditorias de qualidade (Lighthouse)
```

## Seções da página

| Seção | Descrição |
|---|---|
| Topbar | Telefone, redes sociais e botão Secretaria On-line |
| Navbar | Logo, links de navegação e CTA sticky ao scroll |
| Hero | Banner principal com chamada de ação |
| Sobre Nós | Texto institucional com imagem lateral |
| Cursos | Grid com os 10 idiomas oferecidos |
| Diferenciais | Grid com os 10 diferenciais da escola |
| FAQ | Perguntas frequentes em duas colunas |
| Depoimentos | Testemunhos de alunos |
| Rodapé | Informações de contato, mapa e logo |

## Tecnologias

- **HTML5** semântico (single-page, sem frameworks)
- **CSS3** com custom properties (`--fs-sm/md/lg/xl`, `--paper-h`, `--topbar-h`) e `clamp()` para tipografia fluida
- **JavaScript** vanilla (menu mobile, smooth scroll)
- **WebP** em todas as imagens (redução de até 99% vs. PNG originais)
- Breakpoints responsivos: 480 px e 768 px

---

## Ferramentas de desenvolvimento

### Pré-requisitos

- Node.js 18+
- Google Chrome instalado em `/usr/bin/google-chrome`

### Instalação

```bash
npm install
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run serve` | Sobe servidor local em `http://localhost:8080` |
| `npm run screenshots` | Gera capturas de tela em 7 resoluções |
| `npm run lighthouse` | Roda auditorias Lighthouse (desktop + mobile) |
| `npm test` | Sobe servidor, screenshots e Lighthouse em sequência |

---

### Screenshots (`npm run screenshots`)

Usa **Puppeteer Core** com Chrome do sistema para capturar o site em 7 viewports:

| Viewport | Resolução |
|---|---|
| mobile-375 | 375 × 812 |
| mobile-390 | 390 × 844 |
| tablet-768 | 768 × 1024 |
| desktop-1280 | 1280 × 800 |
| fhd-1920 | 1920 × 1080 |
| qhd-2560 | 2560 × 1440 |
| 4k-3840 | 3840 × 2160 |

Para cada viewport são geradas 8 imagens: `full-page.png` + uma captura por seção (topo, about, cursos, diferenciais, faq, depoimentos, rodapé).

Saída: `tests/screenshots/<viewport>/`

---

### Lighthouse (`npm run lighthouse`)

Usa **Lighthouse CLI** para auditar performance, acessibilidade, boas práticas e SEO nas configurações desktop e mobile.

Relatórios gerados em `tests/lighthouse/`:
- `desktop.html` / `desktop.json`
- `mobile.html` / `mobile.json`

> Os diretórios `tests/screenshots/` e `tests/lighthouse/` estão no `.gitignore`.

---

## Responsividade

O layout foi validado contra mockups no Figma/PDF e testado nas seguintes condições:

- **Desktop** (≥ 1280 px): topbar + navbar sticky com efeito papel rasgado sobrepondo o hero
- **Tablet** (768 px): grid de cursos e diferenciais em 2 colunas
- **Mobile** (≤ 768 px): menu fullscreen com animação slide, topbar simplificada, hero proporcional
- **Mobile pequeno** (≤ 480 px): escala tipográfica reduzida, testimonials em coluna única
