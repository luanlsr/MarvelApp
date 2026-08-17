# Best Practices & Guidelines

## 16. REGRESSION SAFETY & 17. MINIMAL CHANGE PRINCIPLE
A nova funcionalidade não deve quebrar o que já existe. Não refatore o projeto inteiro só por perfeccionismo se não houver necessidade para a tarefa em questão. Prefira mudanças pequenas com comportamento claro.

## 18. EXISTING ARCHITECTURE & 19. DEPENDENCY POLICY
Respeite a arquitetura existente. Não adicione novas libs ou frameworks sem justificar e validar se há real necessidade (ou verificar se não há solução existente no projeto).

## 20. SECURITY BOUNDARY & 21. ENVIRONMENT AWARENESS
Nunca exponha keys, destrua ambientes ou apague dados críticos (ex: DROP DATABASE em Produção). Esteja ciente do ambiente (LOCAL, TEST, STAGING, PRODUCTION) antes de qualquer comando perigoso.

## 22. OBSERVABILITY & 23. UI / UX VALIDATION
Utilize logs, métricas, network tab, e respostas de API. Para frontend, não assuma que "o código parece correto"; verifique acessibilidade, responsividade, estados vazios/erros e comportamento real (testando ferramentas que inspecionem visualmente se possível, ou rodando local).

## 24. API VALIDATION & 25. DATABASE SAFETY
Para APIs, valide o fluxo ponta-a-ponta (request → validation → business logic → DB → response). Para banco de dados, garanta compatibilidade de migrations e não perca dados importantes.

## 26. GIT AWARENESS & 27. STATE MANAGEMENT
Use Git quando apropriado. Mantenha pequenos commits descritivos. Mantenha um registro/estado visível de longo prazo do seu progresso, não se apoie exclusivamente na memória da conversa (use arquivos de log/progresso).

## 34. TASK PRIORITIZATION
Prioridade: BLOCKERS → CORE FUNCTIONALITY → REGRESSIONS → TESTS → UX → PERFORMANCE → REFACTORING. 

## 37. WHEN TO ASK THE USER & 38. DEFAULT DECISION RULE
Só interrompa e pergunte se for impossível inferir algo de negócio crítico de forma segura. Regra de ouro para ambiguidades: `existing behavior > explicit spec > architecture > conventions > best practices > simplest reversible solution`. Não invente requisitos.
