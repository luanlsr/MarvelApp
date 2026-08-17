Você é um Arquiteto de Software Sênior, UX/UI Designer e Desenvolvedor Full Stack especializado em aplicações modernas de catálogo, tracking de conteúdo e streaming legal.

Crie uma aplicação web completa chamada:

"Marvel Watch Tracker"

Objetivo:

Criar um aplicativo pessoal para acompanhar uma maratona completa de filmes e séries da Marvel até Avengers: Doomsday.

O usuário deve conseguir visualizar todos os títulos da maratona, marcar o que já assistiu, acompanhar seu progresso, visualizar banners/posters, consultar detalhes de cada produção, temporadas e episódios, adicionar notas e descobrir onde assistir oficialmente.

IMPORTANTE:
O aplicativo NÃO deve disponibilizar IPTV pirata, listas M3U, links de streaming não autorizados, torrents ou conteúdo protegido por direitos autorais hospedado pelo próprio sistema.

Pode existir uma área "Onde assistir" que mostre serviços oficiais/legalmente disponíveis e links para as plataformas correspondentes.

==================================================
1. STACK
==================================================

Frontend:

- Next.js 15+
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion
- TanStack Query

Backend:

- Next.js API Routes ou Server Actions
- PostgreSQL
- Prisma ORM

Autenticação:

- Supabase Auth

Storage:

- Supabase Storage

Deploy:

- Vercel

Banco:

- Supabase PostgreSQL

Arquitetura:

- Componentização
- Clean Architecture quando fizer sentido
- Repository Pattern
- Services
- API abstraction
- Tipagem forte
- Código preparado para crescimento

==================================================
2. OBJETIVO PRINCIPAL
==================================================

O aplicativo deve funcionar como um tracker de maratona.

Cada produção terá:

- Poster
- Banner horizontal
- Título
- Título original
- Tipo: filme / série / especial / temporada
- Ano
- Data de lançamento
- Universo
- Fase
- Ordem recomendada
- Ordem cronológica opcional
- Importância para Avengers: Doomsday
- Status do usuário
- Nota pessoal
- Comentário pessoal
- Data em que assistiu
- Tempo total
- Plataforma onde assistir
- Trailer
- Sinopse
- Personagens principais

Status possíveis:

- Não assistido
- Assistindo
- Concluído
- Reassistir
- Ignorado

==================================================
3. DASHBOARD
==================================================

Criar uma Home Dashboard extremamente bonita.

Hero principal:

"Minha Jornada até Avengers: Doomsday"

Mostrar:

- Banner cinematográfico
- Contagem regressiva para Avengers: Doomsday
- Data do filme
- Percentual da maratona concluído
- Filmes concluídos
- Séries concluídas
- Episódios concluídos
- Horas assistidas
- Horas restantes
- Próximo título

Exemplo:

MARATONA ATÉ DOOMSDAY

73 / 126 produções concluídas

58%

Você já assistiu 124h 32min

Próximo:

Loki — Temporada 2

Botão:

"Continuar maratona"

==================================================
4. SISTEMA DE PROGRESSO
==================================================

O progresso deve ser calculado automaticamente.

Filmes:

0% = não assistido
100% = concluído

Séries:

Calcular por episódio.

Exemplo:

Loki T1

4 / 6 episódios

66%

Mostrar barra de progresso.

Permitir:

- marcar episódio individualmente
- marcar temporada completa
- marcar série completa

==================================================
5. PÁGINA DE CATÁLOGO
==================================================

Criar /catalogo

Layout:

Desktop:
sidebar + grid

Mobile:
grid responsivo

Cada card deve mostrar:

- Poster
- Título
- Ano
- Tipo
- Importância
- Status
- Progresso

Exemplo:

[POSTER]

Loki

2021

Série

★★★★★

✓ Concluído

Hover:

Mostrar:

"Ver detalhes"

"Marcar como assistido"

"Assistir trailer"

"Onde assistir"

==================================================
6. BANNER
==================================================

Cada produção deve possuir:

poster vertical:

500x750

banner horizontal:

1920x1080 ou 1920x800

Na página de detalhes:

usar o banner como background.

Aplicar:

- gradient overlay
- blur
- dark overlay

Layout:

[BANNER]

Título

Ano • duração • gênero

★★★★★ Importância para Doomsday

Sinopse

[Marcar como assistido]

[Continuar assistindo]

[Trailer]

[Onde assistir]

==================================================
7. PÁGINA DE DETALHES
==================================================

URL:

/titulo/[slug]

Mostrar:

Banner

Poster

Título

Título original

Ano

Diretor

Elenco principal

Sinopse

Importância para Doomsday

Ordem recomendada

Ordem cronológica

Status

Nota pessoal

Comentários

Data assistido

Onde assistir

Trailer

Produções relacionadas

==================================================
8. SÉRIES
==================================================

Séries devem possuir:

Temporadas

Episódios

Exemplo:

Loki

Temporada 1

EP 01
EP 02
EP 03
EP 04
EP 05
EP 06

Cada episódio:

- número
- título
- duração
- sinopse
- thumbnail
- status
- data assistido

Botão:

"Marcar episódio como assistido"

Botão:

"Marcar temporada completa"

==================================================
9. FILMES
==================================================

Para filmes:

- duração
- poster
- banner
- trailer
- sinopse
- elenco
- diretor
- status

Botão:

"Marcar como assistido"

==================================================
10. ORDEM DA MARATONA
==================================================

Criar página:

/maratona

Mostrar todos os títulos na ordem recomendada.

Separar em blocos:

FASE 1
MCU ORIGINAL

FASE 2
MULTIVERSO

FASE 3
HOMEM-ARANHA

FASE 4
X-MEN

FASE 5
DEADPOOL

FASE 6
QUARTETO FANTÁSTICO

FASE 7
MCU ATUAL

FASE 8
MARVEL TELEVISION

FASE 9
MARVEL ANTIGO

Cada bloco deve mostrar:

progresso:

12 / 20 concluídos

60%

==================================================
11. CLASSIFICAÇÃO DE IMPORTÂNCIA
==================================================

Cada título deve possuir:

importance:

ESSENCIAL
MUITO IMPORTANTE
RECOMENDADO
COMPLEMENTAR
OPCIONAL

Visualmente:

ESSENCIAL = destaque máximo
MUITO IMPORTANTE = destaque alto
RECOMENDADO = médio
COMPLEMENTAR = baixo
OPCIONAL = discreto

Também permitir filtrar:

"Mostrar apenas essenciais"

==================================================
12. FILTROS
==================================================

Criar filtros:

Status:

- Todos
- Não assistidos
- Assistindo
- Concluídos
- Reassistir
- Ignorados

Tipo:

- Filme
- Série
- Temporada
- Especial

Universo:

- MCU
- Fox
- Sony
- Marvel Television
- Outros

Importância:

- Essencial
- Muito importante
- Recomendado
- Complementar
- Opcional

Ano:

slider ou dropdown.

==================================================
13. PESQUISA
==================================================

Pesquisa global.

Pesquisar por:

- título
- personagem
- ator
- ano
- universo

Pesquisa instantânea.

==================================================
14. "CONTINUAR MARATONA"
==================================================

Criar algoritmo que identifica automaticamente:

último título concluído

e mostra:

"Continue daqui"

Exemplo:

Você terminou:

Deadpool 2

Próximo:

Deadpool & Wolverine

Botão:

"Continuar"

==================================================
15. ONDE ASSISTIR
==================================================

Criar seção:

"Onde assistir"

IMPORTANTE:

Não implementar IPTV pirata.

Não aceitar:

- listas M3U não autorizadas
- IPTV pirata
- torrents
- scraping de sites piratas
- links ilegais
- conteúdo protegido hospedado pelo aplicativo

Em vez disso:

Mostrar plataformas oficiais.

Exemplo:

Disponível em:

Disney+
Prime Video
Apple TV
Max

Cada plataforma deve possuir:

- nome
- logo
- preço quando disponível
- tipo: assinatura / aluguel / compra
- link oficial

Criar botão:

"Assistir oficialmente"

Abrir o serviço oficial.

==================================================
16. INTEGRAÇÃO COM JUSTWATCH
==================================================

Se houver API oficial/licenciada disponível, permitir integração para descobrir:

- onde assistir
- aluguel
- compra
- assinatura

Não depender de scraping ilegal.

Criar abstraction:

StreamingProvider

interface:

search(title)
getAvailability(title)
getPlatforms(title)

Assim será possível trocar o provider posteriormente.

==================================================
17. TRAILERS
==================================================

Adicionar trailers oficiais.

Preferencialmente:

YouTube oficial da Marvel/Disney/Sony/Fox.

Botão:

"Assistir trailer"

Abrir modal.

Não hospedar vídeos protegidos.

==================================================
18. PERSONAGENS
==================================================

Criar banco de personagens.

Exemplo:

Tony Stark
Steve Rogers
Thor
Loki
Wanda Maximoff
Doctor Strange
Spider-Man
Deadpool
Wolverine
Reed Richards
Victor von Doom

Cada personagem:

- nome
- imagem
- descrição
- títulos relacionados

Página:

/personagens

==================================================
19. RELACIONAMENTOS
==================================================

Cada produção pode estar relacionada a outras.

Exemplo:

Deadpool & Wolverine

Relacionados:

Deadpool
Deadpool 2
Logan
X-Men
Loki
Daredevil

Mostrar:

"Você também deveria assistir"

==================================================
20. TIMELINE
==================================================

Criar uma página visual:

/timeline

Mostrar a história da Marvel em uma timeline.

Cards conectados.

Permitir alternar:

"Ordem recomendada"

"Ordem cronológica"

"Ordem de lançamento"

==================================================
21. CALENDÁRIO DA MARATONA
==================================================

Criar:

/planejamento

O usuário informa:

Data inicial

Horas disponíveis por semana

Dias disponíveis

O sistema calcula:

"Você terminará a maratona em X"

Criar calendário automático.

Exemplo:

Segunda
Loki EP 1

Quarta
Loki EP 2

Sábado
Loki EP 3

Mostrar:

Data estimada para concluir a maratona.

Também mostrar:

"Você está X dias adiantado/atrasado."

==================================================
22. METAS
==================================================

Permitir criar metas.

Exemplo:

"Assistir 3 filmes por semana"

"Terminar X-Men até setembro"

"Terminar MCU antes de Doomsday"

Dashboard:

Meta semanal:

████████░░ 80%

==================================================
23. ESTATÍSTICAS
==================================================

Criar página:

/estatisticas

Mostrar:

Total de títulos

Concluídos

Pendentes

Horas assistidas

Horas restantes

Filmes assistidos

Séries assistidas

Episódios assistidos

Percentual total

Universo mais assistido

Ano com mais filmes

Personagem mais recorrente

Diretor mais assistido

Ranking dos títulos favoritos

==================================================
24. NOTAS
==================================================

Permitir nota pessoal:

1 a 10

Comentários.

Exemplo:

Deadpool & Wolverine

Nota:

9.5/10

Comentário:

"Excelente conexão com o multiverso."

==================================================
25. FAVORITOS
==================================================

Botão:

❤️ Favoritar

Página:

/favoritos

Mostrar favoritos.

==================================================
26. LISTA "QUERO ASSISTIR"
==================================================

Permitir adicionar:

"Quero assistir"

Isso é diferente de:

"Não assistido"

==================================================
27. REASSISTIR
==================================================

Permitir marcar:

"Quero reassistir"

Criar lista:

/reassistir

==================================================
28. MODO MARATONA
==================================================

Criar um modo especial:

"Modo Maratona"

Tela limpa.

Mostrar somente:

Título atual

Poster

Progresso

Próximo título

Botões:

Anterior
Concluído
Próximo

Ideal para assistir sem distrações.

==================================================
29. COUNTDOWN
==================================================

No dashboard:

AVENGERS: DOOMSDAY

18 DE DEZEMBRO DE 2026

Contagem regressiva:

XX dias
XX horas
XX minutos
XX segundos

Atualização em tempo real.

==================================================
30. SISTEMA DE ALERTAS
==================================================

Criar notificações opcionais:

"Você está há 3 dias sem assistir."

"Você precisa assistir 2 títulos esta semana para cumprir sua meta."

"Você concluiu 50% da maratona."

"Faltam 30 dias para Doomsday."

==================================================
31. IMPORTAÇÃO DE DADOS
==================================================

Criar painel administrativo.

Permitir cadastrar:

filmes

séries

temporadas

episódios

personagens

plataformas

relacionamentos

ordem da maratona

==================================================
32. API EXTERNA PARA METADADOS
==================================================

Não digitar manualmente todos os dados.

Criar integração com uma API de metadados licenciada ou permitida.

Exemplos possíveis:

TMDB API

OMDb

Outras APIs legais.

Utilizar a API para:

- poster
- backdrop
- título
- ano
- sinopse
- elenco
- diretor
- duração
- temporadas
- episódios
- gêneros

Criar camada:

MetadataProvider

Para permitir trocar a API futuramente.

==================================================
33. BANCO DE DADOS
==================================================

Criar tabelas:

users

titles

seasons

episodes

characters

title_characters

platforms

title_platforms

watch_progress

user_titles

user_episodes

ratings

reviews

favorites

watchlist

marathon_sections

marathon_items

related_titles

trailers

notifications

settings

==================================================
34. USER EXPERIENCE
==================================================

Design:

Cinematográfico.

Inspirado na estética dos grandes catálogos de streaming.

Não copiar interfaces proprietárias.

Tema:

Dark mode como padrão.

Background quase preto.

Cards grandes.

Backdrops cinematográficos.

Animações suaves.

Glassmorphism moderado.

Gradientes discretos.

Tipografia moderna.

Mobile First.

Desktop:

sidebar fixa

conteúdo amplo

grid de posters.

Mobile:

bottom navigation.

==================================================
35. NAVEGAÇÃO
==================================================

Menu:

🏠 Início

🎬 Maratona

📚 Catálogo

▶ Continuar

❤️ Favoritos

📅 Planejamento

📊 Estatísticas

👤 Perfil

==================================================
36. HOME
==================================================

Hero:

"Minha jornada até DOOMSDAY"

Mostrar:

poster/banner da próxima produção.

Exemplo:

LOKI

Temporada 2

"Você está pronto para continuar?"

[Continuar]

Depois:

Progresso geral

Próximos títulos

Continue assistindo

Essenciais pendentes

Favoritos

Estatísticas

==================================================
37. RESPONSIVIDADE
==================================================

O aplicativo precisa funcionar perfeitamente:

Desktop
Notebook
Tablet
Celular

No celular:

Bottom navigation.

Cards adaptáveis.

No desktop:

Sidebar.

Grid de 5-7 posters.

==================================================
38. PWA
==================================================

Transformar em Progressive Web App.

Permitir:

"Adicionar à tela inicial"

Offline:

cache dos dados básicos da maratona.

==================================================
39. SEGURANÇA
==================================================

Implementar:

Supabase Auth

Row Level Security

Cada usuário somente pode acessar:

seus próprios:

progresso

notas

favoritos

watchlist

planejamento

estatísticas

==================================================
40. MODO CONVIDADO
==================================================

Permitir experimentar sem criar conta.

O progresso pode ser salvo:

localStorage.

Depois:

"Salvar meu progresso"

→ criar conta.

==================================================
41. SEED INICIAL
==================================================

Criar seed completo contendo a maratona Marvel até Avengers: Doomsday.

Cadastrar:

todos os filmes

todas as séries

temporadas

episódios

One-Shots relevantes

produções Fox relevantes

produções Sony relevantes

Quarteto Fantástico

X-Men

Deadpool

MCU

Marvel Television

etc.

Cada título deve possuir:

ordem

importância

universo

tipo

ano

relações

==================================================
42. IMPORTANTE SOBRE DIREITOS AUTORAIS
==================================================

Não copiar imagens protegidas diretamente para armazenamento próprio sem verificar os direitos/licença.

Preferir:

URLs/imagens provenientes de APIs licenciadas.

Não hospedar filmes ou episódios.

Não criar player para conteúdo protegido obtido ilegalmente.

O player deve ser utilizado somente para:

- trailers oficiais
- conteúdo fornecido legalmente
- embeds autorizados

Para filmes e séries:

mostrar:

"Onde assistir"

com links oficiais.

==================================================
43. ARQUITETURA DO PLAYER
==================================================

Criar componente:

MediaPlayer

Suportar:

YouTube embed

vídeo próprio autorizado

outros providers oficiais quando permitido.

Não implementar:

M3U

Xtream Codes

listas IPTV piratas

torrent

scraping de streaming

bypass de DRM

==================================================
44. ADMIN
==================================================

Criar:

/admin

Dashboard:

total de títulos

filmes

séries

episódios

usuários

plataformas

relacionamentos

Permitir:

CRUD completo.

==================================================
45. DESIGN DOS CARDS
==================================================

Poster:

aspect ratio 2:3.

Ao passar mouse:

aumentar levemente.

Mostrar overlay:

▶ Continuar

✓ Concluído

★ Nota

"Essencial"

==================================================
46. GAMIFICAÇÃO
==================================================

Criar XP.

Exemplo:

Filme concluído:

+100 XP

Episódio:

+25 XP

Temporada completa:

+200 XP

Meta semanal:

+300 XP

Criar níveis:

Novato Marvel

Conhecedor

Vingador

Especialista

Guardiã do Multiverso

Mestre do Multiverso

Doomsday Ready

==================================================
47. CONQUISTAS
==================================================

Criar achievements.

Exemplos:

🏆 Primeiro Filme

🏆 Primeiro Episódio

🏆 10 títulos

🏆 50 títulos

🏆 100 títulos

🏆 Primeira série completa

🏆 Saga do Infinito completa

🏆 Multiverso completo

🏆 X-Men completo

🏆 Deadpool completo

🏆 Quarteto Fantástico completo

🏆 100% Doomsday Ready

==================================================
48. PÁGINA "DOOMSDAY READY"
==================================================

Criar uma página especial.

Título:

"Você está pronto para DOOMSDAY?"

Mostrar checklist:

MCU clássico ✓

Saga do Infinito ✓

Loki ✓

Multiverso ✓

Homem-Aranha ✓

X-Men ✓

Deadpool ✓

Quarteto Fantástico ✓

MCU atual ✓

Quando tudo estiver completo:

ANIMAÇÃO:

"DOOMSDAY READY"

Mostrar:

100%

"Você está preparado."

==================================================
49. UX PARA EPISÓDIOS
==================================================

Ao clicar:

"Concluído"

Salvar imediatamente.

Mostrar:

✓ Assistido

Data:

16/08/2026

Permitir alterar.

==================================================
50. PERFORMANCE
==================================================

Implementar:

lazy loading

image optimization

Next Image

pagination

infinite scroll quando apropriado

React Server Components quando fizer sentido

cache

debounce na pesquisa

==================================================
51. SEO
==================================================

Cada título deve possuir:

metadata

OpenGraph

Twitter cards

URLs amigáveis.

Exemplo:

/marvel/vingadores-guerra-infinita

==================================================
52. ENTREGA
==================================================

Entregar:

1. Projeto completo.

2. Banco de dados.

3. Prisma schema.

4. Seed inicial.

5. Autenticação.

6. Dashboard.

7. Catálogo.

8. Página de detalhes.

9. Sistema de episódios.

10. Tracker.

11. Estatísticas.

12. Gamificação.

13. Countdown.

14. Planejamento.

15. Favoritos.

16. Watchlist.

17. Onde assistir.

18. Integração de trailers.

19. Admin.

20. PWA.

21. Responsividade.

22. README completo.

==================================================
53. REGRA IMPORTANTE
==================================================

Não criar apenas um mockup.

Criar uma aplicação funcional.

Todos os botões principais devem funcionar.

Persistir dados no banco.

O progresso deve sobreviver ao refresh.

Usuário deve conseguir:

criar conta

entrar

marcar filme

marcar episódio

adicionar nota

favoritar

criar planejamento

visualizar estatísticas

consultar onde assistir

==================================================
54. EXPERIÊNCIA FINAL
==================================================

O aplicativo deve passar a sensação de:

"Meu painel pessoal para me preparar para Avengers: Doomsday."

A experiência deve ser cinematográfica, elegante, rápida e divertida.

Priorizar:

UX

visual

progresso

maratona

descoberta

gamificação

e acompanhamento.

Não transformar o app em uma simples tabela de filmes.

Criar uma verdadeira experiência de "jornada pelo multiverso".
