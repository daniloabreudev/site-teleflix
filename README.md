# Teleflix Canais

Landing page responsiva para apresentar os planos da Teleflix Canais e direcionar visitantes ao atendimento pelo WhatsApp.

## Sobre o projeto

O site reúne informações sobre o serviço, uma amostra visual de canais, filmes e séries, os planos disponíveis e respostas para dúvidas frequentes. As chamadas de ação abrem conversas no WhatsApp com mensagens pré-preenchidas.

## Recursos

- Layout responsivo para celular e computador.
- Navegação mobile com menu expansível.
- Faixas roláveis de canais, filmes e séries, com controles e movimento automático.
- Notificação de teste grátis no cabeçalho após 10 segundos; o botão abre o WhatsApp.
- Faixa animada com nomes de clientes e planos.
- Tabela visual de planos, preços e economias informadas.
- Perguntas frequentes em formato expansível.
- Botão fixo de WhatsApp em telas menores.
- Respeito à preferência do navegador por movimento reduzido.

## Tecnologias

O projeto usa HTML, CSS e JavaScript puro. Não utiliza framework, biblioteca de interface, etapa de compilação ou gerenciador de pacotes.

## Estrutura

```text
site teleflix/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── teleflix-logo.jpeg
    ├── canais/
    ├── filmes/
    └── series/
```

## Como abrir localmente

A forma mais simples é abrir `index.html` no navegador.

Para servir a pasta localmente com Python, abra um terminal na pasta do projeto e execute:

```bash
python -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000).

## Personalização

- **Textos, preços, planos, títulos e links:** edite `index.html`.
- **Cores, fontes, espaçamentos e layout:** edite `css/style.css`.
- **Rolagem das faixas, menu e notificação:** edite `js/script.js`.
- **Logotipo e imagens:** substitua os arquivos nas pastas correspondentes de `assets/` e atualize os caminhos usados em `index.html`.
- **WhatsApp:** os botões usam links `wa.me`. Atualize o número e as mensagens pré-preenchidas nos links do `index.html` caso o atendimento mude.

## Publicação no GitHub Pages

1. Envie os arquivos do projeto para um repositório no GitHub.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch principal e a pasta `/ (root)`, depois salve.
5. Aguarde a publicação e abra o endereço exibido na página de configurações do Pages.

## Escopo

Este repositório contém apenas a interface da landing page. Não há backend, checkout, processamento de pagamentos ou integração de métricas. Os botões de contratação e teste encaminham o visitante ao WhatsApp.
