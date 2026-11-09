# Oullin — Mídia Kit Institucional (v2.0)

Projeto atualizado do mídia kit digital da Oullin, com navegação responsiva, biblioteca de imagens, identidade visual baseada no manual da marca e recursos para impressão/salvamento em PDF.

## Requisitos

- Node.js 18 ou superior
- npm (incluído na instalação do Node.js)

## Como executar no Windows (PowerShell)

1. Extraia o arquivo ZIP.
2. Abra o PowerShell dentro da pasta `midia_kit_oullin` — a pasta que contém este `package.json`.
3. Execute:

```powershell
npm install
npm run dev
```

4. Abra no navegador o endereço mostrado no terminal, normalmente `http://localhost:4173`.

> Este projeto usa apenas recursos nativos do Node.js; não precisa baixar frameworks ou bibliotecas externas. O `package.json` já está incluído para evitar o erro `ENOENT` de ausência do arquivo.

## Build estático

```powershell
npm run build
npm run preview
```

A versão pronta para hospedagem será criada na pasta `dist/`.

## Estrutura

```text
midia_kit_oullin/
├── assets/
│   ├── brand/          logotipo e arquivos de referência
│   ├── titu/           mascote e referências de pose
│   ├── food/           fotografias ilustrativas de refeições
│   ├── people/         pessoas e empreendedorismo
│   └── applications/   embalagens e aplicações da marca
├── docs/               manual de identidade e guia rápido
├── downloads/          pacote ZIP de assets
├── app.js              interações da página
├── styles.css          identidade visual e responsividade
├── index.html          mídia kit
├── server.mjs          servidor local sem dependências externas
├── build.mjs           cópia dos arquivos para dist/
└── package.json        comandos npm
```

## Identidade visual aplicada

- Laranja Oullin: `#FB8500`
- Amarelo Oullin: `#FFB703`
- Azul institucional: `#083D77`
- Creme: `#EBEBD3`
- Grafite: `#1F2937`
- Branco: `#FFFFFF`
- Tipografia indicada no manual: SF Pro Rounded (títulos e chamadas) e Moderustic (textos e interface), com fontes de sistema como fallback.

A composição prioriza neutros, usa laranja como destaque principal e amarelo como acento. O logotipo oficial foi mantido sem redesenho.

## Conteúdo e limites

O material apresenta a estratégia e a proposta de valor descritas no manual de identidade. Não afirma que o aplicativo está publicado nem que todos os recursos já estão operacionais. Os exemplos de refeições e interfaces são ilustrativos, não representam catálogo real.

As informações de ingredientes e alergênicos são tratadas como declarações dos vendedores. O material orienta a confirmação direta com o estabelecimento e não promete ausência de contaminação cruzada ou segurança alimentar absoluta.

Não foram inventados telefone, e-mail, site, redes sociais, métricas, avaliações ou links de download do aplicativo.

## Assets

O pacote `downloads/oullin-assets.zip` reúne o logotipo, imagens do Titu, fotos ilustrativas de refeições, pessoas e aplicações da marca. A pasta `assets/titu/` contém uma pose individual em PNG transparente, uma referência 3D completa e um painel de referência com variações de pose.

## Imprimir ou salvar em PDF

Na página, use o botão “Salvar apresentação em PDF” e selecione “Salvar como PDF” na janela de impressão do navegador. O CSS de impressão remove a navegação e ajusta as seções para papel.
