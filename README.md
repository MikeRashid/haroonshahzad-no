# haroonshahzad.no

Personlig CV/portefølje-side. Node/Express-backend + statisk frontend.

## Kjøre lokalt

```bash
npm install
npm start
```

Åpne http://localhost:3000

## Kjøre med Docker

```bash
docker build -t haroonshahzad-no .
docker run -p 3000:3000 haroonshahzad-no
```

## Struktur

```
server.js          Express-backend (API: /api/status, /api/contact)
public/
  index.html        Innhold/struktur
  style.css         Design (dashboard/status-tema)
  script.js         Henter status live + sender kontaktskjema
contact-log.json    Opprettes automatisk, lagrer innsendte meldinger
```

## Før du publiserer på haroonshahzad.no

1. **Registrer domenet** hos en registrar (Domeneshop, Gigahost, Webhuset o.l.)
2. **Deploy backend+frontend et sted som kjører Node**, f.eks.:
   - Render.com (gratis tier, enkel Node-app-deploy)
   - Railway.app
   - Azure App Service (siden du allerede jobber i Azure-miljø hos Norfund)
3. **Pek domenet**: legg til en CNAME/A-record hos registraren din som peker
   til adressen du får fra hosting-tjenesten.
4. **Bytt ut kontaktskjema-loggingen**: `contact-log.json` er fint for testing,
   men i produksjon bør `/api/contact` i `server.js` sende faktisk e-post,
   f.eks. via Resend, SendGrid eller SMTP (nodemailer).
5. **Gjennomgå innholdet i `public/index.html`**: teksten om erfaring og
   prosjekter er skrevet basert på det jeg vet om bakgrunnen din — sjekk at
   alt stemmer og juster det som ikke passer.

## Husk

Filene her ligger i Claude sitt arbeidsmiljø, ikke lokalt på din maskin.
Last ned zip-filen fra samtalen og pakk den ut der du vil jobbe videre
(Windows-maskinen din, siden du kjører Docker der).
