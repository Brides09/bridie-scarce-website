# Scarce Journal

## What this website is

Scarce Journal is a single-page, magazine-style publication about creativity, design, education, and artificial intelligence. It is written in a reflective, essayistic voice and is meant to feel like one connected body of work rather than a collection of isolated posts.

The site is built as a lightweight static website using plain HTML, CSS, and vanilla JavaScript. The main content lives in the single file [index.html](index.html), with styling in [css/styles.css](css/styles.css) and behaviour in [js/script.js](js/script.js).

## Site structure

- [index.html](index.html)
  - Contains the home page, article templates, profile templates, and the main publication content.
  - This is the primary place for new editorial content.
- [css/styles.css](css/styles.css)
  - Contains the visual system: typography, spacing, layout, reveal animations, and magazine-style presentation.
- [js/script.js](js/script.js)
  - Handles routing, scroll reveals, read progress, and other interactive behaviour.
- [articles/](articles/)
  - Presently a placeholder area for future content organisation.
- [assets/](assets/)
  - For local images, media, or supporting files.

## How to run locally

This site does not require a build step.

The simplest options are:

1. Open [index.html](index.html) directly in a browser.
2. Or run a local static server from the project root, for example:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/.

## Deployment and hosting

The website is intended to be deployed through GitHub and Vercel as a static site.

Recommended workflow:

1. Keep the project in a GitHub repository.
2. Connect that repository to Vercel.
3. In Vercel, deploy the project from the repository root.
4. Use the default static-site settings; no build command is usually required because the site is plain HTML, CSS, and JavaScript.

Important deployment notes:

- The root folder for deployment should be the project root.
- No bundler or framework build step is expected.
- If the site is updated in GitHub, Vercel will redeploy automatically when connected to the repository.

## How new content should be added

New content should usually be added in [index.html](index.html), not in separate component files.

When adding a new article or profile:

1. Add the new content as a new template block in [index.html](index.html).
2. Give it a clear template ID.
3. Add a route entry to [js/script.js](js/script.js) so it can be reached through the site router.
4. Keep the writing in the existing reflective magazine voice.
5. Link it to existing ideas where appropriate so the publication feels connected.
6. Preserve the existing structure, classes, and editorial tone.

When editing existing content:

- Prefer small, precise changes over large rewrites.
- Keep the authorial voice intact.
- Strengthen transitions and cross-references subtly.
- Respect the existing rhythm of the publication.

## Editorial principles for future edits

- Preserve the authentic voice of the writer.
- Make the site feel like one connected publication.
- Add cross-references between pieces where they feel natural.
- Avoid unnecessary rewriting.
- Respect the intellectual property and public-facing context of the people and organisations mentioned.
- Maintain clarity, warmth, and thoughtful reflection.
