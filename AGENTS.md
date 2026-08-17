<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Skills & Tools

Este repositório suporta uma série de *skills* (habilidades e workflows) customizadas para agentes de IA (como `agy` e `claude`).
Elas ficam localizadas na pasta `.agent/skills/`.

- **autonomous-swe**: Skill principal orientada ao desenvolvimento iterativo de MVP e engenharia de software autônoma. Transformando o agente em um engenheiro orientado por especificações (Spec-Driven Development, SDD).

Para rodar o código e criar um MVP end-to-end de modo independente e autônomo, invoque a skill `autonomous-swe`!
