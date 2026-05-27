# Foundry Workflows + Power Fx Guide

Use this page like a learning module.

## Fast answers

| Question | Short answer |
| --- | --- |
| Why does plain text fail in some agent fields? | Because some fields expect a message collection, not a raw string. |
| What does `Name isn't valid` usually mean? | The variable name is wrong or the `System.` / `Local.` prefix is missing. |
| What does `Type mismatch` usually mean? | The field expects one type and the formula returns another. |
| What should a beginner learn first? | Scope, strings, Booleans, conditions, and one saved-variable flow. |
| What should the learner master next? | Message collections, structured output, loops, and troubleshooting. |

## Field-to-type map

| Workflow field | Usually expects | Good example | Common failure |
| --- | --- | --- | --- |
| Send a message | String | `"Hello"` or `Upper(Local.Name)` | Using a table or record |
| If/else condition | Boolean | `StartsWith(System.LastMessageText, "help")` | Putting plain text where true/false is required |
| Set variable | The target variable's shape | `CountRows(Local.Items)` | Saving text into something later treated like a table |
| Agent message input | Message collection | `UserMessage(Local.PromptText)` | Sending `Local.PromptText` as if it were already a message object |
| For-each source | Table or collection | `Local.Items` | Trying to loop over a single string |
| Structured output lookup | Record or parsed JSON | `Local.Result.category` | Assuming JSON text is already a record |

## Learning path

### Module 1: Workflow basics before formulas

**Goal:** understand where Power Fx appears in the UI and which fields are plain text versus expressions.

### Module 2: Scope and variable survival

**Goal:** master `System.` and `Local.` so the learner stops hitting basic name errors.

### Module 3: Types before syntax

**Goal:** think in string, Boolean, record, table, blank, and message collection before trying random formulas.

### Module 4: Agent inputs and `UserMessage(...)`

**Goal:** understand why some agent inputs need message-shaped values instead of raw text.

### Module 5: Branching and conditions

**Goal:** build conditions that truly return a Boolean.

### Module 6: Structured outputs and JSON

**Goal:** route workflows using saved output fields instead of long prompt chains.

### Module 7: Tables, collections, and loops

**Goal:** stop loop errors by learning the difference between a single value and a collection.

### Module 8: Troubleshooting like a builder

**Goal:** map each error back to scope, type, or shape.

## Continue

- [Play Game Mode](game-mode.md)
- [Open the question portal](https://github.com/MeeraliN/foundry-workflows-powerfx-guide/issues/new?template=question.yml)
- [Open the live learning hub](https://meeralin.github.io/foundry-workflows-powerfx-guide/)
