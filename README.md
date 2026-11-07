# Minimal developer portfolio

React, JavaScript, Vite, React Router, and Lucide icons. Light by default, with an optional session-only dark theme.

## Run locally

```sh
npm install
npm run dev
```

Open the printed local URL. `npm run build` creates `dist/`; `npm run preview` serves the production build.

## Customize

- Edit your name, email, and social URLs in `src/data/projects.js`. The social links are placeholders; replace them before publishing.
- Edit the about copy in `src/pages/Home.jsx`. No education, work history, or client claims have been invented.
- Configure skill categories and initial projects in `src/data/projects.js`.
- OPI – AI Desktop Assistant, NovelReader, and VoiceMaker are your personal project entries. They start with neutral image placeholders and empty GitHub/demo URL fields. NovelReader and VoiceMaker have empty technology lists for you to fill in. No completion dates or statuses have been assumed.
- The four earlier illustrative sample projects remain in the archive and editor, labeled as examples. The homepage features personal projects.
- Colors, spacing, typography, and breakpoints live in `src/styles/global.css`.
- To add a CV, place your real PDF in `public/cv.pdf` and add a download link to it in the hero. No fabricated CV is included.

## Manage projects and images

In development, visit `/admin`. Add, edit, delete (with confirmation), or reorder projects. Upload a cover image and multiple screenshots; remove screenshots individually. Images accept PNG, JPEG, WebP, and GIF up to 2 MB each. Prefer compressed images well below that limit, as total browser storage is usually only a few MB. Storage failures leave the editor open and display an error.

The editor saves projects and image data URLs in **this browser’s LocalStorage**. Changes survive reloads but are browser and origin specific. They do not change the source files, synchronize across devices, or publish for other visitors. Clearing site storage removes these edits. Existing saved project lists are migrated once to include the three personal projects while preserving your edits and uploaded images. Later deletions and reordering remain saved. For public updates, put optimized images under `public/images/` and copy your project content into `src/data/projects.js` before rebuilding.

`src/services/projectStorage.js` isolates the storage layer so it can later be replaced by authenticated backend calls and object storage for images. Introduce server-side authentication and authorization before making an online editor available.

The `/admin` route and editor chunk are excluded from production builds using Vite’s development flag. This is a local development tool, not a public admin panel.

## Contact and external links

The contact form validates required fields and the email address, then opens an email draft in the visitor’s configured mail app. It does **not** send mail itself. Project GitHub and demo links appear only when a valid HTTP(S) URL is present. Missing or broken project images display an explicit neutral placeholder. Empty GitHub/demo fields show non-clickable coming-soon labels.

## Deploy

Build command: `npm run build`. Output directory: `dist`. Deploy the static output to Vercel or Netlify. SPA rewrites are included for project detail routes. The project editor remains local-only.

## Verification

Run `npm test` to check saved-project migration and persistence behavior, then `npm run build` before deploying. Check the homepage, project filters, a project detail gallery, the contact draft, and the local editor at desktop and mobile widths. Test adding, editing, reordering, deleting, uploading images, and persistence after reload.
