# Adding a New Centre Header

How to add a header for a new IITR Centre (or Department / School) and wire it up so it actually renders on that centre's pages.

The process touches **three repositories** — do them in order.

## Mental model

```
chakra-library                 chakra-backend                   chakra-core
(static HTML fragment)    →    (Header DB row: folder→URL)  →   (transpiler
                                                                  splices the URL
                                                                  into XML pages)
```

The fragment in `chakra-library` is dumb HTML. The **database row in `chakra-backend` is what connects a folder of pages to that fragment**. The transpiler `chakra-core` fetches the URL at build time and inlines the HTML.

Deploying only the fragment is not enough. Creating only the DB row is not enough. You need both.

## Step 1 — Add the header fragment (`chakra-library`)

1. Pick a short slug — typically the centre's acronym in lowercase. Examples: `csst`, `cra`, `csdt`.
2. Create `library/html/center_headers/header_<slug>.html`. Copy an existing recent file like `header_cra.html` as the starting point — it sets the current indentation and structure conventions.
3. Change exactly two things from the template:
   - The `<div class="ui section-heading">` text to the centre's full name **in uppercase**.
   - (Optional) Wrap the heading + sub-heading in `<a href="https://<centre-subdomain>.iitr.ac.in/" class="link-content">…</a>` **only if** the centre has its own subdomain. If it's hosted under `iitr.ac.in/Centres/…`, link there instead. If you don't know, leave the link out — matches the `header_cra.html` pattern.
4. Open a PR against `staging`. Keep the commit focused — don't bundle unrelated asset changes.

**Sibling folders** follow the same pattern: `department_headers/` for departments, `school_headers/` for schools. The wiring steps below are identical.

## Step 2 — Wait for deployment

Once the PR merges to `staging`, Jenkins job `canvas-chakra-library` pulls `staging` on the deploy host. Fragments are served from:

```
https://cmsredesign.channeli.in/library/html/center_headers/header_<slug>.html
```

Verify the file is actually reachable before moving on:

```bash
curl -I https://cmsredesign.channeli.in/library/html/center_headers/header_<slug>.html
```

`200 OK` = deployed. `404` = Jenkins didn't pick it up yet — check the job's last build log before continuing.

## Step 3 — Create the `Header` DB row (`chakra-backend`)

This is the step most often forgotten. Without it, pages still render with no header (or with a stale parent-folder header).

1. Open the CMS admin: `/admin/generator/header/add/`.
2. Fill in:
   - **Folder** — the centre's folder in the filemanager tree (e.g. `Centre for Semiconductor Design and Technology`). **Not** an `INDEX` or sub-page — attach at the centre level so everything below inherits.
   - **Header url** — the full URL from Step 2, e.g. `https://cmsredesign.channeli.in/library/html/center_headers/header_<slug>.html`.
3. Save.

### Why folder-level, not page-level

`Header.get_header()` walks the folder tree **upward** from any XML page until it finds the first matching `Header` row (`chakra-backend/generator/models/header.py`). One row at the centre level therefore covers every current and future sub-page without further config. Attaching at `INDEX` means every new sibling page needs its own row — avoid.

## Step 4 — Regenerate the pages

Headers are resolved and **baked into the final HTML at transpile time**, not at page-load time. Pages generated *before* the Header row existed still have stale HTML.

Trigger a re-generate from the filemanager UI (Publish / Regenerate) for the centre folder, or run whatever management command your team uses.

## Step 5 — Verify on the live page

1. Shift-reload the centre's INDEX page.
2. Confirm the full department header band renders (navigation links, accessibility toggles, IITR logo, centre name).
3. If only the breadcrumb shows:
   - View page source. If `<div class="ui header department">` is **absent**, re-generate — the transpile didn't pick up the new DB row.
   - If the div is **present** but invisible, it's a CSS / caching issue, not a config issue.

## Troubleshooting

### Jenkins build is `UNSTABLE` with `bash: syntax error: unexpected end of file`

The SSH exec command in the Jenkins job has a trailing `&&` with no right-hand command. Someone probably removed a PR-specific verification step (e.g. a `grep` for a prior fix) without also removing the `&&` that linked to it. Fix is to either delete the dangling `&&` or restore the missing command. Steady-state exec should look like:

```bash
cd /home/ubuntu/cms3.0/chakra-library &&
sudo git pull origin staging --rebase
```

If you want a post-deploy sanity log line, keep:

```bash
cd /home/ubuntu/cms3.0/chakra-library &&
sudo git pull origin staging --rebase &&
echo "PWD=$(pwd)" &&
sudo git log -1 --oneline
```

### PR-specific assertions in Jenkins

If you add a one-off check for a specific PR (e.g. `grep "NEW TEXT" library/html/center_headers/header_<slug>.html`), mark it with a comment so the next person knows to remove it cleanly:

```bash
# TEMP: remove after PR #XXX deploy verified
sudo grep -n "CENTRE FOR …" library/html/center_headers/header_<slug>.html
```

### Page XML has an explicit `<Header header-url="…">`

Hand-authored XMLs sometimes hardcode a header URL. This **overrides** the folder inheritance. Either update the attribute to the new URL or remove the attribute so the DB lookup takes over.

### Centre has no subdomain or `iitr.ac.in/Centres/…` URL yet

Omit the `<a>` wrapper around the heading for now — matches the `header_cra.html` pattern. Add the link in a follow-up PR once the centre's URL is confirmed.

## Files that define this pipeline

- Fragment location: `library/html/center_headers/` (this repo)
- Header model + lookup: `chakra-backend/generator/models/header.py`
- Transpile entry: `chakra-backend/generator/utils/transpiler.py`
- Header XML spec: `chakra-core/src/main/scala/transpiler/format/specs/HeaderSpec.scala`
- Jenkins job: `canvas-chakra-library`
