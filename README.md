# Foundry Workflows Power Fx Gap Guide

This repository is for the **user building Microsoft Foundry workflows in the UI** who keeps asking:

- Why did this expression fail?
- What type does this field expect?
- Why does plain text work here but not there?
- Why do I need `UserMessage(...)`?
- How do I go from beginner to confident builder without trial and error?

This repo answers those questions directly.

## Start here

| If the learner wants to... | Open this |
| --- | --- |
| Get quick answers first | [Fast answers](docs/guide.md#fast-answers) |
| Understand what each field expects | [Field-to-type map](docs/guide.md#field-to-type-map) |
| Follow the learning path step by step | [Learning path](docs/guide.md#learning-path) |
| Ask a workflow Power Fx question | [Question portal](https://github.com/MeeraliN/foundry-workflows-powerfx-guide/issues/new?template=question.yml) |

## Official references

- **Workflow docs:** https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow
- **Training module:** https://learn.microsoft.com/en-us/training/modules/build-agent-workflows-microsoft-foundry/
- **Power Fx overview:** https://learn.microsoft.com/en-us/power-platform/power-fx/overview
- **Power Fx formula reference:** https://learn.microsoft.com/en-us/power-platform/power-fx/formula-reference-copilot-studio

## What this repo fixes

The gap is not "Power Fx syntax in general." The gap is **Power Fx inside Foundry workflows**:

1. what each workflow field expects
2. what type your formula returns
3. how `Local.` and `System.` actually work
4. when to use strings, Booleans, tables, records, or message collections
5. how to stop debugging by guesswork

## Use this repository like a learner

The learner should be able to click once and start:

- [Fast answers](docs/guide.md#fast-answers) for the most common workflow questions
- [Field-to-type map](docs/guide.md#field-to-type-map) for the UI
- [Step-by-step learning path](docs/guide.md#learning-path) from beginner to advanced
- [Question portal](https://github.com/MeeraliN/foundry-workflows-powerfx-guide/issues/new?template=question.yml) for missing answers

## Main questions this repo answers

- **Why does plain text fail in some agent inputs?** Because some fields expect a message collection, not a raw string.
- **What does `Name isn't valid` usually mean?** Usually the variable name or scope prefix is wrong.
- **What does `Type mismatch` usually mean?** The field expects one type and your formula returns another.
- **What should I learn first?** Variables, scope, strings, Booleans, and conditions.
- **What should I master next?** Message collections, structured outputs, tables, loops, and troubleshooting.

If the learner can search this repo and immediately find the answer, the repo is doing its job.

## Contributing

This project is open source. If you want to improve an explanation, add a missing example, fix an unclear answer, or expand the learning path, feel free to open an issue or submit a pull request.
