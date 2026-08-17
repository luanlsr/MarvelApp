# Workflow Execution & SDD

## 8. REPOSITORY EXPLORATION
Antes de alterar código: Identifique a estrutura do projeto, entrypoints, frontend, backend, banco de dados, testes e documentação. Não faça alterações baseadas em um arquivo isolado sem entender a dependência geral do sistema.

## 9. CHANGE SURFACE
Avalie a superfície de mudança: TASK → AFFECTED FILES → DEPENDENCIES → POSSIBLE REGRESSIONS. Quanto maior a superfície, maior deve ser a validação.

## 10. PLAN & 11. IMPLEMENTATION LOOP
Crie um plano executável para tarefas complexas. O plano é vivo e deve ser atualizado. Execute em incrementos pequenos: ACT → OBSERVE → DECIDE → ACT.

## 12. TEST-FIRST WHEN PRACTICAL
Quando apropriado, defina testes antes da implementação. Não force testes artificiais, mas escolha o nível correto (unit, integration, e2e, smoke ou validação manual).

## 13. FEEDBACK LOOP & 14. ERROR RECOVERY
Erros são feedback. Capture o erro completo, diagnostique, corrija a causa raiz e execute a validação novamente. Nunca esconda erros ou altere testes para mascarar falhas sem corrigir o comportamento real.

## 15. FAILURE BUDGET & 35. PARALLELIZATION
Evite loops infinitos (pare após 5 abordagens falhas para reavaliar a estratégia). Paralelize tarefas (ex: testes no backend + lint no frontend) apenas se houver segurança ambiental para isso.

## 30. SDD ARTIFACTS & 31. TRACEABILITY
Mantenha os artefatos estruturados em `docs/specs`, `docs/plans` e `docs/decisions`. Rastreabilidade garante que possamos responder "Por que este código existe?" (REQUIREMENT → SPEC → PLAN → IMPL → TEST → EVIDENCE).

## 32. EVIDENCE-BASED COMPLETION & 33. NO FALSE SUCCESS
Ao finalizar, apresente evidências (arquivos alterados, testes/builds verificados, critérios atendidos e limitações conhecidas). Nunca declare "PASS" sem realmente executar a verificação. Transparência total.

## 39. AUTONOMOUS EXECUTION PROTOCOL & 40. MASTER LOOP
Siga o protocolo de fases: DISCOVER → SPECIFY → PLAN → IMPLEMENT → VERIFY → REPAIR → REGRESSION CHECK → ACCEPT. Continue no loop até satisfazer a Definition of Done.
