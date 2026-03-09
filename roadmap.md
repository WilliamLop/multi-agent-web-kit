# Ruta de Aprendizaje en IA, Agentes y Playwright

## Punto de partida

Ya tienes:

- mentalidad de builder
- velocidad de aprendizaje
- capacidad de integrar herramientas modernas
- enfoque en problemas reales y automatizacion

Te falta ordenar:

- conceptos base
- criterio tecnico
- validacion
- diferencia entre prototipo y produccion

Debes dominar pronto:

- prompting operativo
- calidad de software
- testing practico
- Playwright base
- flujo profesional con agentes

## Fase 1: Fundamentos que debes fijar

Objetivo:
Construir un mapa mental correcto de los conceptos que hoy usas de forma intuitiva.

Debes poder explicar con precision:

- que es un modelo
- que es un agente
- que es una herramienta
- que es memoria
- que es una skill
- que es un hook
- que es una automatizacion
- que es un test
- que es el entorno

Resultado esperado:
Poder diferenciar cada concepto sin mezclarlos.

Ejercicio:

1. Escribe una definicion propia de cada concepto en una frase.
2. Escribe un ejemplo real de uso de cada uno.
3. Explica como se conectan en un flujo simple.

Criterio de dominio:
Si puedes explicarlo sin usar palabras vagas como "algo", "sistema" o "supervision" para todo.

## Fase 2: Criterio tecnico

Objetivo:
Dejar de depender solo de la IA para decidir si algo esta bien hecho.

Debes aprender a revisar:

- legibilidad
- mantenibilidad
- manejo de errores
- consistencia
- seguridad basica
- pruebas
- deuda tecnica

Resultado esperado:
Poder mirar un cambio y decir:
"funciona, pero esta fragil por esto" o "funciona y esta bien resuelto por esto".

Ejercicio:

1. Toma uno de tus proyectos.
2. Elige una sola funcionalidad.
3. Evaluala con estas preguntas:
   - que problema resuelve
   - donde puede fallar
   - que entradas no controla
   - que pasa si el servicio externo falla
   - que tan dificil seria mantenerla en tres meses

Criterio de dominio:
Detectar riesgos sin esperar a que la IA te los enumere primero.

## Fase 3: Playwright base

Objetivo:
Entender Playwright como herramienta de automatizacion y testing real de navegador.

Debes dominar:

- `page`
- `locator`
- `expect`
- navegacion
- formularios
- validaciones
- depuracion

Resultado esperado:
Poder crear y entender una prueba end-to-end simple.

Ejercicio:

1. Crear un mini sitio de practica con tres paginas:
   - Inicio
   - Acerca
   - Contacto
2. Probar estos flujos:
   - navegar entre paginas
   - abrir formulario
   - escribir datos
   - enviar
   - verificar mensaje de exito
3. Romper algo a proposito:
   - cambiar un texto
   - romper un selector
   - quitar un enlace
4. Identificar si fallo:
   - la app
   - el test
   - el entorno

Criterio de dominio:
Poder explicar por que fallo una prueba sin decir solo "la IA lo arregla".

## Fase 4: Flujo profesional con agentes

Objetivo:
Pasar de usar agentes como aceleradores a dirigirlos con criterio.

Flujo objetivo:

1. definir objetivo
2. fijar restricciones
3. pedir plan
4. implementar en partes
5. validar resultados
6. probar en entorno real
7. corregir
8. documentar aprendizaje

Resultado esperado:
Tener un proceso repetible para construir con IA.

Ejercicio:

1. Toma una idea pequena.
2. Pide a un agente un plan.
3. Divide la implementacion en fases.
4. Despues de cada fase revisa:
   - si cumple el objetivo
   - si el codigo es claro
   - si hay test
   - si hay riesgos obvios
5. Al final ejecuta una validacion real.

Criterio de dominio:
No dejar que el agente avance sin checkpoints claros.

## Fase 5: Prototipo vs produccion

Objetivo:
Entender que una demo funcional no equivale a un sistema listo para operar.

Debes diferenciar:

- velocidad vs confiabilidad
- prueba rapida vs monitoreo
- logica funcional vs manejo de errores
- deploy simple vs operacion estable
- secreto local vs gestion segura de credenciales

Resultado esperado:
Saber que le falta a un sistema antes de considerarlo "listo".

Ejercicio:

Analiza uno de tus bots actuales y responde:

1. Que pasa si Supabase falla.
2. Que pasa si Railway reinicia.
3. Que logs tienes.
4. Como sabes si el bot esta caido.
5. Como proteges secretos.
6. Que partes siguen siendo manuales.

Criterio de dominio:
Poder listar brechas de produccion concretas.

## Orden sugerido de trabajo

Semana 1:

- fundamentos
- criterio tecnico

Semana 2:

- Playwright base
- diagnostico de fallos

Semana 3:

- flujo profesional con agentes
- checkpoints de validacion

Semana 4:

- revisar un proyecto real
- separar prototipo de produccion
- documentar mejoras prioritarias

## Reglas de trabajo

- trabaja una sola habilidad principal por vez
- no midas avance por cantidad de herramientas
- documenta que aprendiste cada semana
- usa la IA para acelerar, no para apagar el juicio
- si algo funciona, igual preguntate si se puede mantener

## Indicadores de avance real

Vas mejorando si cada semana haces mejor estas cinco cosas:

- defines mejor el problema
- das mejores instrucciones
- revisas mejor lo generado
- pruebas mejor lo construido
- cierras mejor lo empezado
