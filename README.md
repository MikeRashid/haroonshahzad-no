# haroonshahzad.no

Personal portfolio and CV website for **Haroon Shahzad**, an IT professional and computer engineering student working across Microsoft cloud, endpoint management, automation, integrations and internal tooling.

**Live site:** [haroonshahzad.no](https://haroonshahzad.no)

## Overview

The site presents professional experience, selected technical projects, education and core skills in both English and Norwegian.

It is designed as a lightweight full-stack project rather than a generated profile page. The frontend is built with semantic HTML, CSS and vanilla JavaScript, while a small Express service handles routing and operational status data.

## Highlights

- Responsive bilingual portfolio in English and Norwegian
- Accessible project sections with expandable details
- Live service-status endpoint
- Custom domain with HTTPS
- Docker-based deployment on Render
- Security-focused Express configuration and response headers
- No frontend framework or build step

## Tech stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Deployment:** Docker, Render, Cloudflare
- **Development:** Git and GitHub

## Project structure

```text
.
├── public/
│   ├── index.html      # English portfolio
│   ├── no.html         # Norwegian portfolio
│   ├── style.css       # Shared responsive design
│   ├── script.js       # Shared interactions and dynamic content
│   └── profile.png
├── server.js           # Express server, routes and status API
├── Dockerfile
├── package.json
└── README.md
```

## Run locally

### Node.js

```bash
npm install
npm start
```

Open `http://localhost:3000`.

### Docker

```bash
docker build -t haroonshahzad-no .
docker run --rm -p 3000:3000 haroonshahzad-no
```

Open `http://localhost:3000`.

## Routes

| Route | Description |
|---|---|
| `/` | English portfolio |
| `/no` | Norwegian portfolio |
| `/api/status` | Operational status data used by the site |

## Deployment

The application is containerised and deployed on Render. Pushes to the main branch trigger a new deployment. The custom domain is served over HTTPS through Cloudflare.

## Public portfolio policy

The portfolio describes professional work at a high level. It intentionally excludes confidential source code, internal URLs, credentials, customer data, security configurations and employer-owned implementation details.

## Author

**Haroon Shahzad**

- [Portfolio](https://haroonshahzad.no)
- [LinkedIn](https://www.linkedin.com/in/haroon-shahzad-b22596b4/)
- [GitHub](https://github.com/MikeRashid)
