# CJ Romero · Project Hub

My résumé and a home for my projects. Every project is live and clickable:

| Project | What it is | Source |
|---|---|---|
| **Freight Training Hub** | Searchable freight playbooks and SOPs with step checklists, a hold-vs-return calculator and copy-ready carrier emails. | `projects/freight-hub/` |
| **Freight Returns BOL Portal** | RMA → pallets → LTL quote → BOL → pickup in about two minutes. This copy runs fully in the browser with mock ERP and carrier data. | [FreightReturnBOLPortalExample](https://github.com/cjromerofficial-bot/FreightReturnBOLPortalExample) |
| **Pickup & Packing Planner** | Turns an equipment order into exact boxes and recommends the vehicle to bring for pickup. | [PickupPackingPlanner](https://github.com/cjromerofficial-bot/PickupPackingPlanner) |
| **Plum Creek Music Lessons** | Client website for a remote piano and drum teacher. | [pcmusiclessons](https://github.com/cjromerofficial-bot/pcmusiclessons) · [live site](https://pcmusiclessons.com) |

## How it's built
Plain HTML, CSS and JavaScript with no build step. The hub (`index.html`) is a small hash-routed app; each project lives in its own folder under `projects/`.

```
index.html                 hub: home, project pages, résumé, contact
assets/                    photo and project preview images
projects/freight-hub/      Freight Training Hub
projects/bol-portal/       browser build of the BOL portal (generated, see _build/)
projects/packing-planner/  Pickup & Packing Planner (copied from its repo's site/index.html)
_build/                    how the browser-only BOL portal build is made (not deployed)
vercel.json                static hosting settings
```

**Editing content:** résumé text, skills, contact links and the project list are in the `SITE` and `PROJECTS` objects near the top of the script in `index.html`.

## Run locally
```bash
python3 -m http.server 8080
```
Then open http://localhost:8080.

## Deploy
1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project**, import the repo, keep the defaults (no framework, no build command) and deploy.
