# Contributing to BMM-opencode

Thank you for your interest in contributing to BMM-opencode! This project brings BMAD-METHOD agents and skills to OpenCode.

## Ways to Contribute

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation
- Share feedback

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- OpenCode CLI installed

### Local Development

```bash
# Clone the repository
git clone https://github.com/Jack-R-Hong/BMM-opencode.git
cd BMM-opencode

# Install dependencies
npm install

# Test locally with OpenCode
# Copy .opencode to your test project
cp -r .opencode /path/to/your/project/
```

## Pull Request Process

1. **Fork** the repository
2. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our guidelines
4. **Test** your changes locally
5. **Commit** with a clear message:
   ```bash
   git commit -m "feat: add new agent for X"
   ```
6. **Push** and create a Pull Request

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

## Adding New Agents

1. Create agent file in `.opencode/agents/`
2. Follow existing naming convention: `{module}-{name}.md`
3. Include proper frontmatter with name, description, and role
4. Update README.md to list the new agent

## Adding New Skills

1. Create skill directory in `.opencode/skills/`
2. Add `SKILL.md` with the skill definition
3. Follow existing naming convention: `bmad-{module}-{skill-name}/`
4. Update README.md to list the new skill

## Code Style

- Use clear, descriptive names
- Keep files focused and single-purpose
- Document complex logic
- Follow existing patterns in the codebase

## Reporting Bugs

Use the [Bug Report template](https://github.com/Jack-R-Hong/BMM-opencode/issues/new?template=bug_report.md) and include:

- Steps to reproduce
- Expected vs actual behavior
- OpenCode version
- Node.js version

## Feature Requests

Use the [Feature Request template](https://github.com/Jack-R-Hong/BMM-opencode/issues/new?template=feature_request.md) and describe:

- The problem you're trying to solve
- Your proposed solution
- Alternative approaches considered

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Open an issue or start a discussion. We're happy to help!

## Attribution

This project is derived from [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD). Please respect their trademark guidelines when contributing.
