# Factor Studio

Landing page personale di Gennaro Di Fiandra, sviluppatore WordPress full-stack con 15 anni di esperienza.

## Stack tecnologico

**Frontend**

- HTML, SCSS, TypeScript
- Vite come build tool
- vite-plugin-handlebars per la gestione dei template HTML

**Tooling**

- ESLint per il linting TypeScript
- Stylelint per il linting SCSS
- Prettier per la formattazione del codice

**Backend**

- Cloudflare Pages Functions per la gestione del form di contatto
- Resend per l'invio email transazionali

**Deploy**

- Cloudflare Pages

## Struttura delle cartelle

```
src/
  assets/            # Immagini
  components/        # Componenti riutilizzabili
    icons/           # Icone SVG
  partials/          # Template HTML delle sezioni
  scripts/           # File TypeScript
  styles/            # File SCSS
    globals/         # Stili globali
    utils/           # Variabili, mixin e placeholder
    components/      # Stili dei componenti
    partials/        # Stili delle sezioni
  types/             # Dichiarazioni di tipo TypeScript
functions/
  api/               # Cloudflare Pages Functions
public/              # Asset statici
```

## Note sul deploy

Il progetto utilizza Cloudflare Pages con deploy automatico dal repository GitHub. Le variabili d'ambiente necessarie da configurare sul pannello Cloudflare sono:

- `RESEND_API_KEY` — API key di Resend
- `REAL_EMAIL` — Email utilizzata come destinatario dei messaggi e come reply-to
