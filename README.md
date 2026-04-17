# Mahboob Alam Portfolio

## Medium feed without exposing API key

This repository uses a GitHub Actions workflow to fetch Medium posts and save them into `data/medium-posts.json`.

### Setup

1. Go to repository **Settings → Secrets and variables → Actions**.
2. Add a new repository secret named `RSS2JSON_API_KEY`.
3. Run the workflow manually from **Actions → Update Medium Feed → Run workflow**, or wait for the daily schedule.

The frontend script at `js/medium-feed.js` reads from `data/medium-posts.json`, so the API key never appears in browser JavaScript.
