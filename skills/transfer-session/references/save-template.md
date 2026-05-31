# Reference: Save Template
This document contains the exact output format to be used for the `transfer-session` skill in save mode.

```markdown
# Session Snapshot: [Brief Title]

**Date:** [YYYY-MM-DD HH:MM]
**Project:** [Project name or path]
**Branch:** [Git branch]
**Next session focus:** [From user arguments, or inferred]

---

## Goal

[One sentence. Link to artifact if applicable.]

## Progress

- [Completed item]
- [Completed item]

## Active State

### Files in flight
- `path/to/file.py` — modified; [one-line status]
- `path/to/new_file.py` — new; [one-line status]

### Git summary
Branch: `feature/foo`. Uncommitted changes in 3 files.

### Diagnostics
- `pytest path/to/test.py::test_name` — failing with [short error summary]

## Open Questions & Blockers

1. [Question or blocker]
2. [Question or blocker]

## Relevant Code & Architecture

- `path/to/module.py:42-58` — [description of focal function/class]

## Environment

- [Any notes on environment, dependencies, or running services]

## Suggested Skills

- `skill-name` — [why it is relevant]
- `skill-name` — [why it is relevant]

## Next Steps

1. [First thing to do]
2. [Second thing to do]
3. [Done condition]
```
