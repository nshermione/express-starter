import fs from "fs";
import path from "path";
import { createServer } from "vite";
import { CONFIG } from "../../core/Config.js";
import { HttpServerPlugin } from "../../core/Plugin.js";
import { FileUtils, URLUtils } from "../../core/Utils.js";
import { Renderer } from "../../core/Renderer.js";
import { renderToString } from "vue/server-renderer";
import { createSSRApp } from "vue";

export class SPAPlugin extends HttpServerPlugin {
  constructor({ manifest, dist, root, assetFolder, isSSR = false }) {
    super();
    this.root = root;
    this.assetFolder = path.join(root, assetFolder);
    this.manifestFile = manifest; 
    this.dist = path.join(root, dist);
    this.clientDevPort = 5137;
    this.isSSR = isSSR;
    if (CONFIG.ENVIRONMENT !== 'development') {
      this.manifest = FileUtils.readJsonFile({ filePath: path.join(this.root, this.manifestFile) });
    }
  }

  async setup(httpServer) {
    super.setup(httpServer);
    httpServer.app.use((req, res, next) => {
      res.locals.assets = (path) => {
        if (CONFIG.ENVIRONMENT === 'development') {
          return URLUtils.join(`http://localhost:${this.clientDevPort}`, path);
        } else {
          return '/' + this.manifest[path].file;
        }
      }
      next();
    });
    if (CONFIG.ENVIRONMENT === 'development') {
      httpServer.addPublicPath(this.assetFolder);
      const server = await createServer({
        root: this.root,
        server: {
          port: this.clientDevPort,
        },
      });
      httpServer.app.use((req, res, next) => {
        res.locals.vite = server;
        if (/^\/@fs.*$/.test(req.url)) {
          res.sendFile(req.url.replace('/@fs/', ''));
          return;
        }
        next();
      });

      await server.listen();
      this.logger.info("Start SPA client dev server");
      server.printUrls();
    } else {
      if (!fs.existsSync(this.dist)) {
        throw new Error(`Please build before run SPA app in ${CONFIG.ENVIRONMENT} environment`);
      }
      httpServer.addPublicPath(this.dist);
    }
  }
}

export class VueSSRRenderer extends Renderer {
  constructor(config) {
    super(config);
  }

  async render(req, res) {
    const clientJS = res.locals.assets('client/app.js');
    const createApp = (await res.locals.vite.ssrLoadModule('main.js')).createApp
    const { app, router } = createApp();
    await router.push(req.url)
    await router.isReady()

    renderToString(app, {}).then((html) => {
      console.log(html.replace('<div><!--[--><!---->', '').replace('<!--]-->', ''));
      res.status(200).set({ 'Content-Type': 'text/html' }).end(/*html*/`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {{ title }} </title>
  </head>
  <body class="body"> 
    <div id="app">
      ${html}
    </div>
    <script type="module" src="${clientJS}"></script>
  </body>
</html>
      `);
    })
  }
}