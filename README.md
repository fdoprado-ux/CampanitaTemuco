# Escuela de Párvulos Municipal Campanita — Sitio Web Institucional

Sitio web oficial de la **Escuela de Párvulos Municipal Campanita** (RBD `5617-0`), establecimiento municipal ubicado en **Nahuelbuta 2785, Sector Pueblo Nuevo, Temuco, Región de La Araucanía, Chile**.

## Identificación del Establecimiento

- **Nombre:** Escuela de Párvulos Municipal Campanita
- **Dependencia:** Municipal
- **Dirección:** Nahuelbuta 2785, Sector Pueblo Nuevo, Temuco
- **RBD:** 5617-0
- **Niveles de enseñanza:** NT1 y NT2
- **Jornada:** Mañana y tarde
- **Matrícula referencial:** 40 estudiantes
- **Contacto:** `campanita@temuco.cl` · `45 2 221258`

## Estructura del Proyecto

- `index.html`: Landing page responsiva con Identificación Institucional, Contexto Territorial, Reseña Histórica, Fortalezas y Desafíos, Ideario, Visión, Misión, Sellos Educativos, Valores, Enfoque Pedagógico y Curricular, Galería de Entornos y Centro de Descargas para Apoderados.
- `styles.css`: Hoja de estilos con paleta natural inspirada en el emblema oficial de la escuela y diseño completamente adaptable a escritorio y dispositivos móviles.
- `app.js`: Control de navegación móvil, filtros de galería y documentos, visor lightbox accesible y formulario de contacto.
- `img/`: Emblema oficial sin fondo y material visual del establecimiento.
- `docs/`: Documentación oficial 2026 disponible para descarga directa en formato PDF por madres, padres y apoderados:
  - `PEI Escuela Parvulos Campanita 2026.pdf`
  - `Reglamento Interno 2026.pdf`
  - `Reglamento Evaluacion Promocion Actualizado 2026 Campanita.pdf`
  - `PGCE 2026.pdf`
  - `PISE 2026.pdf`
  - `Plan Formacion Ciudadana Escuela Parvulos Campanita 2026.pdf`
  - `Plan Afectividad Sexualidad Escuela Parvulos Transicion 2026.docx.pdf`
  - `Plan Inclusion Escuela Parvulos Campanita 2026.pdf`
  - `PLAN DE FORMACIÓN Y DESARROLLO PROFESIONAL DOCENTE.pdf`

## Visualización Local

```bash
python -m http.server 8080 --directory .
```

Luego abre `http://127.0.0.1:8080/` en tu navegador.
