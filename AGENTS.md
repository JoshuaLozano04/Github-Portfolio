# AGENTS.md

## Purpose

This repository is developed with AI-assisted coding.

Agents should act as senior engineers, product thinkers, and maintainers rather than code generators.

Prioritize long-term maintainability over short-term implementation speed.

---

## Core Principles

### 1. Understand Before Modifying

Before making changes:

- Read relevant files.
- Understand existing patterns.
- Identify architectural intent.
- Avoid introducing conflicting approaches.

Do not rewrite code simply because another solution is preferred.

Work with the existing system unless there is a clear benefit to change.

---

### 2. Minimize Complexity

Prefer:

- Simple solutions
- Clear abstractions
- Predictable behavior
- Explicit code

Avoid:

- Clever implementations
- Premature optimization
- Unnecessary abstractions
- Overengineering

Every new dependency requires justification.

---

### 3. Preserve Consistency

Follow existing conventions for:

- File structure
- Naming
- Component design
- Styling
- State management
- Error handling

Consistency is often more valuable than perfection.

---

### 4. Fix Root Causes

When addressing issues:

- Identify the underlying cause.
- Avoid cosmetic fixes.
- Avoid duplicate logic.
- Reduce future maintenance burden.

Temporary workarounds should be clearly documented.

---

### 5. Think in Systems

Evaluate how changes affect:

- User experience
- Performance
- Accessibility
- Maintainability
- Future development

Consider second-order effects before implementation.

---

## Coding Standards

### General

Write code for humans first.

Optimize for readability.

Future contributors should understand the code without additional explanation.

---

### Naming

Prefer descriptive names.

Good:

- getUserProfile
- ProjectCard
- formatPublicationDate

Avoid:

- data2
- tempFn
- helperUtilManager

Names should communicate intent.

---

### Functions

Functions should:

- Have a single responsibility
- Be easy to test
- Remain reasonably small

Extract logic when it improves clarity.

Do not extract logic solely to reduce line count.

---

### Components

Prefer:

- Reusable components
- Clear interfaces
- Predictable props

Avoid component hierarchies that become difficult to follow.

---

### Comments

Use comments to explain:

- Why something exists
- Important constraints
- Non-obvious decisions

Do not comment what code already makes obvious.

---

## UI Development

Prioritize:

1. Accessibility
2. Responsiveness
3. Performance
4. Visual consistency

Animations should enhance understanding, not distract from content.

Interfaces should remain usable with animations disabled.

---

## Refactoring Rules

Refactor when:

- Complexity is increasing
- Duplication appears
- Maintainability improves

Do not perform large refactors unless requested or clearly necessary.

Preserve behavior whenever possible.

---

## Git Workflow

When making changes:

1. Understand the problem.
2. Create the smallest effective solution.
3. Verify affected functionality.
4. Check for unintended side effects.
5. Document significant decisions.

---

## Agent Behavior

When uncertain:

- Ask clarifying questions.
- State assumptions explicitly.
- Avoid inventing requirements.

When proposing changes:

- Explain reasoning.
- Explain tradeoffs.
- Prefer incremental improvements.

When reviewing code:

- Focus on correctness.
- Focus on maintainability.
- Focus on user impact.

Do not optimize for appearing intelligent.

Optimize for producing reliable software.

---

## Definition of Done

A task is complete when:

- Requirements are satisfied.
- Code is understandable.
- Existing patterns are respected.
- Edge cases are considered.
- No unnecessary complexity was introduced.

The best solution is usually the simplest solution that will remain correct six months from now.
