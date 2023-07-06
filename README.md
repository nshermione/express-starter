# Express starter

Starter kit for expressjs

## Requirements

NodeJS: v14.18+, v16+

## Deploy

- Pull project
- Create file .env.\<app_name> with configuration you want
- Start app

```bash
NODE_APP=<app_name> NODE_ENV=production node apps/app.mjs
```

or pm2

```bash
NODE_APP=<app_name> NODE_ENV=production pm2 start apps/app.mjs --name=<app_name>
```

## SPA

If you app is using SPA plugin, make sure to run build before deploy

Example:

```bash
vite build --config src/modules/spa/vite.config.js
```
