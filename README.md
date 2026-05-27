# Microsoft Foundry Workflows + Power Fx Learning Path

This repository is a **workflow-first learning path** for people building in the **Microsoft Foundry UI** who keep getting blocked by **Power Fx expressions, hidden type expectations, and unclear error messages**.

## Start here in 60 seconds

If you want the short version first, start with these:

- **What is the real problem?** Foundry builders struggle more with [type expectations](#mental-model-every-expression-has-a-type) than with basic syntax.
- **What should I learn first?** Start with the [recommended learning path](#recommended-learning-path) and learn strings, booleans, variables, and conditions before advanced workflows.
- **Why does plain text sometimes fail?** Some workflow fields expect a [message collection](#important-pattern-message-collections), not a raw string.
- **How do I stop trial and error?** Use the [troubleshooting guide](#level-6-learn-troubleshooting-like-an-expert) to map errors to likely causes.
- **How do I go from beginner to advanced?** Follow the [game mode level-up path](#game-mode-level-up-path).

The current official material is useful, but fragmented. You can find:

| Resource | What it helps with | Link |
| --- | --- | --- |
| Build a workflow in Microsoft Foundry | Official workflow concepts, variables, branching, and Power Fx basics | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow |
| Build agent-driven workflows using Microsoft Foundry | Official guided training module | https://learn.microsoft.com/en-us/training/modules/build-agent-workflows-microsoft-foundry/ |
| Power Fx overview | Official language background | https://learn.microsoft.com/en-us/power-platform/power-fx/overview |
| Power Fx formula reference | Official function reference | https://learn.microsoft.com/en-us/power-platform/power-fx/formula-reference-copilot-studio |
| Power Fx official GitHub repo | Official open-source language repo | https://github.com/microsoft/Power-Fx |
| Azure AI docs source repo | Official docs source for Foundry documentation | https://github.com/MicrosoftDocs/azure-ai-docs |

## The gap this repo is meant to solve

The hardest part for new Foundry workflow builders is usually **not** dragging nodes onto the canvas. It is understanding:

1. **What type a node expects**
2. **What type your expression produces**
3. **Why a plain string works in one place but fails in another**
4. **When you need a workflow-specific shape like a message collection**

That is where the trial-and-error loop starts:

- try an expression
- hit a type error
- search docs
- change the formula
- hit the next type error

This guide closes that gap by teaching **Power Fx specifically as used inside Foundry workflows**.

## What you should understand before anything else

### Mental model: every expression has a type

In Foundry workflows, Power Fx is not just about syntax. It is about producing the **right type** for the field you are filling in.

Common examples:

| Workflow situation | Expected output type | Example |
| --- | --- | --- |
| Send a message to the user | String | `"Hello"` or `Upper(Local.Name)` |
| If/else condition | Boolean | `StartsWith(System.LastMessageText, "help")` |
| Set variable | Must match the variable's intended type | `Upper(Local.Name)` or `CountRows(Local.Items)` |
| Agent input that expects messages | Message collection, not plain text | `UserMessage(Local.Prompt)` |
| For-each input | Table / collection | `Local.Items` |

### Mental model: scope matters

The official Foundry workflow docs explicitly call out variable prefixes:

- `System.` for built-in workflow values
- `Local.` for values created in your workflow

Examples:

- `System.LastMessageText`
- `System.User.Language`
- `Local.CustomerName`
- `Local.TriageResult`

If you see **"Name isn't valid"**, the first thing to check is usually whether you forgot `System.` or `Local.`.

## Recommended learning path

This path is designed to take someone from **new to Power Fx** to **comfortable building real Foundry workflows**.

### Level 1: Learn the workflow builder without fighting Power Fx

**Goal:** understand nodes, flow, and saved outputs before trying advanced expressions.

Build these first:

1. A workflow that asks a question and stores the answer in `Local.Name`
2. A workflow that sends back `Upper(Local.Name)`
3. A workflow that branches based on `System.LastMessageText`

Focus on:

- how to add nodes
- how to save outputs into variables
- where expressions are entered
- which fields want plain text versus formulas

Official starting points:

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/workflow
- https://learn.microsoft.com/en-us/training/modules/build-agent-workflows-microsoft-foundry/

### Level 2: Learn the minimum Power Fx you actually need for workflows

**Goal:** learn the subset of Power Fx that shows up constantly in workflow UIs.

Start with these categories:

| Category | Why it matters in Foundry |
| --- | --- |
| Strings | building prompts, cleaning text, formatting messages |
| Booleans | if/else routing |
| Records and tables | structured outputs, loops, parsed JSON |
| Blank handling | avoiding null/empty failures |
| Conversion functions | fixing type mismatches |

Prioritize these functions:

- `If`
- `Coalesce`
- `IsBlank`
- `Text`
- `Value`
- `Upper`
- `Lower`
- `Trim`
- `StartsWith`
- `EndsWith`
- `CountRows`
- `First`
- `Filter`
- `LookUp`
- `ParseJSON`
- `JSON`

Official references:

- https://learn.microsoft.com/en-us/power-platform/power-fx/overview
- https://learn.microsoft.com/en-us/power-platform/power-fx/formula-reference-copilot-studio

### Level 3: Learn Foundry-specific type thinking

**Goal:** stop treating expression failures as syntax problems when they are really type problems.

Study these patterns:

| Pattern | What to learn |
| --- | --- |
| String vs message collection | why some agent inputs need `UserMessage(...)` instead of raw text |
| Boolean-only conditions | why an if/else box cannot accept arbitrary text |
| Record/table outputs | how JSON-shaped agent output becomes something you can query |
| Local vs System variables | how workflow context is exposed to Power Fx |

#### Important pattern: message collections

One of the least obvious workflow concepts is that some agent interactions expect a **message collection type**, not a plain string.

That is why an expression like this can be required:

```powerfx
UserMessage(Local.PromptText)
```

Instead of this:

```powerfx
Local.PromptText
```

The reason is not that the text is wrong. The reason is that the node expects a **message object/collection shape**, not a raw string. This is exactly the kind of workflow-specific behavior that beginners struggle to discover from the UI alone.

### Level 4: Learn structured outputs and branching

**Goal:** build workflows that do real routing instead of linear prompt chains.

Practice this progression:

1. Configure an agent to return JSON
2. Save the JSON output to a variable
3. Read fields from that output
4. Branch with if/else based on the returned values
5. Send different follow-up messages or invoke different agents

Examples of the kinds of expressions to learn:

```powerfx
If(Local.Score >= 80, "high", "low")
```

```powerfx
Coalesce(Local.CustomerEmail, "missing")
```

```powerfx
CountRows(Local.Items)
```

This is where Foundry workflows start feeling powerful instead of fragile.

### Level 5: Learn loops, collections, and transformation

**Goal:** become comfortable working with multiple items instead of one message at a time.

Build examples that:

1. iterate over a collection with for-each
2. extract the first matching item
3. filter a list before sending it to the next node
4. turn structured data into user-friendly text

Useful functions:

- `ForAll`
- `Filter`
- `First`
- `Index`
- `Concat`
- `CountRows`
- `ParseJSON`
- `JSON`

### Level 6: Learn troubleshooting like an expert

**Goal:** diagnose workflow Power Fx problems quickly.

Use this checklist:

| Error or symptom | Usually means |
| --- | --- |
| `Name isn't valid` | wrong variable name or missing `Local.` / `System.` prefix |
| `Type mismatch` | the field expects a different type than your expression returns |
| Condition does not work | expression is not returning a Boolean |
| Agent input fails | the node may expect message-shaped input, not raw text |
| Loop fails | the input is not a table/collection |
| Output is blank | the variable was never saved, or the property path is wrong |

## A beginner-to-expert practice sequence

If you want a concrete sequence, use this:

| Step | Build this | Main concept |
| --- | --- | --- |
| 1 | Ask name -> respond in uppercase | local variables + strings |
| 2 | Route based on user message | booleans + system variables |
| 3 | Save structured agent output | JSON + variables |
| 4 | Route by confidence or category | conditions + records |
| 5 | Send text into an agent with `UserMessage(...)` | message collection typing |
| 6 | Process multiple returned items | tables + loops |
| 7 | Add human approval | workflow orchestration |
| 8 | Build a multi-agent triage workflow | end-to-end design |

## Game mode: level-up path

If you want this to feel less like documentation and more like progression, use this path like a game.

| Rank | Mission | Win condition | Unlocks |
| --- | --- | --- | --- |
| **Rookie Builder** | Build "ask -> save -> reply" | Save a user answer and return `Upper(Local.Name)` | [Variables and scope](#mental-model-scope-matters) |
| **Branch Explorer** | Build your first if/else route | Use `System.LastMessageText` in a Boolean condition | [Conditions and Boolean logic](#level-2-learn-the-minimum-power-fx-you-actually-need-for-workflows) |
| **Type Detective** | Fix 3 type mismatches | Explain why a field wants string, Boolean, table, or message collection | [Type thinking](#level-3-learn-foundry-specific-type-thinking) |
| **Message Wrangler** | Send the right payload to an agent | Use `UserMessage(Local.PromptText)` in the correct place | [Message collection pattern](#important-pattern-message-collections) |
| **Flow Strategist** | Route based on structured output | Save JSON, read fields, branch correctly | [Structured outputs and branching](#level-4-learn-structured-outputs-and-branching) |
| **Loop Runner** | Process multiple items | Use a collection in a for-each or table flow | [Loops and collections](#level-5-learn-loops-collections-and-transformation) |
| **Workflow Guardian** | Diagnose failures fast | Identify the root cause from an error without guessing | [Troubleshooting](#level-6-learn-troubleshooting-like-an-expert) |
| **Foundry Architect** | Build a real end-to-end workflow | Combine agent input, conditions, loops, and human review | [Practice sequence](#a-beginner-to-expert-practice-sequence) |

### Suggested scoring

- **10 XP**: finish a basic expression
- **25 XP**: fix a type mismatch without searching
- **50 XP**: build a working branch or loop
- **100 XP**: complete a full multi-node workflow

### Boss battle

Build a workflow that:

1. asks the user for input
2. converts the input into the right agent message shape
3. gets structured output back from an agent
4. branches based on confidence or category
5. loops over returned items if needed
6. sends the final answer to the user or a human approver

If you can do that without guessing what type each field expects, you are no longer a beginner.

## Suggested teaching structure for this repository

If you want this repo to become the missing learning path, the best structure is:

1. **Foundations** - what workflows are, where Power Fx appears, and how variable scope works
2. **Type system for workflow builders** - strings, booleans, records, tables, message collections
3. **Core expression recipes** - real formulas people use every day
4. **Foundry-specific patterns** - `UserMessage(...)`, branching, saved outputs, loops
5. **Troubleshooting guide** - map errors to likely causes
6. **Capstone workflows** - beginner, intermediate, advanced examples

## Recommended official repos to learn from

There is **not currently a single official GitHub repo** that takes someone from beginner to expert specifically on **Microsoft Foundry Workflows + Power Fx in the UI**.

The best official repos today are:

| Repo | Why it helps | Link |
| --- | --- | --- |
| microsoft/Power-Fx | official language repo, docs, and source | https://github.com/microsoft/Power-Fx |
| MicrosoftDocs/azure-ai-docs | official documentation source for Foundry docs | https://github.com/MicrosoftDocs/azure-ai-docs |

So the opportunity for this repository is clear:

> Build the **workflow-first, Power-Fx-for-Foundry** guide that does not currently exist in one place.

## Recommended outcome for this repo

This repository should teach people to answer these questions without guesswork:

- What type does this workflow field expect?
- What type does my Power Fx expression return?
- When do I use `Local.` versus `System.`?
- When do I need `UserMessage(...)` instead of plain text?
- How do I build conditions, loops, and structured outputs without trial and error?

If this repo does that well, it fills a real gap in the current Microsoft Foundry learning experience.

## Quick answer summary

If someone only reads one section, this should answer the main questions quickly:

| Question | Short answer | Read more |
| --- | --- | --- |
| Is there already one complete official guide for Foundry workflows + Power Fx in the UI? | **No.** There are good official pieces, but not one end-to-end workflow-first guide. | [Recommended official repos to learn from](#recommended-official-repos-to-learn-from) |
| What is the recommended learning path? | Start with workflow basics, then learn the Power Fx subset used most in workflows, then move into types, branching, loops, and troubleshooting. | [Recommended learning path](#recommended-learning-path) |
| What is the biggest beginner mistake? | Treating every failure like a syntax issue instead of a type issue. | [Mental model: every expression has a type](#mental-model-every-expression-has-a-type) |
| Why do some agent inputs fail when plain text looks valid? | Because some fields expect a message collection shape, not a raw string. | [Important pattern: message collections](#important-pattern-message-collections) |
| What should I do when I see `Name isn't valid`? | Check whether you forgot the correct variable scope prefix like `Local.` or `System.`. | [Mental model: scope matters](#mental-model-scope-matters) |
| What should I do when I see `Type mismatch`? | Check what type the field expects, then convert or reshape your expression output. | [Troubleshooting guide](#level-6-learn-troubleshooting-like-an-expert) |
| How do I go from beginner to advanced without getting discouraged? | Follow a staged progression with small wins, then use the game-style journey to level up. | [Game mode: level-up path](#game-mode-level-up-path) |
