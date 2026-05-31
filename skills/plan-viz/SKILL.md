---
name: plan-viz
description: >-
  Create a rich, self-contained HTML visualization of an implementation plan.
  Invoke whenever the user asks to visualize a plan, create a plan overview,
  make an implementation plan visual, "show me the plan," "plan as HTML," or
  any request to turn a project plan, roadmap, or architecture into a visual
  artifact. Also trigger when the user mentions wanting mock-ups, code excerpts,
  or maximum context about a plan in a single viewable file. This skill gathers
  plan content from conversation or files and produces a styled HTML file with
  sections for overview, phases, architecture, code/mock-ups, dependencies,
  risks, and success criteria.
---

# Plan Visualization

Transform an implementation plan into a rich, single-file HTML artifact that
maximizes context at a glance.

## When to Use

- The user says "visualize my plan," "plan overview," "show me the plan"
- The user wants an HTML file representing an implementation plan
- The user asks for mock-ups, code excerpts, or "maximum context" about a plan
- The user wants to communicate a plan to stakeholders or teammates visually
- The user has a written plan (PLAN.md, ROADMAP.md, etc.) and wants it turned
  into a visual artifact

## Workflow

### 1. Gather plan content

If the user has already described the plan in this conversation, synthesize it.
If the plan exists in a file, read it. If neither, ask concise clarifying
questions to elicit:

- What is the goal? What problem does this solve?
- What are the major phases or milestones?
- What are the key components, services, or modules?
- What technologies, libraries, or APIs are involved?
- What does success look like? What are the risks or blockers?

Keep questions minimal — one or two at a time. Do not stall on gathering; use
what you have and produce the artifact.

### 2. Classify the plan

Determine the dominant domain so you know which sections to emphasize:

- **Software / infrastructure** — emphasize architecture, components, data flow,
  API contracts, deployment
- **Data science / ML / statistical modeling** — emphasize data strategy,
  modeling approach, validation, reproducibility, PCS framework
- **Notebook-driven analysis / reporting** — emphasize pipeline stages, outputs,
  visualization strategy, audience
- **Mixed** — balance all of the above

### 3. Load the template

Read `assets/template.html`. It is a self-contained HTML file with embedded CSS.
Fill in the marked sections. Do not alter the CSS or structure unless the user
explicitly asks for a different visual style.

### 4. Fill each section

Replace the placeholder comments in the template with real content. Each section
should be dense with useful information.

#### Title & Metadata
- Project name and one-line summary
- Date, author (if known), plan version

#### Executive Summary
- 3-5 sentences capturing the goal, scope, and expected outcome
- Mention the primary audience (developers, stakeholders, yourself)

#### Phases / Timeline
- List phases with estimated durations
- For each phase: objective, key deliverables, dependencies on prior phases
- Use a simple numbered or card layout; avoid complex JS chart libraries

#### Architecture & Components
- Describe the system structure: services, modules, data stores, external APIs
- Include a text-based diagram or ASCII art if it aids clarity
- Note interfaces, contracts, and trust boundaries

#### Code Excerpts & Mock-ups
- Include 2-4 short, representative code snippets, config samples, or interface
  mock-ups that illustrate the plan
- Choose excerpts that reveal the most about the approach (not boilerplate)
- Use the template's pre-styled `<pre><code>` blocks with language labels
- Escape HTML special characters (`<`, `>`, `&`) inside code blocks so they
  render correctly

#### Dependencies & Risks
- External dependencies: libraries, APIs, teams, approvals
- Risks with severity (High / Medium / Low) and mitigation
- Blockers that must be resolved before a phase can start

#### Success Criteria
- Measurable outcomes: metrics, thresholds, deliverables
- Definition of done for the overall plan and for each phase

### 5. Write the output

Save the completed HTML to a file named `<project>-plan.html` (or `plan.html` if
no project name is obvious) in the current working directory. Open it with the
user's default browser if possible, or tell them the file path.

## Design Principles

- **Density over brevity.** The user asked for maximum context. Include excerpts,
  mock-ups, and specifics. A 200-line HTML file is better than a sparse one.
- **Scannable structure.** Use headings, cards, and color-coded severity badges
  so a reader can grasp the plan in 30 seconds or read deeply in 5 minutes.
- **Self-contained.** The HTML must have no external dependencies (no CDN links,
  no images unless data URIs). It should render correctly offline.
- **No placeholders.** Every section must have real content. If a piece of
  information is genuinely unknown, state the open question explicitly rather
  than leaving a placeholder.

## Output Format

A single `.html` file written to the filesystem. Provide the file path in chat.
