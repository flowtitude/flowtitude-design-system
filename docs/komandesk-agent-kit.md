# Komandesk Agent Kit

Version: 2026-06-11.v0
Project: Flowtitude Design System
Type: design-system

## Read First

- AGENTS.md
- state.md
- docs/komandesk-agent-kit.md

## Source Of Truth

- System: komandesk
- Task state: remote
- Local files: bootstrap-and-project-context
- Komandesk URL: https://ops.solucionesabiertas.net
- Komandesk project ID: No declarado

## Workspace

- Mode: workspace-managed
- Ref: workspace:sa-workspace
- Registry: workspace registry optional; local kit remains authoritative for this repo

## Overlays

- overlay:soluciones-abiertas: optional customization outside Komandesk Agent Kit core
- overlay:flowtitude: optional customization outside Komandesk Agent Kit core

## Skills

- github:yeet

## MCP Servers

- Sin MCP obligatorio declarado.

## Credentials

- env:KOMANDESK_SERVICE_TOKEN: Komandesk service API

## Commands

- Sin comandos declarados todavia.

## Write Rules

- Crear o usar una work-item en Komandesk antes de tocar el proyecto.
- Registrar tiempo y evidencia visible.
- No desplegar, borrar datos ni tocar credenciales sin Human Gate.
- Leer GET /api/tasks/:id/agent-work antes de proponer cierre.

## Portability

- No asumir rutas absolutas como contrato.
- Resolver ruta local via `project.local_path`.
- Si el proyecto se mueve, actualizar registry, runner allowlists y symlinks temporales.
