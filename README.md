# Karthikeyan G – Portfolio (HTML + Tailwind CSS + GSAP)

Plain HTML, Tailwind CSS (CDN), vanilla JavaScript, GSAP + ScrollTrigger + Draggable. No React, no build step.

## Run locally
Open `index.html` in a browser, or serve the folder:
`python -m http.server 8000` then visit http://localhost:8000

## Add your links (one file)
Edit `js/config.js`: email, GitHub, LinkedIn, resume, form endpoint.
Anything left empty shows "coming soon" instead of a fake link.

Resume: put the PDF in `assets/` (e.g. `assets/Karthikeyan_G_Resume.pdf`) and set
`resume: "assets/Karthikeyan_G_Resume.pdf"`, or paste a Google Drive link.

## Projects and certificates
Edit `js/data.js`.
- Add `github`, `demo`, `tech`, `features` per project.
- Replace `thumb` with a real screenshot (e.g. `assets/projects/wellness.png`) and set `illustrative:false`.
- Certificates use images in `assets/certs/` (full size + `-thumb`). The Unstop certificate has no image yet:
  add `assets/certs/unstop-ai-challenge.jpg` + `-thumb.jpg`, then set `img: "unstop-ai-challenge"` and the date/ID.

## Logos
`assets/logos/` – VIT logo is cropped from your hackathon certificate. Vethathiri school uses a "VM" badge;
drop a logo in and replace the `.badge` div in `index.html` if you want the real one.

## Deploy
GitHub: push this folder to a repo. Vercel: Import the repo, Framework "Other", no build command, output directory `.`.

## Structure
index.html · css/styles.css · js/{config,data,main}.js · assets/{img,logos,certs,projects}
