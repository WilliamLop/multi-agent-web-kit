# Publish Checklist

Use this file when you are ready to turn this local kit into a shared GitHub and npm package.

## 1. Create the GitHub repository

Suggested names:

- `multi-agent-web-kit`
- `web-delivery-skills`
- `agent-ops-web-kit`

## 2. Push the repo

```bash
git init
git add .
git commit -m "feat: scaffold multi-agent web kit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## 3. Publish to npm

Pick one package name that is available, then:

```bash
npm login
npm publish --access public
```

## 4. Install after publish

Examples:

```bash
npx multi-agent-web-kit list
npx multi-agent-web-kit install web-delivery-loop --target codex
npx multi-agent-web-kit install web-delivery-loop --target agents,claude --project /path/to/project
```

## 5. Team rollout

- install the skill globally in Codex
- install it per-project for `.agents` and Claude
- review the generated Claude hooks before first use
- standardize one workflow prompt for the team
