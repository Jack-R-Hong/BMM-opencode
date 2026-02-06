# OpenCode Reference Documentation

This document contains reference material from the official OpenCode documentation for plugin and SDK development.

---

## Plugins

> Source: https://opencode.ai/docs/plugins/

Write your own plugins to extend OpenCode.

Plugins allow you to extend OpenCode by hooking into various events and customizing behavior. You can create plugins to add new features, integrate with external services, or modify OpenCode's default behavior.

### Use a Plugin

There are two ways to load plugins.

#### From Local Files

Place JavaScript or TypeScript files in the plugin directory.

- `.opencode/plugins/` - Project-level plugins
- `~/.config/opencode/plugins/` - Global plugins

Files in these directories are automatically loaded at startup.

#### From npm

Specify npm packages in your config file.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-helicone-session", "opencode-wakatime", "@my-org/custom-plugin"]
}
```

Both regular and scoped npm packages are supported.

#### How Plugins are Installed

**npm plugins** are installed automatically using Bun at startup. Packages and their dependencies are cached in `~/.cache/opencode/node_modules/`.

**Local plugins** are loaded directly from the plugin directory. To use external packages, you must create a `package.json` within your config directory (see Dependencies), or publish the plugin to npm and add it to your config.

#### Load Order

Plugins are loaded from all sources and all hooks run in sequence. The load order is:

1. Global config (`~/.config/opencode/opencode.json`)
2. Project config (`opencode.json`)
3. Global plugin directory (`~/.config/opencode/plugins/`)
4. Project plugin directory (`.opencode/plugins/`)

Duplicate npm packages with the same name and version are loaded once. However, a local plugin and an npm plugin with similar names are both loaded separately.

### Create a Plugin

A plugin is a **JavaScript/TypeScript module** that exports one or more plugin functions. Each function receives a context object and returns a hooks object.

#### Dependencies

Local plugins and custom tools can use external npm packages. Add a `package.json` to your config directory with the dependencies you need.

```json
// .opencode/package.json
{
  "dependencies": {
    "shescape": "^2.1.0"
  }
}
```

OpenCode runs `bun install` at startup to install these. Your plugins and tools can then import them.

```typescript
// .opencode/plugins/my-plugin.ts
import { escape } from "shescape"

export const MyPlugin = async (ctx) => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "bash") {
        output.args.command = escape(output.args.command)
      }
    },
  }
}
```

#### Basic Structure

```javascript
// .opencode/plugins/example.js
export const MyPlugin = async ({ project, client, $, directory, worktree }) => {
  console.log("Plugin initialized!")

  return {
    // Hook implementations go here
  }
}
```

The plugin function receives:

- `project`: The current project information.
- `directory`: The current working directory.
- `worktree`: The git worktree path.
- `client`: An opencode SDK client for interacting with the AI.
- `$`: Bun's shell API for executing commands.

#### TypeScript Support

For TypeScript plugins, you can import types from the plugin package:

```typescript
// my-plugin.ts
import type { Plugin } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async ({ project, client, $, directory, worktree }) => {
  return {
    // Type-safe hook implementations
  }
}
```

### Events

Plugins can subscribe to events. Here is a list of the different events available.

#### Command Events
- `command.executed`

#### File Events
- `file.edited`
- `file.watcher.updated`

#### Installation Events
- `installation.updated`

#### LSP Events
- `lsp.client.diagnostics`
- `lsp.updated`

#### Message Events
- `message.part.removed`
- `message.part.updated`
- `message.removed`
- `message.updated`

#### Permission Events
- `permission.asked`
- `permission.replied`

#### Server Events
- `server.connected`

#### Session Events
- `session.created`
- `session.compacted`
- `session.deleted`
- `session.diff`
- `session.error`
- `session.idle`
- `session.status`
- `session.updated`

#### Todo Events
- `todo.updated`

#### Shell Events
- `shell.env`

#### Tool Events
- `tool.execute.after`
- `tool.execute.before`

#### TUI Events
- `tui.prompt.append`
- `tui.command.execute`
- `tui.toast.show`

### Plugin Examples

#### Send Notifications

```javascript
// .opencode/plugins/notification.js
export const NotificationPlugin = async ({ project, client, $, directory, worktree }) => {
  return {
    event: async ({ event }) => {
      if (event.type === "session.idle") {
        await $`osascript -e 'display notification "Session completed!" with title "opencode"'`
      }
    },
  }
}
```

#### .env Protection

```javascript
// .opencode/plugins/env-protection.js
export const EnvProtection = async ({ project, client, $, directory, worktree }) => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool === "read" && output.args.filePath.includes(".env")) {
        throw new Error("Do not read .env files")
      }
    },
  }
}
```

#### Inject Environment Variables

```javascript
// .opencode/plugins/inject-env.js
export const InjectEnvPlugin = async () => {
  return {
    "shell.env": async (input, output) => {
      output.env.MY_API_KEY = "secret"
      output.env.PROJECT_ROOT = input.cwd
    },
  }
}
```

#### Custom Tools

```typescript
// .opencode/plugins/custom-tools.ts
import { type Plugin, tool } from "@opencode-ai/plugin"

export const CustomToolsPlugin: Plugin = async (ctx) => {
  return {
    tool: {
      mytool: tool({
        description: "This is a custom tool",
        args: {
          foo: tool.schema.string(),
        },
        async execute(args, context) {
          const { directory, worktree } = context
          return `Hello ${args.foo} from ${directory} (worktree: ${worktree})`
        },
      }),
    },
  }
}
```

#### Logging

```typescript
// .opencode/plugins/my-plugin.ts
export const MyPlugin = async ({ client }) => {
  await client.app.log({
    body: {
      service: "my-plugin",
      level: "info",
      message: "Plugin initialized",
      extra: { foo: "bar" },
    },
  })
}
```

Levels: `debug`, `info`, `warn`, `error`.

#### Compaction Hooks

```typescript
// .opencode/plugins/compaction.ts
import type { Plugin } from "@opencode-ai/plugin"

export const CompactionPlugin: Plugin = async (ctx) => {
  return {
    "experimental.session.compacting": async (input, output) => {
      output.context.push(`## Custom Context

Include any state that should persist across compaction:
- Current task status
- Important decisions made
- Files being actively worked on`)
    },
  }
}
```

You can also replace the compaction prompt entirely by setting `output.prompt`:

```typescript
// .opencode/plugins/custom-compaction.ts
import type { Plugin } from "@opencode-ai/plugin"

export const CustomCompactionPlugin: Plugin = async (ctx) => {
  return {
    "experimental.session.compacting": async (input, output) => {
      output.prompt = `You are generating a continuation prompt for a multi-agent swarm session.

Summarize:
1. The current task and its status
2. Which files are being modified and by whom
3. Any blockers or dependencies between agents
4. The next steps to complete the work

Format as a structured prompt that a new agent can use to resume work.`
    },
  }
}
```

---

## SDK

> Source: https://opencode.ai/docs/sdk/

Type-safe JS client for opencode server.

The opencode JS/TS SDK provides a type-safe client for interacting with the server. Use it to build integrations and control opencode programmatically.

### Install

```bash
npm install @opencode-ai/sdk
```

### Create Client

Create an instance of opencode:

```typescript
import { createOpencode } from "@opencode-ai/sdk"

const { client } = await createOpencode()
```

This starts both a server and a client.

#### Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `hostname` | `string` | Server hostname | `127.0.0.1` |
| `port` | `number` | Server port | `4096` |
| `signal` | `AbortSignal` | Abort signal for cancellation | `undefined` |
| `timeout` | `number` | Timeout in ms for server start | `5000` |
| `config` | `Config` | Configuration object | `{}` |

### Config

You can pass a configuration object to customize behavior:

```typescript
import { createOpencode } from "@opencode-ai/sdk"

const opencode = await createOpencode({
  hostname: "127.0.0.1",
  port: 4096,
  config: {
    model: "anthropic/claude-3-5-sonnet-20241022",
  },
})

console.log(`Server running at ${opencode.server.url}`)
opencode.server.close()
```

### Client Only

If you already have a running instance of opencode, you can create a client instance to connect to it:

```typescript
import { createOpencodeClient } from "@opencode-ai/sdk"

const client = createOpencodeClient({
  baseUrl: "http://localhost:4096",
})
```

#### Options

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| `baseUrl` | `string` | URL of the server | `http://localhost:4096` |
| `fetch` | `function` | Custom fetch implementation | `globalThis.fetch` |
| `parseAs` | `string` | Response parsing method | `auto` |
| `responseStyle` | `string` | Return style: `data` or `fields` | `fields` |
| `throwOnError` | `boolean` | Throw errors instead of return | `false` |

### Types

The SDK includes TypeScript definitions for all API types. Import them directly:

```typescript
import type { Session, Message, Part } from "@opencode-ai/sdk"
```

### Errors

```typescript
try {
  await client.session.get({ path: { id: "invalid-id" } })
} catch (error) {
  console.error("Failed to get session:", (error as Error).message)
}
```

### APIs

#### Global

| Method | Description | Response |
|--------|-------------|----------|
| `global.health()` | Check server health and version | `{ healthy: true, version: string }` |

```typescript
const health = await client.global.health()
console.log(health.data.version)
```

#### App

| Method | Description | Response |
|--------|-------------|----------|
| `app.log()` | Write a log entry | `boolean` |
| `app.agents()` | List all available agents | `Agent[]` |

```typescript
await client.app.log({
  body: {
    service: "my-app",
    level: "info",
    message: "Operation completed",
  },
})

const agents = await client.app.agents()
```

#### Project

| Method | Description | Response |
|--------|-------------|----------|
| `project.list()` | List all projects | `Project[]` |
| `project.current()` | Get current project | `Project` |

```typescript
const projects = await client.project.list()
const currentProject = await client.project.current()
```

#### Path

| Method | Description | Response |
|--------|-------------|----------|
| `path.get()` | Get current path | `Path` |

```typescript
const pathInfo = await client.path.get()
```

#### Config

| Method | Description | Response |
|--------|-------------|----------|
| `config.get()` | Get config info | `Config` |
| `config.providers()` | List providers and default models | `{ providers: Provider[], default: { [key: string]: string } }` |

```typescript
const config = await client.config.get()
const { providers, default: defaults } = await client.config.providers()
```

#### Sessions

| Method | Description |
|--------|-------------|
| `session.list()` | List sessions |
| `session.get({ path })` | Get session |
| `session.children({ path })` | List child sessions |
| `session.create({ body })` | Create session |
| `session.delete({ path })` | Delete session |
| `session.update({ path, body })` | Update session properties |
| `session.init({ path, body })` | Analyze app and create `AGENTS.md` |
| `session.abort({ path })` | Abort a running session |
| `session.share({ path })` | Share session |
| `session.unshare({ path })` | Unshare session |
| `session.summarize({ path, body })` | Summarize session |
| `session.messages({ path })` | List messages in a session |
| `session.message({ path })` | Get message details |
| `session.prompt({ path, body })` | Send prompt message |
| `session.command({ path, body })` | Send command to session |
| `session.shell({ path, body })` | Run a shell command |
| `session.revert({ path, body })` | Revert a message |
| `session.unrevert({ path })` | Restore reverted messages |
| `postSessionByIdPermissionsByPermissionId({ path, body })` | Respond to a permission request |

```typescript
// Create and manage sessions
const session = await client.session.create({
  body: { title: "My session" },
})

const sessions = await client.session.list()

// Send a prompt message
const result = await client.session.prompt({
  path: { id: session.id },
  body: {
    model: { providerID: "anthropic", modelID: "claude-3-5-sonnet-20241022" },
    parts: [{ type: "text", text: "Hello!" }],
  },
})

// Inject context without triggering AI response (useful for plugins)
await client.session.prompt({
  path: { id: session.id },
  body: {
    noReply: true,
    parts: [{ type: "text", text: "You are a helpful assistant." }],
  },
})
```

#### Files

| Method | Description | Response |
|--------|-------------|----------|
| `find.text({ query })` | Search for text in files | Array of match objects |
| `find.files({ query })` | Find files and directories by name | `string[]` (paths) |
| `find.symbols({ query })` | Find workspace symbols | `Symbol[]` |
| `file.read({ query })` | Read a file | `{ type: "raw" \| "patch", content: string }` |
| `file.status({ query? })` | Get status for tracked files | `File[]` |

```typescript
const textResults = await client.find.text({
  query: { pattern: "function.*opencode" },
})

const files = await client.find.files({
  query: { query: "*.ts", type: "file" },
})

const directories = await client.find.files({
  query: { query: "packages", type: "directory", limit: 20 },
})

const content = await client.file.read({
  query: { path: "src/index.ts" },
})
```

#### TUI

| Method | Description | Response |
|--------|-------------|----------|
| `tui.appendPrompt({ body })` | Append text to the prompt | `boolean` |
| `tui.openHelp()` | Open the help dialog | `boolean` |
| `tui.openSessions()` | Open the session selector | `boolean` |
| `tui.openThemes()` | Open the theme selector | `boolean` |
| `tui.openModels()` | Open the model selector | `boolean` |
| `tui.submitPrompt()` | Submit the current prompt | `boolean` |
| `tui.clearPrompt()` | Clear the prompt | `boolean` |
| `tui.executeCommand({ body })` | Execute a command | `boolean` |
| `tui.showToast({ body })` | Show toast notification | `boolean` |

```typescript
await client.tui.appendPrompt({
  body: { text: "Add this to prompt" },
})

await client.tui.showToast({
  body: { message: "Task completed", variant: "success" },
})
```

#### Auth

| Method | Description | Response |
|--------|-------------|----------|
| `auth.set({ ... })` | Set authentication credentials | `boolean` |

```typescript
await client.auth.set({
  path: { id: "anthropic" },
  body: { type: "api", key: "your-api-key" },
})
```

#### Events

| Method | Description | Response |
|--------|-------------|----------|
| `event.subscribe()` | Server-sent events stream | Server-sent events stream |

```typescript
const events = await client.event.subscribe()
for await (const event of events.stream) {
  console.log("Event:", event.type, event.properties)
}
```
