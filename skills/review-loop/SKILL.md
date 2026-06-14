---
name: review-loop
description: >-
  Iteratively review and improve a plan until independent review concerns are
  resolved. Use this skill when the user asks to "run a review loop", "review
  and address until clean", "spawn a reviewer and integrate comments", "repeat
  review until all concerns are resolved", or wants a reusable workflow that
  combines review-plans with address-review. It spawns an independent reviewer
  subagent for each pass, updates the plan finding-by-finding, and produces a
  disposition trail plus an explicit closure or incomplete-loop summary.
---

# Review Loop

Use this when the deliverable is a plan, proposal, RFC, implementation design,
or similar pre-execution artifact that should be stress-tested and revised until
an independent reviewer has no remaining actionable concerns.

The point of the loop is independence. The reviewer should not share the same
mental state as the authoring/addressing pass. Spawn a fresh reviewer subagent
for each review pass, then integrate the review yourself. Borrow only the
`address-review` finding-by-finding triage and disposition pattern: verify each
finding, resolve it in the plan or explicitly decline it with evidence, and keep
a per-finding disposition trail. For plan-only edits, verification means checking
the revised plan and referenced repo context; do not run builds, tests, linters,
or formatters unless executable artifacts changed.

## Inputs

Accept any of these as the plan source:

- A path to a plan file.
- A `local://...` planning artifact.
- A plan in the current conversation.
- A directory containing candidate plan files.

If the user provides a directory or ambiguous target, inspect likely plan files
before asking. Ask only when multiple plausible candidates remain.

If the plan exists only in conversation, write it to a `local://` artifact before
starting. Loop against that file so every reviewer pass sees the same current
plan text.

## Core workflow

1. **Prepare the working plan.**
   - Read the plan artifact.
   - If the plan has unresolved scope or success-criteria ambiguity, use
     `socratic-review` first. Fold the resulting decisions into the working plan
     or write them to a loop-owned `local://REVIEW_DECISIONS.md` artifact. Do not
     rely on a repo-root `DECISION_LOG.md` as the loop artifact unless the user
     explicitly wants repo-local planning files.
   - Set `max_passes=3` by default unless the user explicitly provides another
     bound.
   - Decide artifact names up front:
     - `REVIEW-P1.md`, `REVIEW-P2.md`, ... for reviewer reports.
     - `REVIEW_DISPOSITION.md` for the cumulative finding disposition trail.
     - Prefer `local://` artifacts unless the user explicitly wants repo-local
       planning files.

2. **Spawn an independent reviewer.**
   - Use a subagent, not inline self-review.
   - Instruct it to use `review-plans` on the current plan artifact.
   - Instruct it to skip builds, tests, formatters, and project-wide checks; the
     reviewer only reads and reports.
   - Require it to write the full report directly to the exact review path for
     this pass. Tell it not to use `review-plans`' default `REVIEW.md` path.
   - Require counts of Critical, Warning, and Note findings in the final line,
     plus the path where it wrote the review.

   Suggested assignment shape:

   ```text
   # Target
   Review <plan path> using the review-plans skill. Do not modify the plan.

   # Change
   Produce a categorized plan review with Critical/Warning/Note findings,
   evidence, risk, recommendation, and why. Write the full report directly to
   <review path>. Do not write to, overwrite, or rely on the default REVIEW.md
   path.

   # Acceptance
   Final response includes the review path and exact finding counts in the form
   Critical=<n>, Warning=<n>, Note=<n>. Skip all builds, tests, formatters, and
   project-wide commands.
   ```

3. **Read and validate reviewer output.**
   - Read the exact review path chosen for this pass before extracting findings.
   - If the reviewer did not report counts, parse them from the `🔴`/`🟡`/`🟢`
     finding headings.
   - If the review path is missing or unreadable, ask the reviewer once over IRC
     for the exact path. If that does not produce a readable report, rerun the
     pass with the same plan and review path.
   - Never advance to addressing or the next pass without a readable review
     artifact and exact Critical/Warning/Note counts.

4. **Address every finding.**
   - Extract every Critical, Warning, and Note finding.
   - Assign a stable finding ID using the pass, severity, and ordinal within that
     severity: `P1-C1`, `P1-W2`, `P1-N3`.
   - For each finding:
     - Verify it against the plan and any referenced repo context.
     - Resolve warranted findings by editing the plan.
     - Partially resolve findings when the review is directionally right but the
       exact recommendation is wrong for this plan.
     - Decline wrong, duplicate, out-of-scope, stylistic-only, or non-actionable
       findings with evidence.
   - Append a disposition entry for every finding:

   ```markdown
   ### P<N>-<C|W|N><ordinal> — <severity>: <finding title>
   - Source: <review path>
   - Disposition: Resolved | Partially resolved | Won't fix
   - Changed: <plan section/file changed, or "None">
   - Evidence: <specific change made or evidence-backed reason for decline>
   ```

   Every finding gets exactly one disposition. Never silently skip Notes; either
   incorporate them, convert them into explicit constraints, or decline them with
   evidence.

5. **Repeat on the revised plan.**
   - Spawn a new reviewer subagent with the revised plan and a new review path.
   - Do not reuse the previous reviewer output as proof that the plan is now
     clean.
   - Continue until the latest review has no actionable Critical, Warning, or
     Note findings, or until the configured pass bound is reached.

## Stop conditions

Stop only when one of these is true:

- The latest independent review reports `Critical=0, Warning=0, Note=0`.
- The latest review contains only findings already dispositioned as duplicate,
  outside scope, impossible to verify with available evidence, stylistic-only, or
  intentionally not part of the plan; the final report must list those decisions
  explicitly.
- `max_passes` is reached. Perform final maintainer triage: unresolved
  actionable findings mean the review loop is incomplete; duplicate,
  stylistic-only, out-of-scope, or otherwise non-actionable findings may be
  closed with explicit evidence; another pass requires explicit user opt-in.
- The user explicitly stops the loop.

Do not stop merely because Critical and Warning findings are gone. Notes can
still encode missing acceptance criteria, ambiguous contracts, or future-reader
confusion.

## Final response

Return a terse closure report:

```markdown
Review loop complete.

Plan: <path>
Disposition trail: <path>
Max passes: <n>
Iterations:
- Pass 1: Critical=<n>, Warning=<n>, Note=<n>, review=<path>
- Pass 2: Critical=<n>, Warning=<n>, Note=<n>, review=<path>

Outcome: Clean | Closed with non-actionable findings | Incomplete
Closure: <why the loop stopped>
Remaining actionable items: <none or bullet list>
Remaining non-actionable items: <none or bullet list>
```

If the plan itself changed, mention the changed plan path. Do not paste the full
plan unless the user asks.

## Guardrails

- Keep authoring and review roles separate. The main agent revises; subagents
  review.
- Preserve reviewer criticism. Do not rewrite a finding to make it easier to
  close.
- Resolve the root gap in the plan, not just the wording that triggered the
  reviewer.
- Prefer a boring finite loop over an endless perfection loop: evidence-backed
  `Won't fix` is valid when a finding is wrong or outside scope.
- Planning and review files are process artifacts. Do not commit them unless the
  user explicitly asks.
