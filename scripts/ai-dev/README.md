# Frontend AI Workflow

Ez már teljesen repo-local workflow, nem függ a workspace rootban lévő shared engine-től.

Használat:

```bash
npm run ai:scan
npm run ai:backlog
npm run ai:prompt
npm run ai:daily -- --prepare --run
```

Hasznos további parancsok:

```bash
npm run ai:apply
npm run ai:validate
npm run ai:commit
```

A generált fájlok a `docs/ai-daily` mappába kerülnek.
