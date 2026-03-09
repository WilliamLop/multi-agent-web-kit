# Multi-Agent Web Kit

Kit compartido de trabajo para entregar proyectos web con Codex, Claude Code y entornos basados en `.agents`.

## Comando Unico Recomendado

Pega este comando en la raiz de cualquier proyecto:

```bash
npx github:WilliamLop/multi-agent-web-kit install
```

Este flujo ya fue validado contra un proyecto temporal y deja instalado:

- `.agents/skills/web-delivery-loop`
- `.claude/skills/web-delivery-loop`
- `.claude/commands/web-delivery.md`
- `.claude/agents/web-delivery-specialist.md`
- `.claude/hooks/*`
- `CLAUDE.web-kit.md`
- `~/.codex/skills/web-delivery-loop`

Despues de correrlo:

- reinicia Codex si quieres que lea la skill global nueva
- reinicia Claude Code en ese proyecto para que cargue hooks, comandos y memoria

Este repo te da:

- una skill reusable llamada `web-delivery-loop`
- plantillas para Claude Code: comando, agente, memoria y hooks
- un instalador CLI listo para publicarse y ejecutarse con `npx`
- una plantilla base de prueba con Playwright
- tu ruta de aprendizaje y tu plantilla de revision semanal

## Inicio Rapido

Uso local antes de publicar:

```bash
node ./bin/multi-agent-web-kit.js list
node ./bin/multi-agent-web-kit.js install web-delivery-loop --target agents,claude --project /path/to/project
node ./bin/multi-agent-web-kit.js install web-delivery-loop --target codex
```

Uso directo desde GitHub ahora mismo:

```bash
npx github:WilliamLop/multi-agent-web-kit list
npx github:WilliamLop/multi-agent-web-kit install
```

Ejecuta `install` desde la raiz del proyecto destino. Sin flags extra instala todo:

- `.agents/skills/web-delivery-loop`
- `.claude/skills/web-delivery-loop`
- comando, agente, memoria y hooks para Claude
- `~/.codex/skills/web-delivery-loop`

Despues de publicar en npm:

```bash
npx multi-agent-web-kit list
npx multi-agent-web-kit install
npx multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project
npx multi-agent-web-kit install web-delivery-loop --target codex
```

## Publicar En npm

El nombre del paquete `multi-agent-web-kit` esta disponible.

### 1. Iniciar sesion en npm

Documentacion oficial: [npm login](https://docs.npmjs.com/cli/v10/commands/npm-login/)

```bash
npm login
```

Que pasa aqui:

- npm abre un login web por defecto
- despues del login, las credenciales se guardan en tu `.npmrc` local
- si tu cuenta usa 2FA, npm puede pedir una verificacion extra

Comprobacion util:

```bash
npm whoami
```

Si `npm whoami` imprime tu usuario, esta maquina ya puede publicar.

### 2. Publicar el paquete

Desde la raiz del repo:

```bash
npm publish
```

Este repo ya tiene `publishConfig.access` en `public`, asi que no necesitas flags extra para publicarlo como paquete publico.

### 3. Verificar la instalacion desde npm

```bash
npx multi-agent-web-kit list
```

## Instalar En Un Proyecto Real

Desde la raiz del proyecto destino:

```bash
npx github:WilliamLop/multi-agent-web-kit install
```

Despues del publish en npm, la version mas limpia es:

```bash
npx multi-agent-web-kit install
```

Si quieres instalar solo una parte del kit:

```bash
npx multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project
npx multi-agent-web-kit install web-delivery-loop --target codex
```

## Reiniciar Despues De Instalar

### Codex

Si instalaste el target de Codex de forma global en `~/.codex/skills`, la forma mas segura es:

1. cerrar la sesion actual de Codex
2. abrir Codex otra vez, o iniciar una sesion nueva en el mismo workspace

Asi te aseguras de que cargue la skill nueva.

### Claude Code

Si instalaste `.claude/skills`, comandos, hooks o agentes en un proyecto:

1. detiene la sesion actual de Claude Code
2. vuelve a abrir Claude Code desde la raiz de ese proyecto

Asi te aseguras de que:

- `.claude/settings.local.json` recargue los hooks
- `.claude/commands/` tenga disponibles los comandos
- `.claude/agents/` tenga disponibles los agentes
- `CLAUDE.md` y `CLAUDE.web-kit.md` se lean otra vez

## Como Hacer Que El Modelo Lo Use

La instalacion deja el flujo disponible. Para que el comportamiento sea consistente, invocalo de forma explicita en tu tarea.

Ejemplo:

```text
Usa la skill web-delivery-loop para inspeccionar este proyecto, definir criterios de aceptacion, implementar el cambio por fases y validar la UI con Playwright.
```

Para Claude Code, despues de instalarlo tambien puedes usar el comando:

```text
/web-delivery improve the contact form and validate it with Playwright
```

Mejor practica:

- menciona `web-delivery-loop` por nombre cuando empiece la tarea
- di si la tarea toca UI, backend o ambos
- pide criterios de aceptacion y ejecucion por fases cuando la solicitud sea ambigua

## Estructura Del Repo

- `skills/web-delivery-loop/`: skill compartida y fuente de verdad
- `templates/claude/`: plantillas de Claude Code para comando, agente, memoria y hooks
- `bin/` y `lib/`: instalador CLI
- `docs/publish.md`: checklist para GitHub y npm
- `roadmap.md`: ruta de aprendizaje
- `weekly-review.md`: plantilla de revision semanal

## Que Hace El Instalador

### Target `.agents`

Copia la skill compartida en:

```text
.agents/skills/web-delivery-loop
```

### Target `claude`

Copia y deja conectado:

```text
.claude/skills/web-delivery-loop
.claude/commands/web-delivery.md
.claude/agents/web-delivery-specialist.md
.claude/hooks/*
CLAUDE.web-kit.md
import en CLAUDE.md
hooks en .claude/settings.local.json
```

### Target `codex`

Copia la skill compartida en:

```text
~/.codex/skills/web-delivery-loop
```

## Desarrollo

```bash
npm test
npm pack --dry-run
```

## Documentos De Aprendizaje

Este repo tambien guarda tu material de entrenamiento:

- `roadmap.md`
- `weekly-review.md`

Usalos para mantener tu crecimiento estructurado mientras conviertes este repo en tu kit reusable de distribucion.
