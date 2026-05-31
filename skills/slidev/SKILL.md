---
name: slidev
description: >-
  Create effective technical presentations with Slidev, focused on data science,
  statistics, and developer talks. Opinionated toward the neversink theme with
  the-unnamed as an alternative. Use when the user wants to build, edit, review,
  or export slide decks. Covers Slidev syntax, neversink/the-unnamed theme
  features, visual design principles, storytelling structure, and export
  workflows.
---

# Slidev: Effective Technical Presentations

Opinionated guidance for building slide decks with Slidev. Load the references
below as needed; do not try to fit all content into the initial response.

## When to Use

- Building a new technical presentation, workshop, or conference talk
- Editing or restructuring an existing deck
- Converting a Jupyter notebook, blog post, or paper into slides
- Reviewing a deck for visual clarity and narrative flow
- Setting up export (PDF, SPA) or CI deployment
- Adding code examples, math, diagrams, or data visualizations to slides

## References

Load a reference when the task matches. Do not load multiple overlapping
references for the same task.

| When you need to... | Load this file |
|---------------------|----------------|
| Scaffold a new project | [scripts/scaffold.sh](scripts/scaffold.sh), then [references/workflows.md](references/workflows.md) for dev server setup |
| Lint an existing `slides.md` | [scripts/review.py](scripts/review.py) |
| See how the author's decks actually look (443-slide dataset) | [references/visual-preferences.md](references/visual-preferences.md) |
| Pick a theme (neversink vs. the-unnamed) | [references/themes.md](references/themes.md) |
| Look up a neversink layout, slot syntax, or color scheme | [references/neversink-theme.md](references/neversink-theme.md) |
| Customize the-unnamed colors | [references/the-unnamed.md](references/the-unnamed.md) |
| Add a slide (layout selection, color rules, notes format) | [references/workflows.md](references/workflows.md) |
| Copy a common pattern (title, quote, math, code, image grid) | [references/quick-patterns.md](references/quick-patterns.md) |
| Check what not to do | [references/anti-patterns.md](references/anti-patterns.md) |
| Understand non-negotiable design rules, contrast, image quality, or logo placement | [references/visual-design.md](references/visual-design.md) |
| Structure a talk arc (hook, pacing, closing) | [references/storytelling.md](references/storytelling.md) |
| Add code with highlighting or click reveals | [references/code-slides.md](references/code-slides.md) |
| Add math, Mermaid diagrams, or figure layouts | [references/math-diagrams.md](references/math-diagrams.md) |
| Export PDF/SPA or set up CI deployment | [references/exporting.md](references/exporting.md) |
| Use a built-in component (Link, Toc, VClick, etc.) | [references/components.md](references/components.md) |

## Resources

- Slidev documentation: https://sli.dev
- Neversink theme docs: https://gureckis.github.io/slidev-theme-neversink/
- The-unnamed theme: https://github.com/estruyf/slidev-theme-the-unnamed
