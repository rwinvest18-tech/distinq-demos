# Dipit — GitHub Pages edition

A ready-to-host static export of the existing published Dipit demo (version 1). It preserves the rendered pages, compiled stylesheet, media, copy, typography, layout, responsive behavior, video, CSS floating animation, and pointer-driven perspective tilt. This is a static hosting adaptation of the existing site, not a redesign.

## Publish on GitHub Pages

1. Extract Dipit-github-pages.zip.
2. Upload all extracted files and folders to the root of your GitHub repository. `index.html` must be at the repository root. Do not upload only the ZIP file.
3. Keep `assets/`, `media/`, and each page folder in their included locations. Keep `.nojekyll` too.
4. Open your repository Settings → Pages. Under Build and deployment, select Deploy from a branch, select your publishing branch (usually main), and select / (root). Save.
5. Open the Pages URL once GitHub finishes publishing. Check the home page, navigation, video and mobile menu.

Relative paths support both a repository site such as https://USERNAME.github.io/REPOSITORY/ and a custom domain. Navigation uses page directories: about/, product/, store/, team/, videos/, contact/.

## Preview locally

No Node.js, npm, React installation, API key or build step is needed. With Python installed, run this command from the extracted folder:

```sh
python -m http.server 8000
```

Then open http://localhost:8000/. A local web server is recommended instead of opening HTML files directly.

## Contact form and checkout

GitHub Pages cannot run the original server API or database. The form retains its layout and validation, but creates a prefilled email to t.butler@dipitbrand.com. The visitor must send that draft from their email app. The demo does not store or submit inquiries, and cannot confirm email delivery. Visitors without an email app can use the email address shown on the page through their own webmail. Connect a hosted form endpoint separately if automatic submissions are required.

Store buttons continue to open Dipit's existing product pages and checkout. Those are intentional business links, not remotely hosted assets. Real-time prices and availability remain controlled by the original store.

## Assets and motion

All displayed images, portraits, video, icons, CSS, and JavaScript are included locally. There are no ChatGPT-hosted asset dependencies, remote fonts, CDNs, analytics scripts, API keys, passwords, or authentication tokens. Fonts use the same system Arial/Helvetica/sans-serif stack as the published site; there are no custom font files to download.

`assets/site.css` is the exact compiled stylesheet from the original project. `assets/site.js` reproduces the original menu, video controls, motion preferences and perspective tilt as browser JavaScript. Native details elements retain the homepage's expandable sections. JavaScript adaptations remove the requirement for React hydration and a Cloudflare server on GitHub Pages.

## Files

- index.html — Landing
- about/index.html — About
- product/index.html — Product
- store/index.html — Store
- team/index.html — Team
- videos/index.html — Video Library
- contact/index.html — Contact
- assets/site.css — Original compiled CSS
- assets/site.js — Static interactions
- media/ — Product images, team photos, video and poster
- favicon.svg — Original site icon
- .nojekyll and .gitignore — Hosting and repository files

Titles, descriptions, heading structure, alt text and Organization structured data are retained. The business Organization URL remains its official website. No ChatGPT URL is used as an asset or canonical dependency.

## Verification

All seven pages were rendered from the original source commit 7076f03db811d108bc54dcd7bd0b27b500dbfda9. Text and layout markup are preserved except the contact-form explanation needed for email handoff. Compiled CSS and original media bytes match the source. All internal page and asset links resolve within this ZIP, both at the domain root and under a repository directory. No live external-account deployment or visual browser comparison was performed as part of this export.
