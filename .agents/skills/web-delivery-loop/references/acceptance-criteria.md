# Acceptance Criteria Pattern

Write acceptance criteria before implementation when behavior matters.

## Rules

- keep each criterion observable
- write one behavior per criterion
- avoid vague phrases like "works correctly"
- include the visible system response
- keep technical logging details separate unless they are product requirements

## Base format

```md
- Dado ...
  Cuando ...
  Entonces ...
```

## Good examples

- Dado un mensaje valido con monto y categoria, cuando el usuario lo envia, entonces el sistema registra el gasto y confirma el resultado.
- Dado un formulario con datos invalidos, cuando el usuario intenta enviarlo, entonces el sistema no procesa el envio y muestra el error visible.
- Dado un fallo al guardar en la base de datos, cuando el usuario envia una accion valida, entonces el sistema no confirma exito y muestra un error claro.

## Bad examples

- El sistema funciona bien.
- La logica se maneja correctamente.
- Si algo falla, se arregla.

## Minimum set

For most web tasks, write at least:

- one success case
- one invalid input case when relevant
- one dependency failure case when relevant
