---
title: "Agent 365 and the posture gap"
standfirst: "Agent inventory tells you which agents exist. It doesn't tell you which ones can quietly reach your crown jewels."
published: 2026-09-08
kind: essay
tags: ["agent governance", "cspm", "microsoft"]
draft: false
---

This file is a placeholder with your real subject in it, so you can see how a
published piece looks. Replace the body with your draft — the frontmatter above
is the only part that has to stay.

A few things the layout is built to handle:

## Section headings

Body text sits on a 34rem measure, which lands under 80 characters per line. Long
paragraphs stay readable without you doing anything.

> Pull quotes get an amber rule. Use them for a claim you want a skimming reader
> to land on, not for decoration.

Inline `code` and identifiers render in monospace, and fenced blocks get syntax
highlighting:

```powershell
Get-MgServicePrincipal -Filter "servicePrincipalType eq 'ManagedIdentity'" |
  Select-Object DisplayName, Id, AppId
```

## Writing notes

- Lead with the argument, not the background. The standfirst is the argument.
- One piece, one claim. Split anything that needs two.
- Name the thing you're not covering, so the gaps read as choices.
