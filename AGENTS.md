# Portfolio workflow

- Make all portfolio changes on a separate `codex/` branch, never directly on `main`.
- Before merging into `main`, show the changes and validation results to the user and ask for explicit approval.
- Do not merge or push changes to `main` without that approval.
- Run `npm test` and `npm run build` before requesting a merge.
