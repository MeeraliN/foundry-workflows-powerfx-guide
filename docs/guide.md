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

**What to learn**

- A workflow is made of nodes, outputs, and transitions.
- Not every text box in the UI behaves the same way.
- Some fields accept plain text, while others evaluate Power Fx.

**Why this matters**

Many beginners fail before Power Fx even starts because they assume every field can take the same kind of value. That leads to confusion when a message box accepts text but a condition box does not.

**What to do**

1. Create a workflow with an **Ask a question** node.
2. Save the response as `Local.Name`.
3. Add a **Send message** node that returns `Upper(Local.Name)`.

**What success looks like**

The workflow asks for a name, saves it, and replies with the uppercase version.

### Module 2: Scope and variable survival

**Goal:** master `System.` and `Local.` so the learner stops hitting basic name errors.

**What to learn**

- `System.` means Foundry gives you the value.
- `Local.` means your workflow created the value.
- A variable name without the correct scope often fails.

**Key examples**

- `System.LastMessageText`
- `System.User.Language`
- `Local.Name`
- `Local.Result`

**Common mistake**

Writing `Name` when the actual variable is `Local.Name`.

**What to practice**

1. Save a user response into `Local.Name`.
2. Use `System.LastMessageText` in a second node.
3. Intentionally remove the prefix once so you can recognize the error.

### Module 3: Types before syntax

**Goal:** think in string, Boolean, record, table, blank, and message collection before trying random formulas.

**What to learn**

- A valid formula can still fail if it returns the wrong type.
- Workflow fields usually expect one of a small set of shapes.
- Debugging gets easier when you ask "what type does this field want?" before rewriting the formula.

**Type checklist**

| Type | Use it for |
| --- | --- |
| String | messages, prompt text, labels |
| Boolean | if/else conditions |
| Record | structured outputs, named fields |
| Table | for-each loops, multiple items |
| Blank | missing values |
| Message collection | agent input fields that expect chat-shaped values |

**Practice**

Look at three workflow fields and identify which type each one expects before writing the formula.

### Module 4: Agent inputs and `UserMessage(...)`

**Goal:** understand why some agent inputs need message-shaped values instead of raw text.

**What to learn**

- Some agent nodes expect a message object or message collection.
- A plain string is not always enough.
- `UserMessage(Local.PromptText)` wraps text into the shape the field expects.

**Wrong**

```powerfx
Local.PromptText
```

**Right when the field expects a message**

```powerfx
UserMessage(Local.PromptText)
```

**Why this matters**

This is one of the biggest hidden gaps in Foundry workflows. The text itself may be correct, but the workflow still fails because the field expects a different shape.

**Practice**

Test one agent input with plain text and one with `UserMessage(...)`, then compare the behavior.

### Module 5: Branching and conditions

**Goal:** build conditions that truly return a Boolean.

**What to learn**

- Condition boxes need `true` or `false`.
- A text value that "looks meaningful" still fails if it is not Boolean.
- String checks and comparisons are the most common workflow branching tools.

**Good examples**

```powerfx
StartsWith(System.LastMessageText, "help")
```

```powerfx
Local.Score >= 80
```

```powerfx
!IsBlank(Local.CustomerEmail)
```

**Common failure**

```powerfx
"help"
```

That is a string, not a Boolean.

**Practice**

Build a branch that sends one path for `help` requests and another for everything else.

### Module 6: Structured outputs and JSON

**Goal:** route workflows using saved output fields instead of long prompt chains.

**What to learn**

- Agent output becomes more useful when it is structured.
- A record is easier to branch on than a long paragraph of text.
- `ParseJSON` is only needed when you truly still have JSON text.

**Recommended flow**

1. Configure the agent to return structured JSON.
2. Save the output to a variable such as `Local.Result`.
3. Read fields like `Local.Result.category` or `Local.Result.confidence`.
4. Use those fields in conditions.

**Example**

```powerfx
If(Local.Result.confidence >= 0.8, "high", "low")
```

**Common failure**

Treating JSON text as if it were already a record.

### Module 7: Tables, collections, and loops

**Goal:** stop loop errors by learning the difference between a single value and a collection.

**What to learn**

- A loop needs multiple items.
- A single string is not a table.
- Functions such as `CountRows`, `First`, and `Filter` help you inspect and shape collections.

**Useful functions**

- `CountRows(Local.Items)`
- `First(Local.Items)`
- `Filter(Local.Items, Status = "open")`

**Common failure**

Trying to iterate over one value:

```powerfx
Local.Name
```

instead of a collection:

```powerfx
Local.Items
```

**Practice**

Create a collection output and check it with `CountRows` before using it in a loop.

### Module 8: Troubleshooting like a builder

**Goal:** map each error back to scope, type, or shape.

**How to debug in the right order**

1. **Check the name** - Is the variable real? Did you use `System.` or `Local.` correctly?
2. **Check the field expectation** - Does the field want a string, Boolean, record, table, or message collection?
3. **Check the formula output** - What shape does your formula actually return?
4. **Only then change the formula**

**Common errors**

| Error | Usually means |
| --- | --- |
| `Name isn't valid` | bad variable name or missing scope prefix |
| `Type mismatch` | field expects one type, formula returns another |
| Condition failed | expression is not Boolean |
| Loop failed | source is not a table |
| Agent input failed | field wants message-shaped input |

**Builder habit**

Do not keep rewriting the formula at random. First identify the expected type.

## Continue

- [Open the question portal](https://github.com/MeeraliN/foundry-workflows-powerfx-guide/issues/new?template=question.yml)
- [Return to the repository home](../README.md)
