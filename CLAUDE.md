# Website Design Recreation

## Workflow

When the user provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Explore** the reference before writing any code. Describe every visible section,
   spacing system, color palette, font stack, and layout structure. If anything is
   ambiguous, ask before assuming.
2. **Generate** a single `index.html` file using Tailwind CSS (via CDN). Include all
   content inline — no external files unless requested.
3. **Screenshot** the rendered page using Puppeteer:
   ```
   npx capture-website-cli index.html --output=screenshot.png --full-page
   ```
   If the page has distinct sections, capture those individually too.
4. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
5. **Fix** every mismatch found. Edit the HTML/Tailwind code.
6. **Re-screenshot** and compare again.
7. **Repeat** steps 4–6 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when
the user says so or when no visible differences remain.

## Technical Defaults

- Use Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Use placeholder images from `https://placehold.co/` when source images aren't provided
- Mobile-first responsive design
- Single `index.html` file unless the user requests otherwise

## Rules

- Do not add features, sections, or content not present in the reference image
- Match the reference exactly — do not "improve" the design
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px
  but reference shows ~24px", "gap between cards is 16px but should be 24px")
- Fix root causes, not symptoms — no band-aids or workarounds
- Only touch what's necessary; avoid side effects on unrelated elements

## Lessons Log

> Every time a mistake is corrected, add a rule here so it never repeats.
> This file compounds in value over time — treat it like code and prune it if it grows
> past ~200 lines total, keeping only rules that would cause real mistakes if removed.

- (add entries here after each correction)

---

# Karpathy-Inspired Behavioral Guidelines

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
