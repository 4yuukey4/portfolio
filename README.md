# Yusuf Abdi Hassan — Developer Portfolio

React, JavaScript, Vite, React Router, and Lucide icons. Light by default, with an optional session-only dark theme.

## Requirements and installation

Use Node.js 22 LTS and npm. Clone this repository and install the locked dependencies:

```sh
git clone https://github.com/4yuukey4/portfolio.git
cd portfolio
git switch develop
npm ci
```

## Run locally

```sh
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

### Project galleries

The supplied media is grouped into five dedicated pages. Image titles, captions, project descriptions, and video metadata live in `src/data/projectMedia.js`. Optimized JPG screenshots and the MP4 recording live under `public/images/projects/`; original Desktop files are unchanged.

| Page | Media |
| --- | --- |
| `/projects/novelvoice-studio` | 6 screenshots of the manuscript, dashboard, transcription, voice library, projects, and exports |
| `/projects/mini-factory-frontier` | 5 screenshots of the world, resources, prototype, and production lines |
| `/projects/flame-keep` | 6 screenshots and a roughly one-minute gameplay recording |
| `/projects/factory-market` | 2 screenshots of warehouse placement and validation |
| `/projects/blender-conveyor` | 1 screenshot of a Blender conveyor modeling study |

NovelVoice Studio uses the name visible in the supplied screenshots and is kept separate from NovelReader and VoiceMaker until their relationship is confirmed. The GitHub device authorization screenshot is excluded because it is not project showcase material. Version 4 storage migration adds these five new entries once while preserving existing edits, uploads, project order, and deletions of earlier projects. Subsequent deletions of the new entries are also retained.

In development, visit `/admin`. Add, edit, delete (with confirmation), or reorder projects. Upload a cover image and multiple screenshots; remove screenshots individually. Images accept PNG, JPEG, WebP, and GIF up to 2 MB each. Prefer compressed images well below that limit, as total browser storage is usually only a few MB. Storage failures leave the editor open and display an error.

The editor saves projects and image data URLs in **this browser’s LocalStorage**. Changes survive reloads but are browser and origin specific. They do not change the source files, synchronize across devices, or publish for other visitors. Clearing site storage removes these edits. Existing saved project lists are migrated once to include the three personal projects while preserving your edits and uploaded images. Later deletions and reordering remain saved. For public updates, put optimized images under `public/images/` and copy your project content into `src/data/projects.js` before rebuilding.

`src/services/projectStorage.js` isolates the storage layer so it can later be replaced by authenticated backend calls and object storage for images. Introduce server-side authentication and authorization before making an online editor available.

The `/admin` route and editor chunk are excluded from production builds using Vite’s development flag. This is a local development tool, not a public admin panel.

## Contact and external links

The contact form validates required fields and the email address, then opens an email draft in the visitor’s configured mail app. It does **not** send mail itself. Project GitHub and demo links appear only when a valid HTTP(S) URL is present. Missing or broken project images display an explicit neutral placeholder. Empty GitHub/demo fields show non-clickable coming-soon labels.

## Deploy

Build command: `npm run build`. Output directory: `dist`. Deploy the static output to Vercel or Netlify. SPA rewrites are included for project detail routes. The project editor remains local-only.

Before deployment, run `npm ci`, `npm test`, and `npm run build`. On Vercel, import this repository, select the Vite preset, and use `dist` as the output directory; `vercel.json` handles client routes. On Netlify, import the repository with the same build command and output directory; `public/_redirects` is copied into the build. Select `main` as the production branch after the replacement has been reviewed and approved. `npm run preview` is for local production checks.

GitHub Pages is not configured: it would need a repository base path and client-route handling before deployment. Pushing to GitHub alone does not publish a running site.

## Repository history and workflow

The original PHP survey, login, and dashboard implementation is preserved at `backup/old-portfolio` (commit `df1f9e2`). Its files are removed from the React implementation. The PHP application required a server and database; its authentication and survey endpoints are not part of this static portfolio. Git history is retained, including the original React import commit.

| Branch | Purpose |
| --- | --- |
| `main` | Stable production version; update only after explicit review approval |
| `backup/old-portfolio` | Original implementation; keep unchanged |
| `develop` | Integration and validation |
| `feature/portfolio-design` | Layout, typography, styling, and animations |
| `feature/project-management` | Project cards, progress, and editor work |
| `feature/github-integration` | Future GitHub API and repository connections |
| `feature/image-management` | Profile and project images |
| `feature/project-details` | Detail pages and galleries |

The feature branches start from the integrated React baseline. Existing imported features remain together in their original commit rather than being rewritten into artificial feature history. Future work belongs on the corresponding feature branch, with meaningful Conventional Commits such as `feat: add project progress tracking`. Use additional `codex/` working branches for repository maintenance. Merge completed work into `develop`, run `npm test` and `npm run build`, and show the changes and results for approval before merging or pushing to `main`. Never force-push or delete remote branches without explicit approval.

GitHub Actions runs the tests and production build for pushes to `develop`, `main`, `feature/**`, and `codex/**`, and pull requests targeting `develop` or `main`.

## Secrets and current scope

Never commit passwords, API keys, tokens, private keys, or `.env` files. `.gitignore` excludes environment files, local overrides, dependencies, build output, logs, and common private-key formats. Only a sanitized `.env.example` may be committed. Any `VITE_` environment variable is public in the browser bundle; keep credentials on a server.

The current implementation includes responsive project browsing, detail pages, galleries, local project/image editing, and contact email drafts. Live GitHub API synchronization, numerical progress tracking, shared upload storage, and an authenticated online dashboard remain future features. Branch names reserve these work areas and do not imply they are already implemented.

## Verification

Run `npm test` to check saved-project migration and persistence behavior, then `npm run build` before deploying. Check the homepage, project filters, a project detail gallery, the contact draft, and the local editor at desktop and mobile widths. Test adding, editing, reordering, deleting, uploading images, and persistence after reload.
