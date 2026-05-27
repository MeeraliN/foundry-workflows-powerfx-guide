# Foundry Workflows Power Fx Gap Guide

This repository is for the **user building Microsoft Foundry workflows in the UI** who keeps asking:

- Why did this expression fail?
- What type does this field expect?
- Why does plain text work here but not there?
- Why do I need `UserMessage(...)`?
- How do I go from beginner to confident builder without trial and error?

This repo answers those questions directly.

## Start here

- **Learning site source:** [docs/index.html](docs/index.html)
- **Expected GitHub Pages URL:** [meeralin.github.io/foundry-workflows-powerfx-guide](https://meeralin.github.io/foundry-workflows-powerfx-guide/)
- **Ask a question:** [Open a GitHub question](https://github.com/MeeraliN/foundry-workflows-powerfx-guide/issues/new?template=question.yml)
- **Official workflow docs:** https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow
- **Official training module:** https://learn.microsoft.com/en-us/training/modules/build-agent-workflows-microsoft-foundry/
- **Power Fx overview:** https://learn.microsoft.com/en-us/power-platform/power-fx/overview

## What this repo fixes

The gap is not "Power Fx syntax in general." The gap is **Power Fx inside Foundry workflows**:

1. what each workflow field expects
2. what type your formula returns
3. how `Local.` and `System.` actually work
4. when to use strings, Booleans, tables, records, or message collections
5. how to stop debugging by guesswork

## What is inside the learning site

The site is organized like a learner-facing module:

- **Fast answers** for the most common workflow questions
- **Field-to-type map** for the UI
- **Step-by-step learning path** from beginner to advanced
- **Game mode quests** to practice the hard parts
- **Searchable answer library** for type errors, `UserMessage(...)`, conditions, loops, JSON, and troubleshooting
- **Ask a question** button that opens a GitHub issue form

## GitHub Pages

This repository includes a GitHub Pages workflow in `.github/workflows/deploy-pages.yml` that publishes the site from `docs/`.

Once Pages is enabled for the repository, the site should publish at:

`https://meeralin.github.io/foundry-workflows-powerfx-guide/`

## Main questions this repo answers

- **Why does plain text fail in some agent inputs?** Because some fields expect a message collection, not a raw string.
- **What does `Name isn't valid` usually mean?** Usually the variable name or scope prefix is wrong.
- **What does `Type mismatch` usually mean?** The field expects one type and your formula returns another.
- **What should I learn first?** Variables, scope, strings, Booleans, and conditions.
- **What should I master next?** Message collections, structured outputs, tables, loops, and troubleshooting.

If the learner can search this repo and immediately find the answer, the repo is doing its job.
